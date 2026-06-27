import { Award, Briefcase, Building2, Code2, GraduationCap, Puzzle, ServerCog, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";

const STATS = [
  { icon: Briefcase, value: "1+", label: "Years Experience" },
  { icon: Code2, value: "5+", label: "Projects Delivered" },
  { icon: Award, value: "3.22", label: "GPA / 4.0" },
  { icon: Target, value: "47.2k", label: "Lines shipped in projects" },
];

const STRENGTHS = [
  {
    title: "Microservices",
    icon: Building2,
    desc: "Independent services, Kafka flows, containerized deployment.",
  },
  {
    title: "Backend depth",
    icon: ServerCog,
    desc: "Spring Boot APIs with security, persistence, and monitoring.",
  },
  {
    title: "Product UI",
    icon: Code2,
    desc: "React interfaces that keep complex workflows readable.",
  },
  {
    title: "Problem solving",
    icon: Puzzle,
    desc: "Breaks vague requirements into testable technical steps.",
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="border-b border-zinc-200 bg-[#f7f8f6] py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("about.badge")}
          title={t("about.title")}
          titleAccent={t("about.titleAccent")}
          description={t("about.description")}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.55)] dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                <p>
                  Hi, I am <strong className="text-zinc-950 dark:text-white">Duong Nguyen</strong>, a Software Engineering graduate focused on building dependable web systems.
                </p>
                <p>
                  My strongest work sits around React, Spring Boot, microservices, realtime messaging, and infrastructure-aware delivery. I like systems that are easy to reason about after the first version ships.
                </p>
                <p>
                  I am looking for a Fresher / Junior Software Engineer role where I can contribute to backend-heavy fullstack products and keep improving in production engineering.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <GraduationCap className="mb-5 h-6 w-6 text-teal-700 dark:text-teal-300" />
                <h3 className="text-lg font-black text-zinc-950 dark:text-white">Education</h3>
                <p className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Bachelor of Software Engineering
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  Ho Chi Minh City University of Industry, 2021 - 2025
                </p>
              </div>
              <div className="rounded-2xl border border-teal-700/20 bg-teal-700/[0.06] p-6 dark:border-teal-300/20 dark:bg-teal-300/[0.07]">
                <Target className="mb-5 h-6 w-6 text-teal-700 dark:text-teal-300" />
                <h3 className="text-lg font-black text-zinc-950 dark:text-white">Career Goal</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  Join a product team that values readable architecture, stable delivery, and practical feature ownership.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <stat.icon className="mb-5 h-5 w-5 text-teal-700 dark:text-teal-300" />
                  <p className="text-3xl font-black text-zinc-950 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-black text-zinc-950 dark:text-white">Core Strengths</h3>
              <div className="mt-5 grid gap-4">
                {STRENGTHS.map((strength) => (
                  <div key={strength.title} className="flex gap-4 border-t border-zinc-200 pt-4 first:border-t-0 first:pt-0 dark:border-zinc-800">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-700/10 text-teal-700 dark:bg-teal-300/10 dark:text-teal-300">
                      <strength.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-zinc-950 dark:text-white">{strength.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{strength.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
