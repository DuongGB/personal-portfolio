import { motion } from 'framer-motion'
import {
  Server,
  Database,
  Layers,
  Zap,
  Cpu,
  Shield,
  Monitor,
  Workflow,
  Boxes,
  Cloud,
} from 'lucide-react'
import SectionHeader from './SectionHeader'

const ARCH_COMPONENTS = [
  {
    id: 'gateway',
    title: 'API Gateway',
    desc: 'Entry point for all requests, handling routing and security.',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    pos: 'top',
  },
  {
    id: 'services',
    title: 'Microservices',
    desc: 'Independent Spring Boot services for distinct business logic.',
    icon: <Layers className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-600',
    pos: 'center',
  },
  {
    id: 'messaging',
    title: 'Kafka / Event Bus',
    desc: 'Asynchronous event streaming between services.',
    icon: <Workflow className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-600',
    pos: 'right',
  },
  {
    id: 'caching',
    title: 'Redis Caching',
    desc: 'High-performance distributed memory storage.',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-red-500 to-rose-600',
    pos: 'left',
  },
  {
    id: 'database',
    title: 'Database Layer',
    desc: 'PostgreSQL, MongoDB, and MariaDB for persistence.',
    icon: <Database className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    pos: 'bottom',
  },
]

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-24 bg-white/30 dark:bg-slate-950/15 backdrop-blur-sm relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Architecture"
          title="System"
          titleAccent="Design"
          description="How I architect scalable, enterprise-grade distributed systems."
        />

        <div className="mt-20 relative min-h-[500px] flex items-center justify-center">
          {/* Central Diagram Visual */}
          <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
            
            {/* Left Column: Caching */}
            <div className="flex justify-center">
              <ArchCard item={ARCH_COMPONENTS[3]} />
            </div>

            {/* Center Column: Gateway -> Services -> DB */}
            <div className="flex flex-col gap-12 items-center">
              <ArchCard item={ARCH_COMPONENTS[0]} />
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-4 bg-violet-500/10 blur-2xl rounded-full"
                />
                <ArchCard item={ARCH_COMPONENTS[1]} />
              </div>
              <ArchCard item={ARCH_COMPONENTS[4]} />
            </div>

            {/* Right Column: Messaging */}
            <div className="flex justify-center">
              <ArchCard item={ARCH_COMPONENTS[2]} />
            </div>

            {/* Connecting Lines (Desktop) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
               {/* Simplified connections */}
               <motion.path
                  d="M 400 120 L 400 200"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-violet-200/50 dark:text-violet-900/30"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
               />
            </svg>
          </div>
        </div>

        {/* Tech Stack Footer for Architecture */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 relative z-10">
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-300">
             <Boxes className="w-4 h-4 text-blue-500" />
             <span>Docker Containerization</span>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-300">
             <Cloud className="w-4 h-4 text-orange-500" />
             <span>AWS Cloud Infrastructure</span>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-300">
             <Monitor className="w-4 h-4 text-cyan-500" />
             <span>Prometheus & Grafana Monitoring</span>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-300">
             <Cpu className="w-4 h-4 text-violet-500" />
             <span>Distributed Microservices</span>
           </div>
        </div>
      </div>
    </section>
  )
}

function ArchCard({ item }: { item: typeof ARCH_COMPONENTS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="z-10 w-full max-w-[280px] rounded-2xl p-5 liquid-glass liquid-glass-hover shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group border border-white/20 dark:border-white/5"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {item.icon}
      </div>
      <h3 className="font-extrabold text-gray-900 dark:text-white mb-2">{item.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
        {item.desc}
      </p>
    </motion.div>
  )
}
