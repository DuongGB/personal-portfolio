import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiCode, FiAward, FiTarget } from 'react-icons/fi'
import SectionHeader from './SectionHeader'

const STATS = [
  { icon: FiBriefcase, value: '1+', label: 'Years Experience', color: 'text-violet-600 dark:text-violet-400' },
  { icon: FiCode, value: '4+', label: 'Projects Delivered', color: 'text-indigo-600 dark:text-indigo-400' },
  { icon: FiAward, value: '10+', label: 'Happy Clients', color: 'text-cyan-600 dark:text-cyan-400' },
  { icon: FiTarget, value: '99%', label: 'Client Satisfaction', color: 'text-emerald-600 dark:text-emerald-400' },
]

const STRENGTHS = [
  { title: 'Problem Solver', emoji: '🧠', desc: 'Turn complex challenges into elegant solutions' },
  { title: 'Team Player', emoji: '🤝', desc: 'Collaborate and lift team performance' },
  { title: 'Clean Code', emoji: '✨', desc: 'Readable, maintainable, and scalable code' },
  { title: 'Fast Learner', emoji: '⚡', desc: 'Adapt quickly to new technologies' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Building the Future,"
          titleAccent="One Commit at a Time"
          description="Passionate fullstack engineer with a focus on scalable architecture and delightful user experiences."
        />

        <div ref={ref} className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Hi! I'm <span className="font-semibold text-gray-900 dark:text-white">Duong Nguyen</span>, a
                recent <span className="text-violet-600 dark:text-violet-400 font-semibold">Software Engineering graduate</span> with hands-on experience building scalable web applications.
              </p>
              <p>
                I specialize in building production-ready systems using <span className="text-violet-600 dark:text-violet-400 font-semibold">ReactJS</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Spring Boot</span>, and <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Microservices</span>. I have a strong foundation in real-time systems, e-commerce platforms, and distributed architectures.
              </p>
              <p>
                Passionate about leveraging <span className="text-emerald-600 dark:text-emerald-400 font-semibold">AI integrations</span> and modern DevOps practices to deliver high-quality software that solves real-world problems.
              </p>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-lg">🎓</span> Education
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                    Bachelor of Software Engineering
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Ho Chi Minh City University of Industry · 2021 – 2025
                  </p>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1">
                    GPA: 3.22 / 4.0
                  </p>
                </div>
              </div>
            </div>

            {/* Career Goal */}
            <div className="rounded-2xl border border-violet-100 dark:border-violet-900/30 p-5 bg-violet-50/50 dark:bg-violet-900/10">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="text-lg">🎯</span> Career Goal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seeking a Fresher / Junior Software Engineer position to contribute to impactful software systems and bring value through modern technical solutions.
              </p>
            </div>
          </motion.div>

          {/* Right: Stats + Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow group"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Personal Strengths */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Strengths</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: 'Microservices', emoji: '🏗️', desc: 'Designing independent scalable services' },
                  { title: 'Backend Dev', emoji: '⚙️', desc: 'Secure & efficient Spring Boot APIs' },
                  { title: 'Real-time Systems', emoji: '󱐋', desc: 'Sockets, Kafka & Event-driven' },
                  { title: 'Problem Solving', emoji: '🧩', desc: 'Analytical approach to complexity' },
                ].map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white mt-2">{s.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
