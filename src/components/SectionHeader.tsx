import React from "react";

interface SectionHeaderProps {
  badge: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleAccent,
  description,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`relative ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {/* Micro Eyebrow Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1 text-[11px] font-mono-tech font-semibold uppercase tracking-[0.18em] text-teal-700 backdrop-blur-md dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="radar-dot absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></span>
        </span>
        {badge}
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
        {title}{" "}
        {titleAccent && (
          <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-300">
            {titleAccent}
          </span>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
