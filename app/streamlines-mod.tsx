"use client";
import React from "react";
import { Slot } from '@radix-ui/react-slot';
import { AnimateEvents, createAnimationSequence, MotionObject } from "./Streamlines";

export function MotionPath({ id, color = "lightblue", children }) {
  const parentElementRef = React.useRef<SVGGElement>(null);
  const pathRef = React.useRef<HTMLElement>(null);

  const animationPathValue = React.useMemo<string>(() => pathRef.current?.getAttribute?.('d') ?? "", []);;

  React.useEffect(() => {
    const parentElement = parentElementRef.current;
    if (!parentElement) return;

    const targetPath = parentElement.querySelector('#target-path') as SVGPathElement;

    const movingElements = Array.from(
      parentElement.querySelectorAll('radialGradient, circle.circle-dot, .circle-mask, text')
    );

    if (!(targetPath && movingElements.length > 0)) return;

    const control = createAnimationSequence({ pathEl: targetPath, movingElements });
    const abortController = new AbortController();

    AnimateEvents.observe(
      id,
      (event) => {
        if (event.action === 'play') {
          const text = movingElements.find(e => e.nodeName === 'text');
          if (text) text.textContent = event.data.text;

          return control.play();
        }
        if (event.action === 'pause') return control.pause();
        if (event.action === 'cancel') return control.cancel();
      },
      abortController.signal
    )

    return () => {
      abortController.abort();
      control.cancel();
    }
  }, [id]);


  return <g ref={parentElementRef}>
    <Slot
      ref={pathRef}
      id="target-path"
    >
      {children}
    </Slot>

    <MotionObject path={animationPathValue} id={`grp-${id}`} color={color} />
  </g>
}
