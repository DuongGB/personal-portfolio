import { Award, Briefcase, Building2, CheckCircle2, Code2, GraduationCap, Layers, Server, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { icon: Briefcase, value: "1+", label: t("about.stats.experience"), detail: t("about.stats.experienceDetail") },
    { icon: Code2, value: "5+", label: t("about.stats.projects"), detail: t("about.stats.projectsDetail") },
    { icon: Award, value: "3.22", label: t("about.stats.gpa"), detail: t("about.stats.gpaDetail") },
    { icon: Zap, value: "47.2k+", label: t("about.stats.loc"), detail: t("about.stats.locDetail") },
  ];

  const archPillars = [
    {
      title: t("about.pillars.microservicesTitle"),
      icon: Building2,
      desc: t("about.pillars.microservicesDesc"),
      tag: t("about.pillars.microservicesTag"),
    },
    {
      title: t("about.pillars.springTitle"),
      icon: Server,
      desc: t("about.pillars.springDesc"),
      tag: t("about.pillars.springTag"),
    },
    {
      title: t("about.pillars.frontendTitle"),
      icon: Code2,
      desc: t("about.pillars.frontendDesc"),
      tag: t("about.pillars.frontendTag"),
    },
    {
      title: t("about.pillars.aiTitle"),
      icon: Sparkles,
      desc: t("about.pillars.aiDesc"),
      tag: t("about.pillars.aiTag"),
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 border-b border-zinc-200/80 dark:border-white/5 bg-[#f8fafc] dark:bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge={t("about.badge")}
          title={t("about.title")}
          titleAccent={t("about.titleAccent")}
          description={t("about.description")}
        />

        {/* Bento Grid Architecture */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          
          {/* Bento Item 1: Narrative & Engineering Philosophy (7 cols) */}
          <div className="bezel-outer lg:col-span-7">
            <div className="bezel-inner p-7 sm:p-9 h-full flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{t("about.mindsetBadge")}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                  {t("about.mindsetTitle")}
                </h3>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 text-sm font-medium text-teal-900 dark:text-teal-200">
                  💡 <em>&quot;{t("about.quote")}&quot;</em>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200/60 dark:border-white/5">
                <span className="text-xs font-mono-tech text-zinc-500">{t("about.expertise")}</span>
                {["Spring Boot 3", "React 19", "Microservices", "Kafka", "Docker", "Gemini AI"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-200 bg-zinc-100/70 px-2.5 py-1 text-xs font-mono-tech font-semibold text-zinc-700 dark:border-white/10 dark:bg-zinc-800/60 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Item 2: Impact Metrics (5 cols) */}
          <div className="bezel-outer lg:col-span-5">
            <div className="bezel-inner p-7 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  <Layers className="h-4 w-4" />
                  <span>{t("about.deliverablesBadge")}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {t("about.deliverablesTitle")}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 transition-all hover:border-teal-500/30 hover:bg-white dark:border-white/5 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 font-mono-tech dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-zinc-200/60 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-zinc-800/50 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">{t("about.onboardingTitle")}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("about.onboardingSubtitle")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Core Architecture Pillars (12 cols) */}
          <div className="bezel-outer lg:col-span-12">
            <div className="bezel-inner p-7 sm:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200/60 dark:border-white/5 gap-3">
                <div>
                  <span className="text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    {t("about.pillarsBadge")}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {t("about.pillarsTitle")}
                  </h3>
                </div>
                <span className="text-xs font-mono-tech text-zinc-500">
                  {t("about.pillarsSub")}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {archPillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex flex-col justify-between rounded-xl border border-zinc-200/70 bg-zinc-50/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-teal-500/40 hover:bg-white hover:shadow-md dark:border-white/5 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/90"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                          <pillar.icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="rounded-full border border-teal-500/20 bg-teal-500/5 px-2.5 py-0.5 text-[10px] font-mono-tech font-bold text-teal-700 dark:text-teal-300">
                          {pillar.tag}
                        </span>
                      </div>
                      <h4 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Item 4: Education & Career Goal (12 cols) */}
          <div className="bezel-outer lg:col-span-12">
            <div className="bezel-inner p-6 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{t("about.educationTitle")}</h4>
                    <p className="mt-0.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
                      {t("about.educationDegree")}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {t("about.educationSchool")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-zinc-200/60 pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0 dark:border-white/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{t("about.careerTitle")}</h4>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {t("about.careerRole")}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {t("about.careerDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
