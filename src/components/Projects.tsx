import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bot, ExternalLink, Layers3, Star, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Github } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { PROJECTS } from "@/utils/data";
import type { Project } from "@/types";

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-zinc-200 bg-[#f7f8f6] py-24 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="ai-grid-floor absolute left-0 top-8 hidden h-72 w-1/2 opacity-60 lg:block" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("projects.badge")}
          title={t("projects.title")}
          titleAccent={t("projects.titleAccent")}
          description={t("projects.description")}
        />

        <div className="relative mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="project-tilt group flex h-full min-h-[520px] cursor-pointer flex-col rounded-[1.6rem] border border-white/70 bg-white/78 p-5 shadow-[0_30px_75px_-56px_rgba(15,23,42,0.78)] ring-1 ring-zinc-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-teal-700/25 hover:shadow-[0_36px_85px_-58px_rgba(15,118,110,0.85)] active:translate-y-0 dark:border-white/10 dark:bg-zinc-900/72 dark:ring-white/10 dark:hover:border-teal-300/25"
    >
      <div className="mb-5 rounded-[1.15rem] border border-zinc-200 bg-[#fbfcfa] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-700/10 text-teal-800 dark:bg-teal-300/10 dark:text-teal-300">
              <Bot className="h-4 w-4" />
            </span>
            <span className="font-mono text-xs font-black uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              PRJ-{String(index + 1).padStart(2, "0")}
            </span>
          </div>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-700/20 bg-teal-700/10 px-2.5 py-1 text-xs font-bold text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-2xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white">
            {project.title}
          </h3>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-zinc-200 bg-white font-mono text-lg font-black text-zinc-950 shadow-[0_16px_35px_-28px_rgba(15,23,42,0.9)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      <p className="line-clamp-4 min-h-[6rem] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <div className="mt-5 flex-1">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          <Layers3 className="h-3.5 w-3.5 text-teal-700 dark:text-teal-300" />
          Key features
        </div>
        <ul className="grid min-h-[6rem] gap-2">
          {project.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-300" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex min-h-[5.5rem] flex-wrap content-start gap-2 overflow-hidden">
        {project.techStack.slice(0, 8).map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-zinc-200 bg-[#f7f8f6] px-2.5 py-1 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800" onClick={(event) => event.stopPropagation()}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 transition hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-300"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-zinc-600 transition hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-300"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label="Close project details"
        className="absolute inset-0 cursor-default bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-700 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-zinc-200 bg-[#f7f8f6] p-7 pr-16 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            Project detail
          </p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
            {project.title}
          </h2>
        </div>

        <div className="overflow-y-auto p-7">
          <h3 className="text-lg font-black text-zinc-950 dark:text-white">Overview</h3>
          <p className="mt-3 text-base leading-8 text-zinc-600 dark:text-zinc-300">
            {project.description}
          </p>

          <h3 className="mt-8 text-lg font-black text-zinc-950 dark:text-white">Key Features</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-zinc-200 bg-[#f7f8f6] p-3 text-sm font-semibold leading-6 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {feature}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-black text-zinc-950 dark:text-white">Technologies</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-teal-700/20 bg-teal-700/10 px-3 py-1.5 text-sm font-bold text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-bold text-zinc-800 transition hover:border-teal-700/40 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-200"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
