"use client"
import React from "react";
import { AnimateEvents, Streamlines } from "./Streamlines";

const stream_paths = [
  { id: '42FK', color: 'purple', text: 'Polygon' },
  { id: 'A6EP', color: 'pink', text: "PolkaDot" },
  { id: 'KFac', color: 'dodgerblue', text: 'Base' }
]

export default function Page() {
  React.useEffect(() => {
    for (const index in stream_paths) {
      const entry = stream_paths[index];

      setTimeout(() => {
        AnimateEvents.dispatch({
          id: entry.id,
          action: "play",
          data: entry
        });
      }, 300 * +index)
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
