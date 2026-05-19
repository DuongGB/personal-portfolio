import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code2, Award, Target, Brain, Handshake, Sparkles, Zap, GraduationCap, Building2, Settings, Puzzle } from "lucide-react";
import SectionHeader from "./SectionHeader";

const STATS = [
  {
    icon: Briefcase,
    value: "1+",
    label: "Years Experience",
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Code2,
    value: "5+",
    label: "Projects Delivered",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Award,
    value: "10+",
    label: "Happy Clients",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Target,
    value: "99%",
    label: "Client Satisfaction",
    color: "text-emerald-600 dark:text-emerald-400",
  },
];

const STRENGTHS = [
  {
    title: "Problem Solver",
    icon: Brain,
    desc: "Turn complex challenges into elegant solutions",
  },
  {
    title: "Team Player",
    icon: Handshake,
    desc: "Collaborate and lift team performance",
  },
  {
    title: "Clean Code",
    icon: Sparkles,
    desc: "Readable, maintainable, and scalable code",
  },
  {
    title: "Fast Learner",
    icon: Zap,
    desc: "Adapt quickly to new technologies",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm relative"
    >
      {/* Dynamic light blob in background */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-violet-400/5 dark:bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="About Me"
          title="Building the Future,"
          titleAccent="One Commit at a Time"
          description="Passionate fullstack engineer with a focus on scalable architecture and delightful user experiences."
        />

        <div ref={ref} className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Hi! I'm{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Duong Nguyen
                </span>
                , a recent{" "}
                <span className="text-violet-600 dark:text-violet-400 font-semibold">
                  Software Engineering graduate
                </span>{" "}
                with hands-on experience building scalable web applications.
              </p>
              <p>
                I specialize in building production-ready systems using{" "}
                <span className="text-violet-600 dark:text-violet-400 font-semibold">
                  ReactJS
                </span>
                ,{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  Spring Boot
                </span>
                , and{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Microservices
                </span>
                . I have a strong foundation in real-time systems, e-commerce
                platforms, and distributed architectures.
              </p>
              <p>
                Passionate about leveraging{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  AI integrations
                </span>{" "}
                and modern DevOps practices to deliver high-quality software
                that solves real-world problems.
              </p>
            </div>

            {/* Education */}
            <div className="rounded-2xl p-5 liquid-glass-light border border-white/20 dark:border-white/5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Education
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                    Bachelor of Software Engineering
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Ho Chi Minh City University of Industry · 2021 – 2025
                  </p>
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1">
                    GPA: 3.22 / 4.0
                  </p>
                </div>
              </div>
            </div>

            {/* Career Goal */}
            <div className="rounded-2xl p-5 liquid-glass border border-violet-200/50 dark:border-violet-800/40 shadow-lg shadow-violet-500/5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" /> Career Goal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seeking a Fresher / Junior Software Engineer position to
                contribute to impactful software systems and bring value through
                modern technical solutions.
              </p>
            </div>
          </motion.div>

          {/* Right: Stats + Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="rounded-2xl p-5 liquid-glass liquid-glass-hover group shadow-md shadow-black/5"
                >
                  <stat.icon
                    className={`w-6 h-6 ${stat.color} mb-3 group-hover:scale-110 transition-transform`}
                  />
                  <p className={`text-3xl font-black ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Personal Strengths */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Personal Strengths
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: "Microservices",
                    icon: Building2,
                    desc: "Designing independent scalable services",
                  },
                  {
                    title: "Backend Dev",
                    icon: Settings,
                    desc: "Secure & efficient Spring Boot APIs",
                  },
                  {
                    title: "Real-time Systems",
                    icon: Zap,
                    desc: "Sockets, Kafka & Event-driven",
                  },
                  {
                    title: "Problem Solving",
                    icon: Puzzle,
                    desc: "Analytical approach to complexity",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="rounded-xl p-4 liquid-glass liquid-glass-hover shadow-sm hover:shadow-md"
                  >
                    <s.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    <p className="font-semibold text-sm text-gray-900 dark:text-white mt-2">
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
