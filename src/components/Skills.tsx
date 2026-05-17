import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Atom, Cpu, Workflow, Boxes, Database, Zap, TrendingUp, Brain } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { SKILLS } from '@/utils/data'
import type { SkillCategory } from '@/types'

const ICONS: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Workflow: <Workflow className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 bg-white/30 dark:bg-slate-950/15 backdrop-blur-sm relative">
      {/* Background radial soft light */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Skills"
          title="Tools I Work"
          titleAccent="With"
          description="A curated set of technologies and tools I use to build scalable, high-performance applications."
        />

        <div ref={ref} className="mt-16 grid md:grid-cols-2 gap-6">
          {SKILLS.map((category, catIndex) => (
            <SkillCard
              key={category.category}
              category={category}
              catIndex={catIndex}
              isInView={isInView}
              icon={ICONS[category.icon]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  category,
  catIndex,
  isInView,
  icon,
}: {
  category: SkillCategory
  catIndex: number
  isInView: boolean
  icon: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.15 }}
      className="rounded-2xl p-6 liquid-glass liquid-glass-hover group shadow-md shadow-black/5 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-lg`}
          >
            {icon}
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{category.category}</h3>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
              className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-100 dark:border-white/5 hover:border-violet-500/30 hover:bg-white/80 dark:hover:bg-white/10 transition-all cursor-default shadow-sm hover:shadow-md"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
