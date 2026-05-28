import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kareem Almasri — LLM Engineer & AI Developer",
  description:
    "Portfolio of Kareem Almasri — LLM Engineer specializing in RAG systems, prompt engineering, and AI application development with Python, LangChain, and modern LLM APIs.",
  keywords: [
    "LLM Engineer",
    "AI Developer",
    "RAG Systems",
    "LangChain",
    "Python",
    "Kareem Almasri",
  ],
  authors: [{ name: "Kareem Almasri" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        {children}
      </body>
    </html>
  );
}
