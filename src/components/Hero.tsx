"use client";

import { motion } from "framer-motion";
import { Terminal } from "./Terminal";
import { CyclingTitle } from "./CyclingTitle";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.p
            className="section-label"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            available for new projects
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }}
          >
            Kareem{" "}
            <span className="text-accent text-glow">Almasri</span>
            <span className="inline-block w-3 h-12 -mb-1.5 ml-1 bg-accent animate-blink align-baseline" />
          </motion.h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
          >
            <CyclingTitle />
          </motion.div>

          <motion.p
            className="max-w-xl text-fg-muted leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
          >
            I build production-grade LLM applications — retrieval pipelines,
            agentic workflows, and fine-tuned models that ship real value.
            Currently exploring the edges of context engineering and
            multi-modal RAG.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
          >
            <a href="#projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 18 12 22 16 18" />
                <polyline points="8 6 12 2 16 6" />
                <line x1="12" y1="2" x2="12" y2="22" />
              </svg>
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — terminal */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.3 }}
        >
          <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative">
            <Terminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
