import { motion } from 'framer-motion'
import { Globe, Code2, Server, GitFork } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { SERVICES } from '@/utils/data'
import type { Service } from '@/types'

const ICON_MAP: Record<string, React.ReactNode> = {
  FaGlobe: <Globe className="w-6 h-6" />,
  FaCode: <Code2 className="w-6 h-6" />,
  FaServer: <Server className="w-6 h-6" />,
  FaSitemap: <GitFork className="w-6 h-6" />,
}

const CARD_GRADIENTS = [
  'from-violet-500 to-indigo-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-violet-400/5 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Services"
          title="What I Can"
          titleAccent="Do for You"
          description="From a simple landing page to complex distributed systems — I've got you covered."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl p-6 liquid-glass liquid-glass-hover shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col border border-white/20 dark:border-white/5"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        {ICON_MAP[service.icon]}
      </div>

      {/* Title */}
      <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1 italic">
        "{service.description}"
      </p>

      {/* Features */}
      <ul className="space-y-1.5 border-t border-white/20 dark:border-white/5 pt-4">
        {service.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} flex-shrink-0`}
            />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
