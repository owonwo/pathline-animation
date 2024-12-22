"use client";
import React from "react";
import { Slot } from '@radix-ui/react-slot';
import { AnimateEvents, MotionObject } from "./Streamlines";
import { createAnimationSequence } from "./animations";

export function MotionPath({ id, color = "lightblue", children }) {
  const parentElementRef = React.useRef<SVGGElement>(null);
  const pathRef = React.useRef<HTMLElement>(null);

  const [animationPathValue, setAnimationPathValue] = React.useState<string>(null);

  React.useEffect(() => {
    const parentElement = parentElementRef.current;
    if (!parentElement) return;

    const targetPath = parentElement.querySelector('#target-path') as SVGPathElement;

    if (!animationPathValue) {
      const path = targetPath.getAttribute('d');
      if (!path) return;

      return setAnimationPathValue(path);
    }

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
          control.setParams(event.data);
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
  }, [id, animationPathValue]);


  return <g ref={parentElementRef}>
    <Slot
      ref={pathRef}
      id="target-path"
    >
      {children}
    </Slot>

    {animationPathValue
      ? <MotionObject path={animationPathValue} id={`grp-${id}`} color={color} />
      : null
    }
  </g>
}
