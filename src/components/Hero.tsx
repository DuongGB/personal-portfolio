import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import {
  ArrowDown,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Download,
  Mail,
  MapPin,
  Radio,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { Github, Linkedin } from "./icons/CustomSocials";
import avatar from "@/assets/avt.jpg";
import { CV_URL, EMAIL } from "@/utils/data";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/DuongGB", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export default function Hero() {
  const { t } = useTranslation();

  const archStack = [
    { label: "Spring Boot 3", type: t("hero.console.backendCore"), icon: Server },
    { label: "React", type: t("hero.console.modernFrontend"), icon: Code2 },
    { label: "WebSocket & Socket.IO", type: t("hero.console.realtime"), icon: Zap },
    { label: "AI Ingration", type: t("hero.console.intelligentLayer"), icon: Brain },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 tech-grid-pattern mesh-ambient-light dark:mesh-ambient-dark"
    >
      {/* Ambient Radial Accent Gradients */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[42rem] rounded-full bg-teal-500/15 blur-[120px] dark:bg-teal-500/10" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          
          {/* Left Column: Hero Narrative */}
          <div className="flex flex-col items-start text-left">
            
            {/* Status Radar Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-xs font-mono-tech font-semibold text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="radar-dot absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400"></span>
              </span>
              <span>{t("hero.status")}</span>
            </div>

            {/* Greeting & Name */}
            <div className="mt-6 space-y-2">
              <p className="font-mono-tech text-sm font-semibold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
                {t("hero.greeting")}
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-6xl dark:text-white leading-[1.08]">
                Duong <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">Nguyen</span>
              </h1>
            </div>

            {/* Role Spec Badges */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono-tech">
              <span className="rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-1 font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200 backdrop-blur-sm">
                {t("hero.roleFullstack")}
              </span>
              <span className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-3 py-1 font-semibold text-teal-700 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300">
                {t("hero.roleSpringBoot")}
              </span>
              <span className="rounded-lg border border-zinc-200/80 bg-white/80 px-3 py-1 font-semibold text-zinc-800 shadow-sm dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200 backdrop-blur-sm">
                {t("hero.roleAI")}
              </span>
            </div>

            {/* Value Proposition */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              {t("hero.subtitle")}
            </p>

            {/* CTAs with Nested Button-in-Button Architecture */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="projects" smooth duration={450}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-zinc-900 pl-5 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-zinc-950/15 transition-all hover:bg-teal-700 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-teal-300">
                  <span>{t("hero.cta")}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:translate-y-0.5 dark:bg-zinc-900/15 dark:text-zinc-900">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </button>
              </Link>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-zinc-300/80 bg-white/80 pl-5 pr-2.5 py-2 text-sm font-bold text-zinc-800 shadow-sm backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-white active:scale-95 dark:border-white/15 dark:bg-zinc-800/80 dark:text-white dark:hover:border-teal-400/50"
              >
                <span>{t("hero.download")}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-transform duration-300 group-hover:scale-110 dark:bg-zinc-700 dark:text-zinc-200">
                  <Download className="h-3.5 w-3.5" />
                </span>
              </a>

              <Link to="contact" smooth duration={450}>
                <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-teal-700 transition hover:bg-teal-500/10 active:scale-95 dark:text-teal-300">
                  <Mail className="h-4 w-4" />
                  <span>{t("hero.email")}</span>
                </button>
              </Link>
            </div>

            {/* Social Proof & Quick Links */}
            <div className="mt-10 flex items-center gap-4">
              <span className="text-xs font-mono-tech font-semibold text-zinc-500 dark:text-zinc-400">
                {t("hero.connect")}
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/80 text-zinc-600 transition-all hover:-translate-y-0.5 hover:border-teal-500/40 hover:text-teal-600 active:scale-90 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:border-teal-400/40 dark:hover:text-teal-300 shadow-sm"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Hardware Console (Double-Bezel Architecture) */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            
            {/* Outer Machine Bezel */}
            <div className="bezel-outer relative">
              
              {/* Inner Core Surface */}
              <div className="bezel-inner p-6 sm:p-7 relative overflow-hidden">
                
                {/* Console Header Bar */}
                <div className="flex items-center justify-between pb-5 border-b border-zinc-200/60 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono-tech font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                      {t("hero.console.title")}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono-tech font-bold text-emerald-700 dark:text-emerald-400">
                    <Radio className="h-3 w-3 animate-pulse" />
                    {t("hero.console.status")}
                  </span>
                </div>

                {/* Profile & Live Node Overview */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-5 items-center">
                  <div className="relative mx-auto sm:mx-0">
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-white dark:border-zinc-700 shadow-md">
                      <img
                        src={avatar}
                        alt="Duong Nguyen Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white ring-2 ring-white dark:ring-zinc-900 shadow">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono-tech font-semibold text-teal-600 dark:text-teal-400">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{t("hero.console.location")}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Duong Nguyen
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono-tech">
                      {t("hero.console.education")}
                    </p>
                    <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t("hero.console.mindset")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Architecture Layer Matrix */}
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono-tech font-semibold text-zinc-500 dark:text-zinc-400">
                    <span>{t("hero.console.nodesTitle")}</span>
                    <span>{t("hero.console.active")}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {archStack.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-xl border border-zinc-200/60 bg-zinc-50/70 p-2.5 transition-colors hover:border-teal-500/30 hover:bg-white dark:border-white/5 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/80"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                            <item.icon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                              {item.type}
                            </p>
                          </div>
                        </div>
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Badges */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/95 text-xs font-mono-tech font-bold text-zinc-800 dark:text-white">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>{t("hero.console.kafkaBadge")}</span>
            </div>



          </div>

        </div>
      </div>
    </section>
  );
}
