"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUpChild } from "./AnimatedSection";

type Status = "idle" | "sending" | "sent" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    setTimeout(() => {
      window.location.href = `mailto:almasriforkarem@gmail.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 400);
  }

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <p className="section-label mb-3 justify-center">
            <span className="text-fg-subtle">03.</span> contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let&apos;s build something.
          </h2>
          <p className="text-fg-muted leading-relaxed max-w-xl mx-auto">
            Working on an LLM problem? Want to collaborate? Drop a message and
            I&apos;ll get back to you within a day.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="card p-6 sm:p-8 space-y-5"
          noValidate
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpChild}>
            <Field
              label="name"
              id="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Ada Lovelace"
            />
          </motion.div>

          <motion.div variants={fadeUpChild}>
            <Field
              label="email"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="ada@analytical.engine"
            />
          </motion.div>

          <motion.div variants={fadeUpChild}>
            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-fg-subtle mb-2">
              <span className="text-accent">$</span> message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg font-sans text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-between gap-4 pt-2"
            variants={fadeUpChild}
          >
            <p className="font-mono text-xs text-fg-subtle">
              {status === "sent"
                ? "→ opening your mail client…"
                : "↳ press send to open mail client"}
            </p>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary disabled:opacity-50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {status === "sending" ? (
                <span>sending…</span>
              ) : (
                <>
                  send
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label, id, value, onChange, placeholder, type = "text",
}: {
  label: string; id: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-fg-subtle mb-2">
        <span className="text-accent">$</span> {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg font-sans text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
      />
    </div>
  );
}
