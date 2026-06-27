import { Calendar, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import { EXPERIENCES } from "@/utils/data";

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="border-b border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeader
            badge={t("experience.badge")}
            title={t("experience.title")}
            titleAccent={t("experience.titleAccent")}
            description={t("experience.description")}
          />

          <div className="space-y-5">
            {EXPERIENCES.map((exp) => (
              <article
                key={exp.id}
                className="rounded-2xl border border-zinc-200 bg-[#f7f8f6] p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-2 text-sm font-black text-teal-700 dark:text-teal-300">
                      {exp.company}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-bold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </div>
                </div>

                <ul className="mt-6 grid gap-3">
                  {exp.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
