import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="h-10 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-black text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-700 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-teal-300/40 dark:hover:text-teal-300"
      aria-label="Toggle language"
    >
      {i18n.language === "en" ? "VI" : "EN"}
    </button>
  );
}
