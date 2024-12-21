"use client"
import React from "react";
import { MultipleLanes,  } from "./MultiplePath";
import { AnimateEvents, Streamlines } from "./Streamlines";

export default function Page() {
  return <div className="bg-[#111] min-h-[100svh]">
    {/* <Old /> */}
    <New />
  </div>
}

function New() {
  React.useEffect(() => {
    function runAnimation() {
      const stream_paths = [
        { id: 'first-lane', color: 'purple', text: 'Polygon' },
        { id: 'second-lane', color: 'orange', text: "Binance" },
        { id: 'third-lane', color: 'fushia', text: 'Nubian' },
      ]

      for (const index in stream_paths) {
        const path = stream_paths[index];

        setTimeout(() => {
          AnimateEvents.dispatch({
            id: path.id,
            action: "play",
            data: path
          });
        }, 300 * Number(index));
      }
    }

    window.addEventListener('keyup', (evt) => {
      if (evt.code === 'ArrowUp') {
        runAnimation();
      }
    })
  }, [])

  return <div className="fixed -top-4 -bottom-4 bg--200">
    <MultipleLanes height="100svh" />
  </div>
}

function Old() {
  const stream_paths = React.useRef([
    { id: '42FK', color: 'purple', text: 'Polygon' },
    { id: 'A6EP', color: 'pink', text: "PolkaDot" },
    { id: 'KFac', color: 'dodgerblue', text: 'Base' },
    { id: '8Cac', color: 'crimson', text: 'Optimus' },
  ]).current;

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

  return <div className="absolute top-0 left-0 flex">
    {stream_paths.map(e => {
      return <div key={e.id}>
        <Streamlines id={e.id} color={e.color} width="26vh" height="100svh" />
      </div>
    })}
  </div>
}
