import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Mail,
  Sparkles,
  Star,
  Workflow,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { Github } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { CV_URL, getProjects } from "@/utils/data";
import type { Project } from "@/types";

export default function Projects() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("vi") ? "vi" : "en";
  
  const projectsList = useMemo(() => getProjects(currentLang), [currentLang]);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projectsList.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId, projectsList]);

  const filterTabs = [
    { label: t("projects.all"), key: "All" },
    { label: t("projects.filterBackend"), key: "Backend" },
    { label: t("projects.filterAI"), key: "AI" },
    { label: t("projects.filterRealtime"), key: "Realtime" },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsList;
    if (activeFilter === "Backend") {
      return projectsList.filter((p) =>
        p.techStack.some((tech) => tech.toLowerCase().includes("spring") || tech.toLowerCase().includes("java"))
      );
    }
    if (activeFilter === "AI") {
      return projectsList.filter((p) =>
        p.techStack.some((tech) => tech.toLowerCase().includes("gemini") || tech.toLowerCase().includes("ai") || tech.toLowerCase().includes("prophet"))
      );
    }
    if (activeFilter === "Realtime") {
      return projectsList.filter((p) =>
        p.techStack.some((tech) => tech.toLowerCase().includes("websocket") || tech.toLowerCase().includes("stomp") || tech.toLowerCase().includes("kafka"))
      );
    }
    return projectsList;
  }, [activeFilter, projectsList]);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 border-b border-zinc-200/80 dark:border-white/5 bg-[#f8fafc] dark:bg-[#09090b]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            badge={t("projects.badge")}
            title={t("projects.title")}
            titleAccent={t("projects.titleAccent")}
            description={t("projects.description")}
          />

          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold transition-all ${
                  activeFilter === tab.key
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                    : "bg-zinc-200/70 text-zinc-600 hover:bg-zinc-300/80 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProjectId(project.id)}
            />
          ))}
        </div>

        {/* Recruiter Banner */}
        <div className="mt-16 bezel-outer">
          <div className="bezel-inner p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {t("projects.ctaBadge")}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {t("projects.ctaTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("projects.ctaDescription")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 pl-5 pr-2 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-teal-700 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-300"
              >
                <span>{t("projects.ctaCv")}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 dark:bg-zinc-900/15">
                  <Download className="h-3 w-3" />
                </span>
              </a>

              <Link to="contact" smooth duration={450}>
                <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-xs font-bold text-zinc-800 transition hover:border-teal-500/50 hover:bg-zinc-50 active:scale-95 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{t("projects.ctaEmail")}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Project Modal Portal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const { t } = useTranslation();
  const isAI = project.techStack.some((tech) => tech.toLowerCase().includes("gemini") || tech.toLowerCase().includes("ai"));

  return (
    <div className="bezel-outer group flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="bezel-inner p-6 flex flex-col justify-between h-full space-y-5">
        
        {/* Card Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-[11px] font-bold text-zinc-500">
                PRJ-{String(index + 1).padStart(2, "0")}
              </span>
              {isAI && (
                <span className="inline-flex items-center gap-1 rounded-full border border-teal-500/20 bg-teal-500/10 px-2 py-0.5 text-[10px] font-mono-tech font-bold text-teal-700 dark:text-teal-300">
                  <Sparkles className="h-2.5 w-2.5" />
                  {t("projects.aiAssisted")}
                </span>
              )}
            </div>

            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-mono-tech font-bold text-amber-700 dark:text-amber-300">
                <Star className="h-3 w-3 fill-current" />
                {t("projects.featured")}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3
            onClick={onSelect}
            className="mt-4 text-xl font-bold tracking-tight text-zinc-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400 cursor-pointer transition-colors"
          >
            {project.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400">
            {project.description}
          </p>
        </div>

        {/* Key Features Highlights */}
        <div className="space-y-2 py-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-tech font-bold text-zinc-500 uppercase tracking-wider">
            <Workflow className="h-3 w-3 text-teal-600 dark:text-teal-400" />
            <span>{t("projects.archHighlights")}</span>
          </div>
          <ul className="space-y-1.5">
            {project.features.slice(0, 2).map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 leading-snug">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                <span className="line-clamp-2">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-white/5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-200/80 bg-zinc-50/80 px-2 py-0.5 text-[11px] font-mono-tech font-semibold text-zinc-700 dark:border-white/5 dark:bg-zinc-800/50 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono-tech text-zinc-500 dark:bg-zinc-800">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-white/5">
          <button
            onClick={onSelect}
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200 transition-colors"
          >
            <span>{t("projects.deepDive")}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("projects.sourceCode")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition hover:border-teal-500/40 hover:text-teal-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("projects.liveDemo")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition hover:border-teal-500/40 hover:text-teal-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-zinc-200 bg-white shadow-2xl overflow-hidden dark:border-white/10 dark:bg-zinc-950">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-zinc-200/80 bg-zinc-50/50 dark:border-white/10 dark:bg-zinc-900/50">
          <div>
            <span className="text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {t("projects.briefBadge")}
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label={t("projects.closeDialog")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Overview */}
          <div>
            <h3 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-zinc-500">
              {t("projects.overviewHeading")}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>
          </div>

          {/* Technical Deliverables */}
          <div>
            <h3 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-zinc-500">
              {t("projects.capabilitiesHeading")}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200/70 bg-zinc-50/60 p-3.5 text-xs sm:text-sm text-zinc-800 dark:border-white/5 dark:bg-zinc-900/60 dark:text-zinc-200 leading-relaxed"
                >
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400 font-mono-tech text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-zinc-500">
              {t("projects.techDeployedHeading")}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono-tech font-bold text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-zinc-200/80 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-4 dark:border-white/10 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Github className="h-4 w-4" />
                <span>{t("projects.sourceCode")}</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-bold text-zinc-800 transition hover:border-teal-500/50 dark:border-white/15 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t("projects.liveInstance")}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono-tech font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            {t("projects.closeDialog")}
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
