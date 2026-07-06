import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import {
  ArrowDown,
  Bot,
  BriefcaseBusiness,
  Cpu,
  Download,
  Mail,
  MapPin,
  ServerCog,
  Sparkles,
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

const CAPABILITIES = [
  "Spring Boot microservices",
  "React production interfaces",
  "Realtime WebSocket flows",
  "AI-assisted product features",
];


export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] overflow-hidden border-b border-zinc-200/80 bg-[#f7f8f6] pt-20 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      <div className="absolute right-0 top-16 hidden h-[560px] w-[46vw] border-l border-zinc-200 bg-[linear-gradient(135deg,rgba(15,118,110,0.11),rgba(255,255,255,0)_58%)] dark:border-zinc-800 dark:bg-[linear-gradient(135deg,rgba(45,212,191,0.11),rgba(9,9,11,0)_58%)] lg:block" />
      <div className="ai-grid-floor absolute bottom-0 right-0 hidden h-[48%] w-[62%] opacity-80 lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.96fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal-700/15 bg-white/85 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] ring-1 ring-white/70 backdrop-blur dark:border-teal-400/20 dark:bg-zinc-900/80 dark:text-zinc-300 dark:ring-white/10">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-700/10 text-teal-800 dark:bg-teal-300/10 dark:text-teal-300">
              <Bot className="h-3.5 w-3.5" />
            </span>
            Open for Fresher / Junior Software Engineer roles
          </div>

          <p className="mb-3 text-base font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            {t("hero.greeting")}
          </p>

          <h1 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">
            {t("hero.name")}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-zinc-700 dark:bg-zinc-900">
              Fullstack Developer
            </span>
            <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-zinc-700 dark:bg-zinc-900">
              Backend Specialist
            </span>
            <span className="rounded-full border border-teal-700/25 bg-teal-700/10 px-4 py-2 text-teal-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300">
              AI Integration
            </span>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            I build production web systems with React, Spring Boot, realtime
            messaging, cloud deployment, and pragmatic AI features. The focus is
            reliable user flows, clean architecture, and code that a team can
            operate after launch.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="projects" smooth duration={450}>
              <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-[0_22px_45px_-24px_rgba(24,24,27,0.75)] transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                {t("hero.cta")}
                <ArrowDown className="h-4 w-4" />
              </button>
            </Link>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-bold text-zinc-900 transition hover:-translate-y-0.5 hover:border-teal-700/40 active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-teal-300/40"
            >
              <Download className="h-4 w-4" />
              {t("hero.download")}
            </a>
            <Link to="contact" smooth duration={450}>
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-700/10 active:translate-y-px dark:text-teal-300">
                <Mail className="h-4 w-4" />
                {t("hero.email")}
              </button>
            </Link>
          </div>
          <p className="mt-3 text-sm font-semibold text-zinc-500 dark:text-zinc-500">
            {t("hero.ctaHint")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-500">
              Find me on
            </span>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-teal-700/40 hover:text-teal-700 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-teal-300/40 dark:hover:text-teal-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:mr-0">
          <div className="hero-perspective">
            <div className="hero-console rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_42px_90px_-58px_rgba(15,23,42,0.8)] ring-1 ring-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/66 dark:ring-white/10">
              <div className="grid grid-cols-[0.92fr_1.08fr] gap-4">
                <div className="flex min-h-[286px] flex-col justify-between rounded-[1.45rem] border border-zinc-200 bg-[#fbfcfa] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-700/10 text-teal-800 dark:bg-teal-300/10 dark:text-teal-300">
                      <Cpu className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-black text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      AI-OPS
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-950 dark:text-white">
                      Software Engineer
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      Product-minded fullstack work with reliable backend
                      systems and practical AI integrations.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                   
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.55rem] border border-zinc-200 bg-zinc-100 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.7)] dark:border-zinc-800 dark:bg-zinc-900">
                  <img
                    src={avatar}
                    alt="Duong Nguyen"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-zinc-950/62 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-200">
                    </div>
                    <p className="mt-1 text-sm font-bold text-center">
                      Software Engineering
                    </p>
                  </div>
                </div>

                <div className="col-span-2 rounded-[1.45rem] border border-zinc-200 bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      <MapPin className="h-4 w-4 text-teal-700 dark:text-teal-300" />
                      Ho Chi Minh City
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-teal-700/20 bg-teal-700/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Applied AI
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CAPABILITIES.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-zinc-200 bg-[#f7f8f6] px-3 py-2 text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-12 hidden rounded-2xl border border-zinc-200 bg-white/88 p-3 shadow-[0_24px_55px_-38px_rgba(15,23,42,0.75)] dark:border-zinc-800 dark:bg-zinc-900/88 sm:block">
              <ServerCog className="h-5 w-5 text-teal-700 dark:text-teal-300" />
            </div>
            <div className="absolute -left-3 bottom-16 hidden rounded-2xl border border-zinc-200 bg-white/88 p-3 shadow-[0_24px_55px_-38px_rgba(15,23,42,0.75)] dark:border-zinc-800 dark:bg-zinc-900/88 sm:block">
              <BriefcaseBusiness className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
