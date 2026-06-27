import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { EMAIL, NAV_LINKS } from "@/utils/data";
import { Github, Linkedin } from "./icons/CustomSocials";

const SOCIALS = [
  { icon: Github, href: "https://github.com/DuongGB", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-zinc-950">
                DN
              </span>
              <span className="text-lg font-black tracking-tight">
                Duong<span className="text-teal-300">Nguyen</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-400">{t("footer.role")}</p>
          </div>

          <nav className="flex flex-wrap justify-start gap-x-5 gap-y-2 md:justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.target}
                to={link.target}
                smooth
                duration={450}
                className="cursor-pointer text-sm font-bold text-zinc-400 transition hover:text-teal-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2 md:justify-end">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:-translate-y-0.5 hover:border-teal-300/30 hover:text-teal-300 active:translate-y-0"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-zinc-500">
            © {currentYear} Duong Nguyen. {t("footer.madeWith")} in HCMC
          </p>
          <Link to="home" smooth duration={450}>
            <button
              aria-label="Back to top"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-400 transition hover:border-teal-300/30 hover:text-teal-300 active:scale-[0.98]"
            >
              Back to top
              <ArrowUp className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
