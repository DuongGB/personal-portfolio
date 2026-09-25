import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("vi") ? "vi" : "en";

  const setLanguage = (lang: "en" | "vi") => {
    if (currentLang !== lang) {
      void i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex h-8 items-center rounded-full border border-zinc-200/80 bg-zinc-100/80 p-0.5 text-xs font-mono-tech font-bold dark:border-white/10 dark:bg-zinc-800/80"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={currentLang === "en"}
        className={`flex h-7 items-center justify-center rounded-full px-2.5 transition-all duration-200 ${
          currentLang === "en"
            ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-950"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={currentLang === "vi"}
        className={`flex h-7 items-center justify-center rounded-full px-2.5 transition-all duration-200 ${
          currentLang === "vi"
            ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-950"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        }`}
      >
        VI
      </button>
    </div>
  );
}
