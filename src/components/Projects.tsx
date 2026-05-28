"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUpChild } from "./AnimatedSection";

type Project = {
  number: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
};

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "RAG Knowledge Assistant",
    description:
      "Production-ready retrieval pipeline with hybrid search, reranking, and cited responses. Handles multi-format ingestion and streams answers under 200ms TTFT.",
    tech: ["Python", "LangChain", "Qdrant", "FastAPI", "OpenAI"],
    github: "https://github.com/kareemalmasri",
  },
  {
    number: "02",
    name: "Agentic Workflow Engine",
    description:
      "Multi-step agent runtime with tool calling, memory, and human-in-the-loop checkpoints. Built for reliability with full trace logging and replay.",
    tech: ["Python", "Anthropic", "Pydantic", "Redis", "Docker"],
    github: "https://github.com/kareemalmasri",
  },
  {
    number: "03",
    name: "Fine-tuned Domain Model",
    description:
      "LoRA-adapted instruction model for specialized domain Q&A. Includes eval harness, synthetic data generation, and a serving layer with token streaming.",
    tech: ["HuggingFace", "PyTorch", "PEFT", "QLoRA", "vLLM"],
    github: "https://github.com/kareemalmasri",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="section-label mb-3">
            <span className="text-fg-subtle">02.</span> work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Selected projects.
          </h2>
          <p className="text-fg-muted leading-relaxed">
            A few things I&apos;ve built. Each one solved a real problem and
            taught me something I now bring to the next one.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {PROJECTS.map((p) => (
            <motion.div key={p.number} variants={fadeUpChild}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="card p-6 flex flex-col group h-full"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="font-mono text-3xl font-bold text-fg-subtle group-hover:text-accent transition-colors">
          /{project.number}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="text-fg-muted hover:text-accent transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.41.36.77 1.06.77 2.14v3.17c0 .31.21.68.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
        {project.name}
      </h3>
      <p className="text-fg-muted text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[11px] text-fg-subtle px-2 py-0.5 rounded border border-border">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
