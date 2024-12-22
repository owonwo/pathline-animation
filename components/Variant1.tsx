import type React from "react"
import { MotionPath } from "./motion-path"

export const Variant1 = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 159 928"
    {...props}
  >
    <title>Variant 2</title>

    <MotionPath id="first-lane" color={'lime'}>
    <path d="M0.584229 1.18652L50.614 77.6208C69.3665 106.27 79.3546 139.768 79.3546 174.009V771.678C79.3546 815.157 63.2605 857.098 34.1744 889.416L0.584229 926.738" stroke="url(#paint0_linear_16_108)" strokeOpacity="0.13"/>
    </MotionPath>
    <MotionPath id="second-lane" color={'lime'}>

    <path d="M39.9694 1.18652L89.9991 77.6208C108.752 106.27 118.74 139.768 118.74 174.009V771.678C118.74 815.157 102.646 857.098 73.5595 889.416L39.9694 926.738" stroke="url(#paint1_linear_16_108)" strokeOpacity="0.13"/>
    </MotionPath>
    <MotionPath id="third-lane" color={'lime'}>

    <path d="M79.3546 1.18652L129.384 77.6208C148.137 106.27 158.125 139.768 158.125 174.009V771.678C158.125 815.157 142.031 857.098 112.945 889.416L79.3546 926.738" stroke="url(#paint2_linear_16_108)" strokeOpacity="0.13"/>
    </MotionPath>

    <MotionPath id="fourth-lane" color={'lime'}>
    <path d="M118.74 1.18652L168.77 77.6208C187.522 106.27 197.51 139.768 197.51 174.009V551.511C197.51 589.619 228.402 620.511 266.51 620.511H463.422C501.53 620.511 532.422 651.404 532.422 689.511V829.116C532.422 883.031 576.129 926.738 630.044 926.738V926.738" stroke="url(#paint3_linear_16_108)" strokeOpacity="0.13"/>
    </MotionPath>

    <MotionPath id="fifth-lane" color={'lime'}>
    <path d="M161.952 1.18652L211.982 77.6208C230.735 106.27 240.723 139.768 240.723 174.009V540.66C240.723 555.572 252.811 567.66 267.723 567.66H475.635C530.863 567.66 575.635 612.432 575.635 667.66V900.738C575.635 915.097 587.275 926.738 601.635 926.738H673.257" stroke="url(#paint4_linear_16_108)" strokeOpacity="0.13"/>
    </MotionPath>

    <defs>
    <linearGradient id="paint0_linear_16_108" x1="39.9694" y1="1.18652" x2="39.9694" y2="926.738" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" stopOpacity="0.18"/>
    <stop offset="0.5" stopColor="#CCCCCC"/>
    <stop offset="1" stopColor="#999999" stopOpacity="0.23"/>
    </linearGradient>
    <linearGradient id="paint1_linear_16_108" x1="79.3545" y1="1.18652" x2="79.3545" y2="926.738" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" stopOpacity="0.18"/>
    <stop offset="0.5" stopColor="#CCCCCC"/>
    <stop offset="1" stopColor="#999999" stopOpacity="0.23"/>
    </linearGradient>
    <linearGradient id="paint2_linear_16_108" x1="118.74" y1="1.18652" x2="118.74" y2="926.738" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" stopOpacity="0.18"/>
    <stop offset="0.5" stopColor="#CCCCCC"/>
    <stop offset="1" stopColor="#999999" stopOpacity="0.23"/>
    </linearGradient>
    <linearGradient id="paint3_linear_16_108" x1="158.125" y1="1.18652" x2="158.125" y2="926.738" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" stopOpacity="0.18"/>
    <stop offset="0.5" stopColor="#CCCCCC"/>
    <stop offset="1" stopColor="#999999" stopOpacity="0.23"/>
    </linearGradient>
    <linearGradient id="paint4_linear_16_108" x1="201.338" y1="1.18652" x2="201.338" y2="926.738" gradientUnits="userSpaceOnUse">
    <stop stopColor="white" stopOpacity="0.18"/>
    <stop offset="0.5" stopColor="#CCCCCC"/>
    <stop offset="1" stopColor="#999999" stopOpacity="0.23"/>
    </linearGradient>
    </defs>
  </svg>
)
