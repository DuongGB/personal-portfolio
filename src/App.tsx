import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const ServicesSection = lazy(() => import("@/components/Services"));
const Contact = lazy(() => import("@/components/Contact"));

function SectionLoader() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:px-8">
      <div className="h-48 rounded-2xl border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900" />
      <div className="h-48 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70" />
    </div>
  );
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-[100dvh] bg-[#f7f8f6] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
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
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
