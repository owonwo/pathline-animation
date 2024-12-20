"use client";
import { nanoid } from 'nanoid';

import { animate, progress } from "motion";
import React, { SVGElementType } from "react";

const ControlPath = "M843.505 284.659L752.638 284.659C718.596 284.659 684.866 280.049 653.251 271.077L598.822 255.629L0.675021 1.00011"
const TestPath1 = "M6.04102 57.5032L56.0708 133.937C74.8232 162.587 84.8114 196.084 84.8114 230.326V827.995C84.8114 871.474 68.7173 913.414 39.6311 945.732L6.04102 983.055"

export function AnimatingPath({ color = "lime", path = TestPath1, ...props }) {
  const parentElementRef = React.useRef<SVGElement>(null);

  React.useEffect(() => {
    const parentElement = parentElementRef.current;
    if (!parentElement) return;

    const targetPath = parentElement.querySelector('#target-path') as SVGPathElement;
    const movingElements = Array.from(
      parentElement.querySelectorAll('radialGradient, circle, text')
    );

    if (!(targetPath && movingElements.length > 0)) return;
    // console.log(movingElements);

    function run() {
      const total = targetPath.getTotalLength();

      type AnimateParams = {
        element: SVGElement | Element;
        progress: number;
        point: SVGPoint;
      }

      function animateText({element: text, progress, point }: AnimateParams) {
        text.setAttribute('x', String(point.x + 10));
        text.setAttribute('y', String(point.y + 10));
      }

      function animateDot({ point: current, progress, element: circle }: AnimateParams) {
        circle.setAttribute('cx', String(current.x));
        circle.setAttribute('cy', String(current.y));
        circle.setAttribute('r', String(Math.max(progress, 40)));
      }

      const control = animate(total, total / 2, {
        duration: 4,
        ease: "anticipate",
        repeat: Number.POSITIVE_INFINITY,
        onUpdate(progress) {
          const point = targetPath.getPointAtLength(progress);

          for (const circle of movingElements) {
            if (circle.nodeName === 'text') {
              animateText({ element: circle, point, progress });
            } else {
               animateDot({ element: circle, point, progress });
            }
          }
        }
      })

      return control;
    }

    const control = run();

    return () => control.cancel();
  }, [])


  return <svg
    ref={parentElementRef}
    fill="none"
    viewBox="0 0 86 984"
    style={{
      "--dot-color": color
    }}
    {...props}
  >
    <g>
      <path
        stroke="url(#a)"
        strokeWidth={1.2}
        d={path}
        style={{
          opacity: 0.8,
        }}
        id="target-path"
      />
      <MotionObject path={path} color={color} />
    </g>

    <defs>
      <linearGradient id="a" x1="45.4262" y1="57.5032" x2="45.4262" y2="983.055" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.18" />
        <stop offset="0.5" stopColor="#CCCCCC" stopOpacity={'0.2'}/>
        <stop offset="1" stopColor="#999999" stopOpacity="0.23" />
      </linearGradient>
    </defs>

  </svg>
}

function MotionObject({ path, color }) {
  const id = React.useMemo(() => nanoid(4), []);

  return <g>
    <path
      stroke={`url(#filter.${id})`}
      strokeWidth={1.2}
      d={path}
      className="svg-path"
      mask="url(#circle-mask)"
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

      <mask id="circle-mask">
        <path
          fill="#000"
          d={path}
        />
        <circle cx={843.505} cy={284.659} r={30} fill="#fff" />
      </mask>
    </defs>
  </g>
}
