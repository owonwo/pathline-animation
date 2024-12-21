"use client"
import React from "react";
import { AnimateEvents, Streamlines } from "./Streamlines";

const stream_paths = [
  { id: '42FK', color: 'orange' },
  { id: 'A6EP', color: 'lime' },
  { id: 'KFac', color: 'dodgerblue' }
]

export default function Page() {
  React.useEffect(() => {
    for (const index in stream_paths) {
      const entry = stream_paths[index];

      setTimeout(() => {
        AnimateEvents.dispatch(entry.id);
      }, 1000 * +index)
    }
  }, [])

  return <div className="bg-[#111] min-h-[100svh]">
    <div className="absolute top-0 left-0 flex">
      {stream_paths.map(e => {
        return <div key={e.id}>
          <Streamlines id={e.id} color={e.color} width="26vh" height="100svh" />
        </div>
      })}
    </div>
  </div>
}
