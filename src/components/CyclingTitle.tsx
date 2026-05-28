"use client";

import { useEffect, useRef, useState } from "react";

const TITLES = ["LLM Engineer", "RAG Systems", "Fine-tuning", "AI Developer"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export function CyclingTitle() {
  const [display, setDisplay] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const cancelled = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    cancelled.current = false;

    async function run() {
      let idx = 0;
      while (!cancelled.current) {
        const title = TITLES[idx % TITLES.length];

        // type forward
        for (let i = 0; i <= title.length; i++) {
          if (cancelled.current) return;
          setDisplay(title.slice(0, i));
          await sleep(rand(80, 150));
        }

        // pause fully typed
        await sleep(1500);
        if (cancelled.current) return;

        // delete backward
        for (let i = title.length; i >= 0; i--) {
          if (cancelled.current) return;
          setDisplay(title.slice(0, i));
          await sleep(rand(40, 60));
        }

        // brief gap before next title
        await sleep(200);
        idx++;
      }
    }

    run();
    return () => { cancelled.current = true; };
  }, []);

  return (
    <span className="font-mono text-base sm:text-lg text-accent">
      {"< "}
      {display}
      <span
        className="inline-block w-[2px] h-[1em] -mb-[0.1em] ml-[1px] bg-accent align-middle"
        style={{ opacity: cursorOn ? 1 : 0 }}
      />
      {" />"}
    </span>
  );
}
