import { Brain, Check, Code2, Globe, Server, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import { SERVICES } from "@/utils/data";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-6 w-6" />,
  Code2: <Code2 className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
};

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="border-b border-zinc-200 bg-[#f7f8f6] py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("services.badge")}
          title={t("services.title")}
          titleAccent={t("services.titleAccent")}
          description={t("services.description")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.9fr_1.1fr]">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-teal-700/30 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-teal-300/30">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
        {ICON_MAP[service.icon] ?? <Code2 className="h-6 w-6" />}
      </div>
      <h3 className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {service.description}
      </p>
      <ul className="mt-6 space-y-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
        {service.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
