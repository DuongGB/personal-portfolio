import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
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
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
    'from-violet-500 to-indigo-600',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
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
      className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-300 flex flex-col"
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
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            <FiStar className="w-3 h-3 fill-current" />
            Featured
          </span>
        )}

        <motion.div
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <h3 className="text-white font-bold text-xl leading-tight">{project.title}</h3>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
            Key Features
          </p>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map(f => (
              <li key={f} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
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
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {/* <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <FiGithub className="w-4 h-4" />
            Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors ml-auto"
          >
            <FiExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div> */}
      </div>
    </motion.div>
  )
}
