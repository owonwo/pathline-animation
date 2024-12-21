import type React from "react"
import { MotionPath } from "./streamlines-mod"

const SvgComponent = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 159 928"
    {...props}
  >
    <title>Multiple Paths</title>

    <MotionPath id="first-lane" color={'blue'}>
      <path
        stroke="url(#a)"
        strokeOpacity={0.13}
        d="m.584 1.187 50.03 76.434a176 176 0 0 1 28.74 96.388v597.669c0 43.479-16.093 85.42-45.18 117.738L.584 926.738"
      />
    </MotionPath>

    <MotionPath id="second-lane" color={'blue'}>
      <path
        stroke="url(#a)"
        strokeOpacity={0.13}
        d="M39.97 1.187 90 77.62a175.996 175.996 0 0 1 28.74 96.388v597.669a176 176 0 0 1-45.18 117.738l-33.59 37.322"
      />
    </MotionPath>

    <MotionPath id="third-lane" color={'crimson'}>
      <path
        stroke="url(#a)"
        strokeOpacity={0.13}
        d="m79.355 1.187 50.029 76.434a175.996 175.996 0 0 1 28.741 96.388v597.669c0 43.479-16.094 85.42-45.18 117.738l-33.59 37.322"
      />
    </MotionPath>

    <defs>
      <linearGradient
        id="a"
        x1={118.74}
        x2={118.74}
        y1={1.187}
        y2={926.738}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.18} />
        <stop offset={0.5} stopColor="#CCC" />
        <stop stopColor="#999" stopOpacity={0.23} />
      </linearGradient>
    </defs>
  </svg>
)

export const MultipleLanes = SvgComponent;
