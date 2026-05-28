"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "muted" | "accent" | "success";

type RenderedLine =
  | { kind: "prompt"; text: string }
  | { kind: "out"; text: string; tone?: Tone };

type Phase =
  | { step: "prompt-blink" }
  | { step: "typing"; typed: string; full: string }
  | { step: "enter-blink"; typed: string }
  | { step: "streaming"; text: string; tone?: Tone }
  | { step: "idle" };

const SCRIPT: Array<
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: Tone }
  | { kind: "json"; obj: Record<string, string> }
> = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "kareem.almasri", tone: "accent" },
  { kind: "cmd", text: "cat skills.json" },
  {
    kind: "json",
    obj: {
      role: "LLM Engineer",
      focus: "RAG · Agents · Fine-tuning",
      stack: "Python · LangChain · FastAPI",
    },
  },
  { kind: "cmd", text: "status --check" },
  { kind: "out", text: "● open to work · available worldwide", tone: "success" },
];

type FlatSegment =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: Tone };

function flattenScript(): FlatSegment[] {
  const out: FlatSegment[] = [];
  for (const line of SCRIPT) {
    if (line.kind === "cmd") {
      out.push({ kind: "cmd", text: line.text });
    } else if (line.kind === "out") {
      out.push({ kind: "out", text: line.text, tone: line.tone });
    } else {
      const entries = Object.entries(line.obj);
      out.push({ kind: "out", text: "{" });
      entries.forEach(([k, v], i) => {
        out.push({ kind: "out", text: `  "${k}": "${v}"${i < entries.length - 1 ? "," : ""}` });
      });
      out.push({ kind: "out", text: "}" });
    }
  }
  return out;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export function Terminal() {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [phase, setPhase] = useState<Phase>({ step: "idle" });
  const [cursorOn, setCursorOn] = useState(true);
  const cancelled = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    cancelled.current = false;
    const segments = flattenScript();

    async function run() {
      await sleep(600);
      if (cancelled.current) return;

      for (let si = 0; si < segments.length; si++) {
        const seg = segments[si];

        if (seg.kind === "cmd") {
          setPhase({ step: "prompt-blink" });
          await sleep(rand(300, 500));
          if (cancelled.current) return;

          let typed = "";
          for (const ch of seg.text) {
            typed += ch;
            setPhase({ step: "typing", typed, full: seg.text });
            await sleep(rand(80, 180));
            if (cancelled.current) return;
          }

          setPhase({ step: "enter-blink", typed });
          await sleep(rand(300, 500));
          if (cancelled.current) return;

          setLines((prev) => [...prev, { kind: "prompt", text: seg.text }]);
          setPhase({ step: "idle" });
          await sleep(rand(40, 80));
          if (cancelled.current) return;

        } else {
          setPhase({ step: "streaming", text: "", tone: seg.tone });
          await sleep(rand(40, 80));
          if (cancelled.current) return;

          let streamed = "";
          for (const ch of seg.text) {
            streamed += ch;
            setPhase({ step: "streaming", text: streamed, tone: seg.tone });
            await sleep(rand(18, 45));
            if (cancelled.current) return;
          }

          setLines((prev) => [...prev, { kind: "out", text: seg.text, tone: seg.tone }]);
          setPhase({ step: "idle" });

          const next = segments[si + 1];
          if (next) {
            await sleep(next.kind === "cmd" ? rand(500, 900) : rand(200, 400));
            if (cancelled.current) return;
          }
        }
      }

      setPhase({ step: "idle" });
    }

    run();
    return () => { cancelled.current = true; };
  }, []);

  function cursor(on: boolean) {
    return (
      <span
        className="inline-block w-[9px] h-[1.1em] -mb-[0.05em] ml-[1px] bg-accent align-middle"
        style={{ opacity: on ? 1 : 0 }}
      />
    );
  }

  function toneClass(tone?: Tone) {
    if (tone === "accent") return "text-accent";
    if (tone === "success") return "text-[var(--color-success)]";
    return "text-fg-muted";
  }

  function renderActive() {
    switch (phase.step) {
      case "prompt-blink":
        return (
          <div className="flex items-center gap-2">
            <span className="text-accent shrink-0">❯</span>
            {cursor(cursorOn)}
          </div>
        );
      case "typing":
        return (
          <div className="flex items-center gap-2">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-fg">
              {phase.typed}
              {cursor(cursorOn)}
            </span>
          </div>
        );
      case "enter-blink":
        return (
          <div className="flex items-center gap-2">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-fg">
              {phase.typed}
              {cursor(cursorOn)}
            </span>
          </div>
        );
      case "streaming":
        return (
          <div className={`pl-5 ${toneClass(phase.tone)}`}>
            {phase.text}
            {cursor(cursorOn)}
          </div>
        );
      case "idle":
        return (
          <div className="flex items-center gap-2">
            <span className="text-accent shrink-0">❯</span>
            {cursor(cursorOn)}
          </div>
        );
    }
  }

  return (
    <div className="card overflow-hidden font-mono text-sm shadow-2xl shadow-black/40 animate-glow">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-elev">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-fg-subtle text-xs">Kareem@portfolio: ~</span>
      </div>

      <div className="p-5 min-h-[280px] space-y-1">
        {lines.map((line, i) => (
          <CommittedLine key={i} line={line} />
        ))}
        {renderActive()}
      </div>
    </div>
  );
}

function CommittedLine({ line }: { line: RenderedLine }) {
  if (line.kind === "prompt") {
    return (
      <div className="flex items-start gap-2">
        <span className="text-accent shrink-0">❯</span>
        <span className="text-fg">{line.text}</span>
      </div>
    );
  }
  const tone =
    line.tone === "accent"
      ? "text-accent"
      : line.tone === "success"
        ? "text-[var(--color-success)]"
        : "text-fg-muted";
  return <div className={`pl-5 ${tone}`}>{line.text}</div>;
}
