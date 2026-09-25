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
const AiChat = lazy(() => import("@/components/AiChat"));

function SectionLoader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="bezel-outer animate-pulse">
        <div className="bezel-inner h-64 p-8 flex flex-col justify-center gap-4">
          <div className="h-4 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-72 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full max-w-lg rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] text-zinc-900 dark:bg-[#09090b] dark:text-zinc-50 font-sans selection:bg-teal-500 selection:text-white">
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

      {/* AI Portfolio Assistant — floating widget */}
      <Suspense fallback={null}>
        <AiChat />
      </Suspense>
    </div>
  );
}
