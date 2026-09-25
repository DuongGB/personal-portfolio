import { useMemo } from "react";
import { Brain, Check, Code2, Globe, Server, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import { getServices } from "@/utils/data";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-5 w-5" />,
  Code2: <Code2 className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Smartphone: <Smartphone className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
};

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("vi") ? "vi" : "en";
  const services = useMemo(() => getServices(currentLang), [currentLang]);

  return (
    <section id="services" className="relative py-24 sm:py-32 border-b border-zinc-200/80 dark:border-white/5 bg-[#f8fafc] dark:bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge={t("services.badge")}
          title={t("services.title")}
          titleAccent={t("services.titleAccent")}
          description={t("services.description")}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bezel-outer group flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
        
        <div>
          {/* Icon Badge */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
            {ICON_MAP[service.icon] ?? <Code2 className="h-5 w-5" />}
          </div>

          <h3 className="mt-5 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {service.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {service.description}
          </p>
        </div>

        {/* Feature List */}
        <div className="pt-4 border-t border-zinc-200/60 dark:border-white/5 space-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
