import { AnimatingPath } from "./AnimatingPath";


export default function Page() {
  return <div className="bg-[#111] min-h-[100svh]">
    <div className="absolute top-0 left-0 flex">
      <div>
        <AnimatingPath color="orange" width="26vh" height="100svh" />
      </div>
      <div>
        <AnimatingPath color="blue" width="26vh" height="100svh" />
      </div>
    </div>
  </div>
}
