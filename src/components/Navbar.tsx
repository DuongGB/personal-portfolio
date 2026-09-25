import { useEffect, useState } from "react";
import { Download, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { CV_URL, NAV_LINKS } from "@/utils/data";
import { cn } from "@/utils";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const sectionIds = NAV_LINKS.map((link) => link.target);
  const activeSection = useScrollSpy(sectionIds, 90);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={cn(
          "pointer-events-auto relative w-full max-w-5xl rounded-full transition-all duration-300",
          "border border-zinc-200/80 dark:border-white/10",
          "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl",
          isScrolled
            ? "shadow-[0_12px_32px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)] py-1.5 px-3"
            : "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.4)] py-2 px-3.5",
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-full p-1 transition-transform active:scale-95"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 text-xs font-mono-tech font-bold text-white shadow-sm ring-1 ring-white/20">
              DN
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                Duong<span className="text-teal-600 dark:text-teal-400 font-extrabold">.dev</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-zinc-100/70 p-1 dark:bg-zinc-800/60 border border-zinc-200/40 dark:border-white/5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.target;
              return (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-white text-teal-700 shadow-sm dark:bg-zinc-950 dark:text-teal-300 ring-1 ring-black/5 dark:ring-white/10"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40",
                  )}
                >
                  {t(`nav.${link.target}`)}
                </a>
              );
            })}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={t("nav.toggleTheme")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-100/80 text-zinc-700 transition hover:border-teal-500/40 hover:text-teal-600 active:scale-90 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:border-teal-400/40 dark:hover:text-teal-300"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* CV Button-in-Button */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-zinc-900 pl-3.5 pr-1.5 py-1.5 text-xs font-bold text-white transition hover:bg-teal-700 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-300"
            >
              <span>{t("nav.downloadCv")}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:rotate-45 dark:bg-zinc-900/15 dark:text-zinc-950">
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-100/80 text-zinc-700 transition active:scale-90 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-zinc-200/60 bg-white/95 p-3 shadow-xl backdrop-blur-2xl dark:border-zinc-800/60 dark:bg-zinc-900/95 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98]",
                    activeSection === link.target
                      ? "bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300 font-bold"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60",
                  )}
                >
                  <span>{t(`nav.${link.target}`)}</span>
                  {activeSection === link.target && (
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
                  )}
                </a>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>{t("nav.downloadCv")}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
