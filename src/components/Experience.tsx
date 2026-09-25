import { useMemo } from "react";
import { Briefcase, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import { getExperiences } from "@/utils/data";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("vi") ? "vi" : "en";
  const experiences = useMemo(() => getExperiences(currentLang), [currentLang]);

  return (
    <section id="experience" className="relative py-24 sm:py-32 border-b border-zinc-200/80 dark:border-white/5 bg-white dark:bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Section Narrative */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionHeader
              badge={t("experience.badge")}
              title={t("experience.title")}
              titleAccent={t("experience.titleAccent")}
              description={t("experience.description")}
            />

            <div className="mt-8 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5 dark:border-teal-400/20 dark:bg-teal-400/5">
              <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-teal-700 dark:text-teal-300 uppercase">
                <Sparkles className="h-4 w-4" />
                <span>{t("experience.impactBadge")}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {t("experience.impactDesc")}
              </p>
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="lg:col-span-8 space-y-8 relative before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-teal-500/30 before:to-transparent">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex items-start gap-6 group">
                
                {/* Timeline Node */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-teal-600 text-white shadow-md dark:border-zinc-900 ring-4 ring-teal-500/20">
                  <Briefcase className="h-4 w-4" />
                </div>

                {/* Timeline Card */}
                <div className="bezel-outer flex-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="bezel-inner p-6 sm:p-7 space-y-4">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/60 dark:border-white/5">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-mono-tech font-semibold text-zinc-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-mono-tech font-bold text-zinc-500 uppercase tracking-wider">
                        {t("experience.keyContributions")}
                      </p>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Deployed */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 text-[11px] font-mono-tech font-semibold text-zinc-700 dark:border-white/5 dark:bg-zinc-800/50 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
