import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, Copy, Download, Mail, MapPin, MessageSquare, Phone, Send, Sparkles, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Github, Linkedin } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { CV_URL, EMAIL } from "@/utils/data";
import type { ContactForm } from "@/types";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  
  const recruiterMailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Software Engineer Opportunity - Duong Nguyen",
  )}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.nameRequired")).max(64, t("errors.nameTooLong")),
        email: z.string().email(t("errors.emailInvalid")),
        message: z.string().min(10, t("errors.messageShort")).max(1000, t("errors.messageLong")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Contact form payload:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const contactInfo = [
    { icon: Mail, label: t("contact.directEmail"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t("contact.location"), value: t("contact.locationVal"), href: "#" },
    { icon: Phone, label: t("contact.phone"), value: "0356 309 561", href: "tel:+0356309561" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/DuongGB", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/",
      label: "LinkedIn",
    },
    { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-white dark:bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge={t("contact.badge")}
          title={t("contact.title")}
          titleAccent={t("contact.titleAccent")}
          description={t("contact.description")}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Outreach & Quick Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card */}
            <div className="bezel-outer">
              <div className="bezel-inner p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-teal-600 dark:text-teal-400 uppercase">
                    <Sparkles className="h-4 w-4" />
                    <span>{t("contact.fastTrack")}</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-emerald-600 dark:text-emerald-400 font-bold">
                    {t("contact.availableNow")}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {t("contact.readyForInterview")}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t("contact.interviewSub")}
                  </p>
                </div>

                {/* Email Copy Trigger */}
                <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-white/10 dark:bg-zinc-800/60">
                  <div className="flex items-center gap-2 overflow-hidden px-1">
                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="truncate text-xs font-mono-tech font-semibold text-zinc-800 dark:text-zinc-200">
                      {EMAIL}
                    </span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex h-8 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-bold text-zinc-700 shadow-sm transition hover:bg-teal-50 hover:text-teal-700 active:scale-95 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">{t("contact.copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t("contact.copy")}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={recruiterMailto}
                    className="flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-2.5 text-xs font-bold text-white shadow transition hover:bg-teal-700 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-300"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{t("contact.sendEmail")}</span>
                  </a>
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white py-2.5 text-xs font-bold text-zinc-800 transition hover:border-teal-500/50 hover:bg-zinc-50 active:scale-95 dark:border-white/15 dark:bg-zinc-800 dark:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{t("contact.downloadCv")}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Channels & Meta info */}
            <div className="bezel-outer">
              <div className="bezel-inner p-5 space-y-3">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-3.5 rounded-xl p-2 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                      <info.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono-tech text-zinc-500 uppercase">{info.label}</p>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Link Hub */}
            <div className="flex items-center gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-zinc-200/80 bg-white p-3 text-xs font-bold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500/40 hover:text-teal-600 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-teal-400/40"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bezel-outer">
              <div className="bezel-inner p-7 sm:p-9">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {t("contact.success")}
                    </h3>
                    <p className="max-w-md mx-auto text-sm text-zinc-600 dark:text-zinc-300">
                      {t("contact.successMsg")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                        {t("contact.sendMessage")}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {t("contact.fillDetails")}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-xs font-mono-tech font-bold text-zinc-700 dark:text-zinc-300">
                          {t("contact.yourName")}
                        </label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <input
                            id="contact-name"
                            type="text"
                            placeholder={t("contact.placeholderName")}
                            {...register("name")}
                            className={`w-full rounded-xl border bg-zinc-50/70 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-600 ${
                              errors.name ? "border-red-500" : "border-zinc-200 dark:border-white/10 focus:border-teal-500"
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[11px] text-red-500 font-medium">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-mono-tech font-bold text-zinc-700 dark:text-zinc-300">
                          {t("contact.yourEmail")}
                        </label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <input
                            id="contact-email"
                            type="email"
                            placeholder={t("contact.placeholderEmail")}
                            {...register("email")}
                            className={`w-full rounded-xl border bg-zinc-50/70 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-600 ${
                              errors.email ? "border-red-500" : "border-zinc-200 dark:border-white/10 focus:border-teal-500"
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[11px] text-red-500 font-medium">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-mono-tech font-bold text-zinc-700 dark:text-zinc-300">
                        {t("contact.messageDetails")}
                      </label>
                      <div className="relative">
                        <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder={t("contact.placeholderMessage")}
                          {...register("message")}
                          className={`w-full rounded-xl border bg-zinc-50/70 pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-600 ${
                            errors.message ? "border-red-500" : "border-zinc-200 dark:border-white/10 focus:border-teal-500"
                          }`}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-[11px] text-red-500 font-medium">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-zinc-900 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:bg-teal-700 active:scale-[0.99] disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-300"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>{isSubmitting ? t("contact.sending") : t("contact.send")}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
