"use client";

import { animate } from "motion";
import React from "react";

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
      animate(targetPath.getTotalLength(), 0, {
        duration: 4,
        ease: "anticipate",
        repeat: Number.POSITIVE_INFINITY,
        onUpdate(progress) {
          const current = targetPath.getPointAtLength(progress);

          for (const circle of movingElements) {
            if (circle.nodeName === 'text') {
              circle.setAttribute('x', current.x + 10);
              circle.setAttribute('y', current.y + 10);
            } else {
              circle.setAttribute('cx', current.x);
              circle.setAttribute('cy', current.y);
            }
          }

          // circlePath.style.opacity = progress / 100;
          // circlePath.setAttribute('x', current.x);
          // circlePath.setAttribute('y', current.y);
        }
      })
    }

    run();
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
      <g>
        <path
          stroke="url(#b)"
          strokeWidth={1.2}
          d="M843.505 284.659h-90.867c-34.042 0-67.772-4.61-99.387-13.582l-54.429-15.448L.675 1"
          className="svg-path"
          mask="url(#c)"
        />
        <circle
          cx={843.505}
          cy={284.659}
          r={7}
          fill={color}
          className="circle-dot"
          style={{
            "--dot-color": color
          }}
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
            id="b"
            cx={843.505}
            cy={284.659}
            r={30}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ff8d67" />
            <stop offset="100%" stopColor="#ff8d67" stopOpacity={0} />
          </radialGradient>
          <mask id="c">
            <path
              fill="#000"
              d="M843.505 284.659h-90.867c-34.042 0-67.772-4.61-99.387-13.582l-54.429-15.448L.675 1"
            />
            <circle cx={843.505} cy={284.659} r={30} fill="#fff" />
          </mask>
        </defs>
      </g>
    </g>

    <defs>
      <linearGradient id="a" x1="45.4262" y1="57.5032" x2="45.4262" y2="983.055" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0.18" />
        <stop offset="0.5" stopColor="#CCCCCC" />
        <stop offset="1" stopColor="#999999" stopOpacity="0.23" />
      </linearGradient>
    </defs>

  </svg>
}
