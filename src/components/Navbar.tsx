import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { NAV_LINKS, CV_URL } from '@/utils/data'
import { cn } from '@/utils'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = NAV_LINKS.map(l => l.target)
  const activeSection = useScrollSpy(sectionIds, 80)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                DN
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
                Duong<span className="text-violet-500">Nguyen</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.target}
                href={'#' + link.target}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200',
                  activeSection === link.target
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun className="w-4 h-4 text-violet-400" /> : <Moon className="w-4 h-4 text-violet-600" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Resume Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.target}
                  href={'#' + link.target}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all',
                    activeSection === link.target
                      ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium mt-2"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
