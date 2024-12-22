"use client";
import cn from 'classnames'
import React from "react";
import { ANIMATION_DURATION } from "../components/animations";
import { Variant1 } from "../components/Variant1";
import { Variant2 } from '../components/Variant2';
import {
  AnimateEvents,
  type AnimationEventPayload,
  Streamlines,
} from "../components/Streamlines";

export default function Page() {
  return (
    <div className="bg-[#111] text-white min-h-[100svh]">
      <Main />
    </div>
  );
}

function Main() {
  const subscription = React.useRef<Set<NodeJS.Timer>>(new Set());
  const options = React.useRef([
    { color: "fuchsia", text: "Polygon" },
    { color: "rebeccapurple", text: "Ethereum" },
    { color: "crimson", text: "Optimus" },
    { color: "dodgerblue", text: "Base" },
    { color: "yellow", text: "Binance" },
    { color: "blue", text: "Arbitrum" },
    { color: "white", text: "Gnosis" },
  ]).current;

  const [variant, setVariant] = React.useState(0);

  const repeatInfinitely = React.useCallback(function runFor(
    getArray: () => Omit<AnimationEventPayload, 'id'>[],
  ) {
    const ids = [
      'first-lane', 'second-lane', 'third-lane', 'fourth-lane', 'fifth-lane'
    ];

    function stopAll() {
      subscription.current.forEach((id) => clearInterval(id));
      subscription.current.clear();
    }

    function playAll() {
      const array = getArray();
      const lanes = getRandomN(array.length, ids);

      for (const index in array) {
        const path = array[index];
        const id = lanes[index];

        setTimeout(() => {
          AnimateEvents.dispatch({
            action: "play",
            data: { ...path, id },
          });
        }, 300 * Number(index));
      }
    }

    stopAll();
    playAll();
    const intervalId = setInterval(() => {
      playAll()
    }, ANIMATION_DURATION)

    subscription.current.add(intervalId);
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      repeatInfinitely(() => getRandomN(3, options));
    }, 1000);

    return () => {
      clearTimeout(id);
    }
  }, [repeatInfinitely, options])

  return (
    <main>
      <nav className="flex fixed z-20 top-0 right-0 p-4 gap-4 uppercase text-xs">
        <span className='opacity-30 tracking-wider'>VARIANTS</span>
        {[0, 1].map(index => {
          return <Button
            key={index}
            isActive={variant === index}
            onClick={() => {
              setVariant(index);
              repeatInfinitely(() => getRandomN(2, options))
            }}>
            0{index + 1}
          </Button>
        })}
      </nav>

      <div className="pointer-events-none">
        {variant === 0 ?
          <div className="fixed -top-4 -bottom-4 bg-200">
            <Variant1 width="80vw" height="105svh" />
          </div> : null}

        {variant === 1 ? <div className="fixed -top-4 -bottom-4 items-center flex justify-start bg-200">
          <Variant2 className='w-[calc(50svw-200px)] h-[auto]' />
          <div className="rounded-lg border border-white/[0.12] bg-gradient-to-br from-[#212222] via-[#111212] to-[#111111] w-[400px] aspect-[1/1.2] shadow-lg shadow-black" />
        </div> : null}
      </div>
    </main>
  );
}

function LegacyV1() {
  const stream_paths = React.useRef([
    { id: "42FK", color: "purple", text: "Polygon" },
    { id: "A6EP", color: "pink", text: "PolkaDot" },
    { id: "KFac", color: "dodgerblue", text: "Base" },
    { id: "8Cac", color: "crimson", text: "Optimus" },
  ]).current;

  React.useEffect(() => {
    for (const index in stream_paths) {
      const entry = stream_paths[index];

      setTimeout(() => {
        AnimateEvents.dispatch({
          id: entry.id,
          action: "play",
          data: entry,
        });
      }, 300 * +index);
    }
  }, [stream_paths]);

  return (
    <div className="absolute top-0 left-0 flex">
      {stream_paths.map((e) => {
        return (
          <div key={e.id}>
            <Streamlines
              id={e.id}
              color={e.color}
              width="26vh"
              height="100svh"
            />
          </div>
        );
      })}
    </div>
  );
}

function Button(props: React.ComponentProps<'button'> & { isActive: boolean }) {
  return <button type="button" className={cn("", {
    "text-cyan-500": props.isActive
  })} {...props} />
}

function getRandomN<T>(N: number, array: T[]) {
  if (N > array.length) {
    throw new Error(
      "N cannot be greater than the number of entries in the array.",
    );
  }

  const shuffledArray = array.slice(); // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j],
      shuffledArray[i],
    ]; // Swap elements
  }

  return shuffledArray.slice(0, N);
}
