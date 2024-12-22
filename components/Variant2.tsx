import type React from "react"
import { MotionPath } from "./motion-path"

export const Variant2 = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 618.9 330.65"
      {...props}
    >
      <title>HyperPath</title>

      <defs>
        <style>
          {`
                    .cls-1 {
                    stroke: url(#linear-gradient-4);
                  }

                  .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 {
                    fill: none;
                    stroke-miterlimit: 10;
                    opacity: 0.32;
                  }

                  .cls-2 {
                    stroke: url(#linear-gradient-3);
                  }

                  .cls-3 {
                    stroke: url(#linear-gradient-2);
                  }

                  .cls-4 {
                    stroke: url(#linear-gradient-5);
                  }

                  .cls-5 {
                    stroke: url(#linear-gradient);
                  }`}
        </style>

        <linearGradient id="linear-gradient" x1="0" y1="51.81" x2="618.9" y2="51.81" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1d1d1b" stopOpacity="0" />
          <stop offset="0" stopColor="#2a2a28" stopOpacity=".06" />
          <stop offset=".02" stopColor="#525251" stopOpacity=".23" />
          <stop offset=".03" stopColor="#777776" stopOpacity=".39" />
          <stop offset=".05" stopColor="#979796" stopOpacity=".53" />
          <stop offset=".06" stopColor="#b1b1b1" stopOpacity=".65" />
          <stop offset=".08" stopColor="#c7c7c7" stopOpacity=".74" />
          <stop offset=".1" stopColor="#d7d7d7" stopOpacity=".81" />
          <stop offset=".13" stopColor="#e3e3e3" stopOpacity=".86" />
          <stop offset=".17" stopColor="#eaeaea" stopOpacity=".89" />
          <stop offset=".28" stopColor="#ececec" stopOpacity=".9" />
          <stop offset=".54" stopColor="#585857" stopOpacity=".8" />
          <stop offset=".57" stopColor="#7e7e7d" stopOpacity=".85" />
          <stop offset=".61" stopColor="#a0a09f" stopOpacity=".89" />
          <stop offset=".66" stopColor="#bdbdbd" stopOpacity=".92" />
          <stop offset=".71" stopColor="#d5d5d5" stopOpacity=".95" />
          <stop offset=".76" stopColor="#e8e8e7" stopOpacity=".97" />
          <stop offset=".82" stopColor="#f5f5f5" stopOpacity=".99" />
          <stop offset=".89" stopColor="#fcfcfc" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>

        <linearGradient id="linear-gradient-2" y1="108.57" y2="108.57" xlinkHref="#linear-gradient" />
        <linearGradient id="linear-gradient-3" y1="165.33" y2="165.33" xlinkHref="#linear-gradient" />
        <linearGradient id="linear-gradient-4" y1="222.08" y2="222.08" xlinkHref="#linear-gradient" />
        <linearGradient id="linear-gradient-5" y1="278.84" y2="278.84" xlinkHref="#linear-gradient" />
      </defs>

      <g>
        <MotionPath id="first-lane" color="blue">
          <path className="cls-5" d="M0,.5h190.71c28.9,0,56.61,11.48,77.04,31.91l37.76,37.76c21.1,21.1,49.73,32.96,79.57,32.96h233.81" />
        </MotionPath>
        <MotionPath id="second-lane" color="blue">
          <path className="cls-3" d="M0,82.91h190.71c28.9,0,56.61,5.74,77.04,15.96l37.76,18.88c21.1,10.55,49.73,16.48,79.57,16.48h233.81" />
        </MotionPath>
        <MotionPath id="third-lane" color="blue">
          <path className="cls-2" d="M0,165.33h190.71c28.9,0,56.61,0,77.04,0h37.76c21.1,0,49.73,0,79.57,0h233.81" />
        </MotionPath>
        <MotionPath id="fourth-lane" color="blue">
          <path className="cls-1" d="M0,247.74h190.71c28.9,0,56.61-5.74,77.04-15.96l37.76-18.88c21.1-10.55,49.73-16.48,79.57-16.48h233.81" />
        </MotionPath>
        <MotionPath id="fifth-lane" color="blue">
          <path className="cls-4" d="M0,330.15h190.71c28.9,0,56.61-11.48,77.04-31.91l37.76-37.76c21.1-21.1,49.73-32.96,79.57-32.96h233.81" />
        </MotionPath>
      </g>

    </svg>
  )
}
