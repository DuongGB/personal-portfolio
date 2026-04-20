import { motion } from 'framer-motion'

interface SectionHeaderProps {
  badge: string
  title: string
  titleAccent?: string
  description?: string
  centered?: boolean
}

export default function SectionHeader({
  badge,
  title,
  titleAccent,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} space-y-4`}>
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 text-sm font-semibold"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
        {badge}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight"
      >
        {title}{' '}
        {titleAccent && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            {titleAccent}
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
