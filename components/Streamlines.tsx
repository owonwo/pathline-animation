"use client";
import React from "react";
import { createAnimationSequence } from "./animations";

const TestPath1 =
  "M6.04102 57.5032L56.0708 133.937C74.8232 162.587 84.8114 196.084 84.8114 230.326V827.995C84.8114 871.474 68.7173 913.414 39.6311 945.732L6.04102 983.055";

// Path with Gradients require a linearGradient svg def element
export function Streamlines({
  id,
  color = "lime",
  path = TestPath1,
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 86 984" {...props}>
      <title>Stream lines</title>

      <MotionPath color={color} path={path} id={id} />

      <defs>
        <linearGradient
          id="base-gradient"
          x1="45.4262"
          y1="57.5032"
          x2="45.4262"
          y2="983.055"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#CCCCCC" stopOpacity={"0.2"} />
          <stop offset="1" stopColor="#999999" stopOpacity="0.23" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MotionPath({ color, path, id }) {
  const parentElementRef = React.useRef<SVGGElement>(null);

  React.useLayoutEffect(() => {
    const parentElement = parentElementRef.current;
    if (!parentElement) return;

    const targetPath = parentElement.querySelector(
      "#target-path"
    ) as SVGPathElement;
    const movingElements = Array.from(
      parentElement.querySelectorAll(
        "radialGradient, circle.circle-dot, .circle-mask, text"
      )
    );

    if (!(targetPath && movingElements.length > 0)) return;

    const control = createAnimationSequence({
      pathEl: targetPath,
      movingElements,
    });
    const abortController = new AbortController();

    AnimateEvents.observe(
      id,
      (event) => {
        if (event.action === "play") {
          control.setParams(event.data);

          return control.play();
        }
        if (event.action === "pause") return control.pause();
        if (event.action === "cancel") return control.cancel();
      },
      abortController.signal
    );

    return () => {
      abortController.abort();
      control.cancel();
    };
  }, [id]);

  return (
    <g ref={parentElementRef}>
      <path
        stroke="url(#base-gradient)"
        strokeWidth={1.2}
        d={path}
        id="target-path"
      />
      <MotionObject path={path} id={`grp-${id}`} color={color} />
    </g>
  );
}

export function MotionObject({ path, color, id }) {
  return (
    <g>
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
        fill={color}
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
        textAnchor="start"
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
          <path fill="#000" d={path} />
          <circle
            cx={843.505}
            cy={284.659}
            className="circle-mask"
            r={30}
            fill="#fff"
          />
        </mask>
      </defs>
    </g>
  );
}

export type AnimationEventPayload = { id: string; text: string; color: string };

type AnimationEvent =
  | {
      action: "play";
      data: AnimationEventPayload;
    }
  | { action: "cancel"; id: string }
  | { action: "pause"; id: string };

export const AnimateEvents = {
  eventKey: "animateStart",

  observe(
    id: string,
    callback: (event: AnimationEvent) => void,
    signal: AbortSignal
  ) {
    window.addEventListener(
      this.eventKey,
      (evt) => {
        if (evt.detail?.data?.id === id) callback(evt.detail);
      },
      { signal }
    );
  },

  dispatch(detail: AnimationEvent) {
    const animateStartEvent = new CustomEvent(this.eventKey, {
      detail: detail,
    });
    window.dispatchEvent(animateStartEvent);
  },
};
