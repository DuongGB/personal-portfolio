import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaReact,
  FaJava,
  FaDocker,
  FaDatabase,
  FaNetworkWired,
  FaChartLine,
  FaRobot,
  FaSitemap,
  FaAws,
} from 'react-icons/fa'
import { SiSpringboot, SiNextdotjs, SiTailwindcss, SiApachekafka } from 'react-icons/si'
import SectionHeader from './SectionHeader'
import { SKILLS } from '@/utils/data'
import type { SkillCategory, Skill } from '@/types'

const ICONS: Record<string, React.ReactNode> = {
  FaReact: <FaReact />,
  FaNodeJs: <FaJava />, // Map NodeJs icon to Java icon for this profile
  FaDocker: <FaDocker />,
  FaDatabase: <FaDatabase />,
  FaSitemap: <FaSitemap />,
  FaNetworkWired: <FaNetworkWired />,
  FaChartLine: <FaChartLine />,
  FaRobot: <FaRobot />,
}


export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-xl transition-shadow duration-300"
    >
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
            className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-100 dark:border-gray-800 hover:border-violet-500/30 hover:bg-white dark:hover:bg-gray-800 transition-all cursor-default"
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
