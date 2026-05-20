import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, X } from "lucide-react";
import { Github } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { PROJECTS } from "@/utils/data";
import type { Project } from "@/types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="bg-white/30 dark:bg-slate-950/15 backdrop-blur-sm relative"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Projects"
          title="Things I've"
          titleAccent="Built"
          description="A showcase of real-world applications I've designed and engineered from scratch."
        />

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          <AnimatePresence>
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
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
  const [hovered, setHovered] = useState(false);

  const CARD_COLORS = [
    "from-violet-500/80 to-indigo-600/80",
    "from-blue-500/80 to-cyan-500/80",
    "from-emerald-500/80 to-teal-500/80",
    "from-orange-500/80 to-red-500/80",
    "from-pink-500/80 to-rose-500/80",
  ];
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="group rounded-2xl liquid-glass liquid-glass-hover shadow-md hover:shadow-2xl hover:shadow-violet-500/5 border border-white/20 dark:border-white/5 overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Card Header */}
      <div
        className={`relative bg-gradient-to-br ${colorClass} p-6 overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4 text-7xl font-black text-white select-none">
            {project.title.charAt(0)}
          </div>
        </div>

        {project.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </span>
        )}

        <motion.div
          animate={hovered ? { scale: 1.03 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <h3 className="text-white font-extrabold text-xl leading-tight drop-shadow-sm">
            {project.title}
          </h3>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Key Features
          </p>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded bg-white/40 dark:bg-white/5 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-950/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex gap-3 pt-4 border-t border-white/20 dark:border-white/5"
          onClick={(e) => e.stopPropagation()}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors ml-auto cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        {/* Header */}
        <div className="relative bg-gradient-to-br from-violet-500/90 to-indigo-600/90 p-8 flex items-end overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 text-9xl font-black text-white select-none">
              {project.title.charAt(0)}
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white relative z-10 drop-shadow-md">
            {project.title}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl border border-gray-100 dark:border-slate-800"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 shadow-sm shadow-violet-500/50" />
                  <span className="text-sm font-medium leading-tight">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-black/5"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
