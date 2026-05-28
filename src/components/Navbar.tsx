"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm"
          aria-label="Home"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border-strong bg-bg-elev text-accent font-bold tracking-tighter transition-all group-hover:border-accent group-hover:shadow-[0_0_20px_-4px_var(--color-accent-glow)]">
            KA
          </span>
          <span className="text-fg-muted hidden sm:inline">
            <span className="text-accent">~/</span>kareem-almasri
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-mono text-sm">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group px-3 py-2 rounded-md text-fg-muted hover:text-accent transition-colors"
              >
                <span className="text-fg-subtle">0{i + 1}.</span>{" "}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border-strong text-fg-muted hover:text-accent hover:border-accent"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg-elev/95 backdrop-blur">
          <ul className="px-6 py-4 flex flex-col gap-2 font-mono text-sm">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-fg-muted hover:text-accent hover:bg-bg-card"
                >
                  <span className="text-fg-subtle">0{i + 1}.</span>{" "}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
