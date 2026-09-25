import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { EMAIL, NAV_LINKS } from "@/utils/data";
import { Github as CustomGithub, Linkedin as CustomLinkedin } from "./icons/CustomSocials";

const SOCIALS = [
  { icon: CustomGithub, href: "https://github.com/DuongGB", label: "GitHub" },
  {
    icon: CustomLinkedin,
    href: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-950 text-white dark:border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-10 border-b border-zinc-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-xs font-mono-tech font-bold text-zinc-950">
                DN
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Duong<span className="text-teal-400">.dev</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {t("footer.roleDesc")}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-5 flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.target}
                to={link.target}
                smooth
                duration={450}
                className="cursor-pointer text-xs font-mono-tech font-semibold text-zinc-400 hover:text-teal-300 transition-colors"
              >
                {t(`nav.${link.target}`)}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="md:col-span-3 flex items-center md:justify-end gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-teal-500/40 hover:text-teal-300 active:scale-90"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono-tech text-zinc-500">
          <div>
            {t("footer.copyright", { year: currentYear })}
          </div>

          <Link to="home" smooth duration={500}>
            <button
              aria-label={t("footer.backToTop")}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs text-zinc-400 transition hover:border-teal-500/40 hover:text-teal-300 active:scale-95"
            >
              <span>{t("footer.backToTop")}</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </footer>
  );
}
