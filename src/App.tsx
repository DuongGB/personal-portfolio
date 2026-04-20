import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'

// Lazy load below-fold sections
const About = lazy(() => import('@/components/About'))
const Skills = lazy(() => import('@/components/Skills'))
const Projects = lazy(() => import('@/components/Projects'))
const Experience = lazy(() => import('@/components/Experience'))
const SystemArchitecture = lazy(() => import('@/components/SystemArchitecture'))
const ServicesSection = lazy(() => import('@/components/Services'))
const Contact = lazy(() => import('@/components/Contact'))

function SectionLoader() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
    </div>
  )
}

export default function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SystemArchitecture />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
