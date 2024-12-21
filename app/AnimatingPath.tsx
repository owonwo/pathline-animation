"use client";
import React from "react";
import { nanoid } from 'nanoid';
import { animate, cubicBezier } from "motion";

const ControlPath = "M843.505 284.659L752.638 284.659C718.596 284.659 684.866 280.049 653.251 271.077L598.822 255.629L0.675021 1.00011"
const TestPath1 = "M6.04102 57.5032L56.0708 133.937C74.8232 162.587 84.8114 196.084 84.8114 230.326V827.995C84.8114 871.474 68.7173 913.414 39.6311 945.732L6.04102 983.055"

// Path with Gradients require a linearGradient svg def element
export function AnimatingPath({ color = "lime", path = TestPath1, ...props }) {
  return <svg
    fill="none"
    viewBox="0 0 86 984"
    style={{
      "--dot-color": color
    }}
    {...props}
  >
    <MotionPath color={color} path={path} />

    <defs>
      <linearGradient id="a" x1="45.4262" y1="57.5032" x2="45.4262" y2="983.055" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.18" />
        <stop offset="0.5" stopColor="#CCCCCC" stopOpacity={'0.2'} />
        <stop offset="1" stopColor="#999999" stopOpacity="0.23" />
      </linearGradient>
    </defs>

  </svg>
}

function createAnimationSequence({ pathEl: targetPath, movingElements, }: {
  movingElements:
  (SVGElement | Element)[],
  pathEl: SVGPathElement
}) {
  type AnimateParams = {
    element: SVGElement | Element;
    scale: number[]
  }

  type MoveAlongParams = {
    point: SVGPoint;
  }

  type AnimationPlaybackControls = ReturnType<typeof animate>

  type AnimInterface = {
    kind: "some";
    element: SVGElement | Element;
    moveTo: (params: MoveAlongParams) => void,
    setup: (config: { duration: number }) => AnimationPlaybackControls
    reset: () => void
  };

  type None = {
    kind: "none"
  }

  function animateText({ element: text, scale, }: AnimateParams): AnimInterface {
    function moveTo({ point }) {
      text.setAttribute('x', String(point.x + 30));
      text.setAttribute('y', String(point.y));
    }

    function play(config) {
      const props = {
        opacity: scale,
      }

      return animate(text, props, config);
    }

    function setup(config) {
      return play({ ...config, autoplay: false })
    }

    function reset() {
      animate(text, { opacity: 0 }, { duration: 0 })
    }

    return { kind: "some", element: text, moveTo, setup, reset };
  }

  function animateCircle({ element, scale = [] }: AnimateParams): AnimInterface {
    function moveTo({ point }: MoveAlongParams) {
      element.setAttribute('cx', String(point.x));
      element.setAttribute('cy', String(point.y));
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
        r: scale ?? [0, 16, 0]
      };

      return animate(element, props, _config);
    }

    function setup(config) {
      return play({ ...config, autoplay: false })
    }

    return { kind: "some", element, moveTo, setup, reset };
  }

  const animationInstance = movingElements.map((el): AnimInterface | None => {
    const fallback: None = { kind: "none" };

    if (el.classList.contains('label')) {
      return animateText({ element: el, scale: [0, 1, 1, 0] });
    }

    if (el.classList.contains('circle-dot')) {
      return animateCircle({ element: el, scale: [0, 10, 10, 0] });
    }

    if (el.nodeName === 'radialGradient') {
      return animateCircle({ element: el, scale: [0, 60, 60, 0] });
    }

    if (el.classList.contains('circle-mask')) {
      return animateCircle({ element: el, scale: [0, 60, 60, 0] });
    }

    return fallback;
  })
  .filter((e): e is AnimInterface => e.kind === 'some');

  for (const entry of animationInstance) {
    entry.reset()
  }

  const sharedConfig = {
    duration: 4,
    ease: cubicBezier(0, 0.62, 1, 0.37),
    delay: 2,
    autoplay: false,
  }

  const total = targetPath.getTotalLength();

  const moveAlongPath = animate(0, total, {
    ...sharedConfig,
    onUpdate(progress) {
      const point = targetPath.getPointAtLength(progress);
      for (const entry of animationInstance) {
        entry.moveTo({ point })
      }
    },
  });

  const scalingAnimations = animationInstance.map(entry => {
    return entry.setup(sharedConfig);
  });

  const all = [moveAlongPath, ...scalingAnimations];

  return {
    play() {
      all.map(e => e?.complete?.())
      all.map(e => e.play())
    },
    cancel() {
      all.map(e => e.cancel())
    }
  }
}

function MotionPath({ color, path }) {
  const parentElementRef = React.useRef<SVGGElement>(null);

  React.useLayoutEffect(() => {
    const parentElement = parentElementRef.current;
    if (!parentElement) return;

    const targetPath = parentElement.querySelector('#target-path') as SVGPathElement;
    const movingElements = Array.from(
      parentElement.querySelectorAll('radialGradient, circle.circle-dot, .circle-mask, text')
    );

    if (!(targetPath && movingElements.length > 0)) return;

    const control = createAnimationSequence({ pathEl: targetPath, movingElements });

    if (!window.$$) {
      window.$$ = new Set();
    }
    window.$$.add(control);

    return () => control.cancel();
  }, []);


  return <g ref={parentElementRef}>
    <path
      stroke="url(#a)"
      strokeWidth={1.2}
      d={path}
      id="target-path"
    />
    <MotionObject path={path} color={color} />
  </g>
}

function MotionObject({ path, color }) {
  const id = React.useMemo(() => nanoid(4), []);

  return <g>
    <path
      stroke={`url(#filter.${id})`}
      strokeWidth={1.2}
      d={path}
      className="svg-path"
      mask={`url(#circle-mask.${id})`}
    />
    <circle
      cx={843.505}
      cy={284.659}
      r={7}
      fill={'var(--dot-color)'}
      className="circle-dot"
    />
    <text
      x={843.505}
      y={299.659}
      fill="#a3a3a3"
      alignmentBaseline="hanging"
      className="label"
      fontFamily="Inter, sans-serif"
      fontSize={11}
      fontWeight={400}
      textAnchor="middle"
    >
      {".svelte"}
    </text>

    <defs>
      <radialGradient
        id={`filter.${id}`}
        cx={843.505}
        cy={284.659}
        r={30}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </radialGradient>

      <mask id={`circle-mask.${id}`}>
        <path
          fill="#000"
          d={path}
        />
        <circle cx={843.505} cy={284.659} className="circle-mask" r={30} fill="#fff" />
      </mask>
    </defs>
  </g>
}
