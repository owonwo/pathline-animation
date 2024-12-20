import { AnimatingPath } from "./AnimatingPath";


export default function Page() {
  return <div className="bg-[#111] min-h-[100svh]">
    <div className="absolute top-0 right-0 flex bg-blue-200">
      <div>
        <AnimatingPath color="orange" width="auto" height="100svh" />
      </div>
      <div>
        <AnimatingPath color="blue" width="auto" height="100svh" />
      </div>
    </div>
  </div>
}
