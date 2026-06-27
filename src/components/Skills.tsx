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

  return (
    <section id="skills" className="border-b border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader
            badge={t("skills.badge")}
            title={t("skills.title")}
            titleAccent={t("skills.titleAccent")}
            description={t("skills.description")}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {SKILLS.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl border border-zinc-200 bg-[#f7f8f6] p-5 transition hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    {ICONS[category.icon]}
                  </div>
                  <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
