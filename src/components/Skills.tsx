import { useState } from "react";
import { Atom, Boxes, Brain, Cpu, Database, TrendingUp, Workflow, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import { SKILLS } from "@/utils/data";

const ICONS: Record<string, React.ReactNode> = {
  Atom: <Atom className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Workflow: <Workflow className="h-5 w-5" />,
  Boxes: <Boxes className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
};

export default function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const rawCategories = ["All", ...SKILLS.map((c) => c.category)];

  const displayedSkills = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 border-b border-zinc-200/80 dark:border-white/5 bg-white dark:bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            badge={t("skills.badge")}
            title={t("skills.title")}
            titleAccent={t("skills.titleAccent")}
            description={t("skills.description")}
          />

          {/* Category Filter Pills */}
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {rawCategories.map((cat) => {
              const label = cat === "All" ? t("skills.all") : (t(`skills.categories.${cat}`) || cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayedSkills.map((category) => (
            <div
              key={category.category}
              className="bezel-outer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bezel-inner p-6 flex flex-col justify-between h-full">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                        {ICONS[category.icon] ?? <Cpu className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                          {t(`skills.categories.${category.category}`) || category.category}
                        </h3>
                        <p className="text-[11px] font-mono-tech text-zinc-500">
                          {category.skills.length} {t("skills.technologies")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Cloud */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/chip relative flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 transition-all hover:border-teal-500/40 hover:bg-white dark:border-white/5 dark:bg-zinc-800/40 dark:text-zinc-200 dark:hover:bg-zinc-800/90"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500/80 group-hover/chip:bg-teal-500" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
