import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { Github } from './icons/CustomSocials'
import SectionHeader from './SectionHeader'
import { PROJECTS } from '@/utils/data'
import type { Project } from '@/types'

const FILTERS = ['All', 'Fullstack', 'Microservices', 'AI']

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? PROJECTS
      : filter === 'Fullstack'
      ? PROJECTS.filter(p => p.techStack.includes('ReactJS') && p.techStack.includes('Spring Boot'))
      : filter === 'Microservices'
      ? PROJECTS.filter(p => p.description.toLowerCase().includes('microservices'))
      : filter === 'AI'
      ? PROJECTS.filter(p => p.techStack.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('prophet') || t.toLowerCase().includes('gemini')))
      : PROJECTS

  return (
    <section id="projects" className="py-24 bg-white/30 dark:bg-slate-950/15 backdrop-blur-sm relative">
      {/* Background radial soft light */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Projects"
          title="Things I've"
          titleAccent="Built"
          description="A showcase of real-world applications I've designed and engineered from scratch."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mt-10 mb-12">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                filter === f
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 scale-105'
                  : 'bg-white/40 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-102 border border-white/20 dark:border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  const CARD_COLORS = [
    'from-violet-500/80 to-indigo-600/80',
    'from-blue-500/80 to-cyan-500/80',
    'from-emerald-500/80 to-teal-500/80',
    'from-orange-500/80 to-red-500/80',
    'from-pink-500/80 to-rose-500/80',
  ]
  const colorClass = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group rounded-2xl liquid-glass liquid-glass-hover shadow-md hover:shadow-2xl hover:shadow-violet-500/5 border border-white/20 dark:border-white/5 overflow-hidden transition-all duration-300 flex flex-col h-full"
    >
      {/* Card Header */}
      <div className={`relative h-36 bg-gradient-to-br ${colorClass} p-6 overflow-hidden`}>
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
          <h3 className="text-white font-extrabold text-xl leading-tight drop-shadow-sm">{project.title}</h3>
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
            {project.features.slice(0, 3).map(f => (
              <li key={f} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded bg-white/40 dark:bg-white/5 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-950/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/20 dark:border-white/5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>
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
  )
}
