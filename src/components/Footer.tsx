import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { NAV_LINKS, EMAIL } from '@/utils/data'

const SOCIALS = [
  { icon: FiGithub, href: 'https://github.com/DuongGB', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/', label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${EMAIL}`, label: 'Email' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 dark:bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                DN
              </div>
              <span className="font-bold text-white">
                Duong<span className="text-violet-400">Nguyen</span>
              </span>
            </div>
            <p className="text-xs text-gray-500">Software Engineer / Fullstack Developer</p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {NAV_LINKS.map(link => (
              <Link
                key={link.target}
                to={link.target}
                smooth
                duration={600}
                className="text-xs text-gray-500 hover:text-violet-400 cursor-pointer transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-violet-600/20 border border-gray-700 hover:border-violet-600/50 flex items-center justify-center text-gray-400 hover:text-violet-400 transition-all"
              >
                <s.icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            © {currentYear} Duong Nguyen. Made with{' '}
            <FiHeart className="w-3 h-3 text-red-500 fill-current" /> in HCMC
          </p>

          {/* Back to top */}
          <Link to="home" smooth duration={800}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-400 transition-colors group"
            >
              Back to top
              <span className="w-6 h-6 rounded-md bg-gray-800 group-hover:bg-violet-600/20 border border-gray-700 group-hover:border-violet-600/50 flex items-center justify-center transition-all">
                <FiArrowUp className="w-3 h-3" />
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
