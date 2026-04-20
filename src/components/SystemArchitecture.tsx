import { motion } from 'framer-motion'
import {
  FiServer,
  FiDatabase,
  FiLayers,
  FiZap,
  FiCpu,
  FiShield,
  FiMonitor,
} from 'react-icons/fi'
import { SiApachekafka, SiRedis, SiDocker } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import SectionHeader from './SectionHeader'

const ARCH_COMPONENTS = [
  {
    id: 'gateway',
    title: 'API Gateway',
    desc: 'Entry point for all requests, handling routing and security.',
    icon: <FiShield className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    pos: 'top',
  },
  {
    id: 'services',
    title: 'Microservices',
    desc: 'Independent Spring Boot services for distinct business logic.',
    icon: <FiLayers className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-600',
    pos: 'center',
  },
  {
    id: 'messaging',
    title: 'Kafka / Event Bus',
    desc: 'Asynchronous event streaming between services.',
    icon: <SiApachekafka className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-600',
    pos: 'right',
  },
  {
    id: 'caching',
    title: 'Redis Caching',
    desc: 'High-performance distributed memory storage.',
    icon: <SiRedis className="w-6 h-6" />,
    color: 'from-red-500 to-rose-600',
    pos: 'left',
  },
  {
    id: 'database',
    title: 'Database Layer',
    desc: 'PostgreSQL, MongoDB, and MariaDB for persistence.',
    icon: <FiDatabase className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    pos: 'bottom',
  },
]

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="text-gray-200 dark:text-gray-800"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
               />
            </svg>
          </div>
        </div>

        {/* Tech Stack Footer for Architecture */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex items-center gap-2"><SiDocker className="w-6 h-6" /> <span className="font-bold">Docker</span></div>
           <div className="flex items-center gap-2"><FaAws className="w-6 h-6" /> <span className="font-bold">AWS</span></div>
           <div className="flex items-center gap-2"><FiMonitor className="w-6 h-6" /> <span className="font-bold">Monitoring</span></div>
           <div className="flex items-center gap-2"><FiCpu className="w-6 h-6" /> <span className="font-bold">Microservices</span></div>
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
      className="z-10 w-full max-w-[280px] rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xl shadow-black/5 flex flex-col items-center text-center group"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {item.icon}
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
        {item.desc}
      </p>
    </motion.div>
  )
}
