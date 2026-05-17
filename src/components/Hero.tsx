import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Mail, ArrowDown, Download } from 'lucide-react'
import { Github, Linkedin } from './icons/CustomSocials'
import avatar from '@/assets/avt.jpg'
import { CV_URL, EMAIL } from '@/utils/data'

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/DuongGB', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/', label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
]

const TITLES = ['Software Engineer', 'Fullstack Developer', 'Backend Specialist', 'AI Enthusiast']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
} as const

// ── Sub-components ────────────────────────────────────────────────

function TypingText() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = TITLES[index]
      
      if (isDeleting) {
        setText(currentFullText.substring(0, text.length - 1))
        setSpeed(50)
      } else {
        setText(currentFullText.substring(0, text.length + 1))
        setSpeed(150)
      }

      if (!isDeleting && text === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % TITLES.length)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, index, speed])

  return (
    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 border-r-2 border-violet-500 animate-pulse ml-2">
      {text}
    </span>
  )
}

function ProfileAvatar() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[260px] h-[260px] sm:w-[316px] sm:h-[316px] rounded-full border-2 border-dashed border-violet-300/40 dark:border-violet-600/30"
      />
      {/* Inner glow */}
      <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-400/20 blur-xl" />

      {/* Avatar circle */}
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl shadow-violet-500/20 flex items-center justify-center bg-gradient-to-br from-violet-400 via-indigo-500 to-purple-600 backdrop-blur-md">
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>

      {/* Floating badge – top right */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -right-4 liquid-glass rounded-xl px-3 py-1.5 shadow-lg border flex items-center gap-2"
      >
        <span className="text-xl">🎓</span>
        <div>
          <p className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">Graduate</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Software Engineer</p>
        </div>
      </motion.div>

      {/* Floating badge – bottom left */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-2 -left-4 liquid-glass rounded-xl px-3 py-1.5 shadow-lg border flex items-center gap-2"
      >
        <span className="text-xl">🚀</span>
        <div>
          <p className="text-xs font-bold text-gray-900 dark:text-white">Active</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Learning</p>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30" />

      {/* Animated morphing blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-400/25 dark:bg-violet-600/15 rounded-full blur-3xl animate-morph-blob" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-400/25 dark:bg-indigo-600/15 rounded-full blur-3xl animate-morph-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-2xl animate-morph-blob animation-delay-4000" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[calc(100vh-4rem)] py-16">
          {/* ── Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100/60 dark:bg-gray-800/60 px-3 py-1 rounded-full liquid-glass border border-white/20 dark:border-white/10">
                Fresher Engineer
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-medium text-violet-600 dark:text-violet-400 mb-2"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-none tracking-tight"
            >
              Duong{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                Nguyen
              </span>
            </motion.h1>

            {/* Animated title with typing effect */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1 justify-center lg:justify-start mb-6"
            >
              <span className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                I'm a
              </span>
              <TypingText />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              I build scalable web applications using{' '}
              <span className="text-violet-600 dark:text-violet-400 font-medium">React</span>,{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Spring Boot</span>,{' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">Microservices</span>, and{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">AI technologies</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-10"
            >
              <Link to="projects" smooth duration={600}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200 cursor-pointer"
                >
                  View Projects
                </motion.button>
              </Link>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-white/10 text-gray-800 dark:text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer liquid-glass-light"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
              <Link to="contact" smooth duration={600}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl border-2 border-violet-500/40 text-violet-600 dark:text-violet-400 font-semibold hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200 cursor-pointer"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-sm text-gray-500 dark:text-gray-500">Find me on</span>
              <div className="w-8 h-px bg-gray-300 dark:bg-gray-700" />
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(social => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-600 shadow-sm hover:shadow-md transition-all duration-200 liquid-glass-light"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Profile Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <ProfileAvatar />
          </motion.div>
        </div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link to="about" smooth duration={600}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1 cursor-pointer text-gray-400 hover:text-violet-500 transition-colors"
          >
            <span className="text-xs font-medium">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

