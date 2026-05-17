import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Calendar, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { EXPERIENCES } from '@/utils/data'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-400/5 dark:bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Experience"
          title="My Professional"
          titleAccent="Journey"
          description="A timeline of roles and experiences that shaped my expertise in building production systems."
        />

        <div ref={ref} className="mt-16 relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-indigo-500 to-transparent md:-translate-x-px" />

          {EXPERIENCES.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isInView={isInView}
              isRight={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  exp,
  index,
  isInView,
  isRight,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
  isInView: boolean
  isRight: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-start mb-12 ${
        isRight ? 'md:flex-row-reverse' : 'md:flex-row'
      } flex-row`}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            exp.current
              ? 'bg-violet-500 border-violet-300 dark:border-violet-700 shadow-lg shadow-violet-500/50'
              : 'bg-slate-50 dark:bg-slate-900 border-violet-400'
          }`}
        />
        {exp.current && (
          <span className="absolute w-6 h-6 rounded-full bg-violet-400/30 animate-ping" />
        )}
      </div>

      {/* Content */}
      <div
        className={`ml-16 md:ml-0 ${
          isRight ? 'md:mr-auto md:pr-16 md:pl-0' : 'md:ml-auto md:pl-16 md:pr-0'
        } w-full md:w-[calc(50%-2rem)]`}
      >
        <div className="rounded-2xl p-6 liquid-glass liquid-glass-hover shadow-md hover:shadow-2xl transition-all duration-300 group border border-white/20 dark:border-white/5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {exp.role}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                  {exp.company}
                </span>
              </div>
            </div>
            {exp.current && (
              <span className="flex-shrink-0 text-xs font-semibold bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200/50 dark:border-green-800/40 px-2.5 py-1 rounded-full">
                Current
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mb-4">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{exp.duration}</span>
          </div>

          {/* Responsibilities */}
          <ul className="space-y-2 mb-4">
            {exp.responsibilities.map(r => (
              <li key={r} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-violet-500 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/20 dark:border-white/5">
            {exp.technologies.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-semibold rounded bg-white/40 dark:bg-white/5 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-900/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
