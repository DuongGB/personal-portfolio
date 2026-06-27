import { useEffect, useState } from "react";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
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
  const activeSection = useScrollSpy(sectionIds, 80);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-colors",
        isScrolled
          ? "border-zinc-200 bg-[#f7f8f6]/92 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/88"
          : "border-transparent bg-[#f7f8f6]/70 backdrop-blur-sm dark:bg-zinc-950/70",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-black text-white dark:bg-white dark:text-zinc-950">
              DN
            </span>
            <span className="hidden text-base font-black tracking-tight text-zinc-950 sm:block dark:text-white">
              Duong<span className="text-teal-700 dark:text-teal-300">Nguyen</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-bold transition hover:bg-zinc-200/70 active:translate-y-px dark:hover:bg-zinc-800",
                  activeSection === link.target
                    ? "bg-white text-teal-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-teal-300 dark:ring-zinc-800"
                    : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                {t(`nav.${link.target}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-700 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-teal-300/40 dark:hover:text-teal-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 sm:flex dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Download className="h-4 w-4" />
              {t("hero.download")}
            </a>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-zinc-200 py-3 dark:border-zinc-800 md:hidden">
            <div className="grid gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-bold transition active:translate-y-px",
                    activeSection === link.target
                      ? "bg-white text-teal-700 dark:bg-zinc-900 dark:text-teal-300"
                      : "text-zinc-600 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800",
                  )}
                >
                  {t(`nav.${link.target}`)}
                </a>
              ))}
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-zinc-950"
              >
                <Download className="h-4 w-4" />
                {t("hero.download")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
