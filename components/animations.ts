import { animate, cubicBezier } from "motion";

export const ANIMATION_DURATION = 4000;

type AnimationItemParams = {
  element: SVGElement | Element;
  scale: number[];
};

type MoveAlongParams = {
  point: SVGPoint;
};

type AnimationPlaybackControls = ReturnType<typeof animate>;

type AnimInterface = {
  kind: "some";
  element: SVGElement | Element;
  moveTo: (params: MoveAlongParams) => void;
  setup: (config: { duration: number }) => AnimationPlaybackControls;
  reset: () => void;
};

type None = {
  kind: "none";
};

export function createAnimationSequence({
  pathEl: targetPath,
  movingElements,
}: {
  movingElements: (SVGElement | Element)[];
  pathEl: SVGPathElement;
}) {
  const animationInstance = movingElements
    .map((el): AnimInterface | None => {
      const fallback: None = { kind: "none" };

      if (el.classList.contains("label")) {
        return animateText({ element: el, scale: [0, 0, 0, 1, 1, 0, 0, 0] });
      }

      if (el.classList.contains("circle-dot")) {
        return animateCircle({ element: el, scale: [0, 5, 5, 0] });
      }

      if (el.nodeName === "radialGradient") {
        return animateCircle({ element: el, scale: [0, 30, 30, 0] });
      }

      if (el.classList.contains("circle-mask")) {
        return animateCircle({ element: el, scale: [0, 30, 30, 0] });
      }

      return fallback;
    })
    .filter((e): e is AnimInterface => e.kind === "some");

  for (const entry of animationInstance) {
    entry.reset();
  }

  const sharedConfig = {
    duration: ANIMATION_DURATION / 1000,
    ease: cubicBezier(0, 0.62, 1, 0.37),
    // delay: 2,
    autoplay: false,
  };

  const from = 0;
  const to = targetPath.getTotalLength();

  const moveAlongPath = animate(from, to, {
    ...sharedConfig,
    onUpdate(progress) {
      const point = targetPath.getPointAtLength(progress);
      for (const entry of animationInstance) {
        entry.moveTo({ point });
      }
    },
  });

  const scalingAnimations = animationInstance.map((entry) => {
    return entry.setup(sharedConfig);
  });

  const all = [moveAlongPath, ...scalingAnimations];

  return {
    play() {
      all.map((e) => e?.complete?.());
      all.map((e) => e.play());
    },
    setParams({ text, color }) {
      for (const entry of movingElements) {
        if (entry.nodeName === "text") {
          entry.textContent = text;
        }

        if (entry.classList.contains("circle-dot")) {
          const dot = entry as SVGCircleElement;

          dot.style.setProperty("filter", `drop-shadow(0 0 3px ${color})`);
          dot.setAttribute("fill", color);
        }

        if (entry.nodeName === "radialGradient") {
          for (const child of Array.from(entry.children)) {
            child.setAttribute("stop-color", color);
          }
        }
      }
    },
    pause() {
      all.map((animation) => {
        const time = animation.time;
        animation.pause();
        animation.time = time;
      });
    },
    cancel() {
      all.map((e) => e.cancel());
    },
  };
}

function animateText({
  element: text,
  scale,
}: AnimationItemParams): AnimInterface {
  function moveTo({ point }) {
    text.setAttribute("x", String(point.x));
    text.setAttribute("y", String(point.y + 10));
  }

  function play(config) {
    const props = {
      opacity: scale,
    };

    return animate(text, props, config);
  }

  function setup(config) {
    return play({ ...config, autoplay: false });
  }

  function reset() {
    animate(text, { opacity: 0 }, { duration: 0 });
  }

  return { kind: "some", element: text, moveTo, setup, reset };
}

function animateCircle({
  element,
  scale = [],
}: AnimationItemParams): AnimInterface {
  function moveTo({ point }: MoveAlongParams) {
    element.setAttribute("cx", String(point.x));
    element.setAttribute("cy", String(point.y));
  }

  function reset(onComplete?: () => void) {
    animate(element, { r: 0 }, { duration: 0, onComplete });
  }

  function play(config: { duration: number }) {
    const _config = {
      ...config,
      duration: config.duration,
    };

    const props = {
      r: scale,
    };

    return animate(element, props, _config);
  }

  function setup(config) {
    return play({ ...config, autoplay: false });
  }

  return { kind: "some", element, moveTo, setup, reset };
}
