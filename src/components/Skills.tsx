"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUpChild } from "./AnimatedSection";

const SKILL_GROUPS = [
  { label: "core",      skills: ["Python", "FastAPI", "Docker"] },
  { label: "llm",       skills: ["LangChain", "RAG Systems", "Vector Databases", "Prompt Engineering", "Fine-tuning (LoRA/QLoRA)"] },
  { label: "providers", skills: ["OpenAI API", "Anthropic API", "HuggingFace"] },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="section-label mb-3">
            <span className="text-fg-subtle">01.</span> stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Tools that ship.
          </h2>
          <p className="text-fg-muted leading-relaxed">
            A pragmatic toolkit for taking LLM ideas from notebook to
            production — model orchestration, retrieval, evals, and the
            infrastructure to glue it all together.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeUpChild}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 items-start"
            >
              <div className="font-mono text-xs text-fg-subtle uppercase tracking-widest pt-2 min-w-[80px]">
                <span className="text-accent">#</span> {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="tag"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
