import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Github, Linkedin } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { EMAIL } from "@/utils/data";
import type { ContactForm } from "@/types";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Location", value: "Go Vap, Ho Chi Minh City", href: "#" },
  { icon: Phone, label: "Phone", value: "0356 309 561", href: "tel:+0356309561" },
];

const SOCIAL = [
  { icon: Github, href: "https://github.com/DuongGB", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/d%C6%B0%C6%A1ng-nguy%E1%BB%85n-7528a736a/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const schema = z.object({
    name: z.string().min(2, t("errors.nameRequired")).max(64, t("errors.nameTooLong")),
    email: z.string().email(t("errors.emailInvalid")),
    message: z.string().min(10, t("errors.messageShort")).max(1000, t("errors.messageLong")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-white py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Contact"
          title="Let's Work"
          titleAccent="Together"
          description="Have a project in mind or a role that matches my background? Send the details and I will respond with a concrete next step."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-[#f7f8f6] p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-black text-zinc-950 dark:text-white">Get in touch</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Available for junior engineering roles, freelance delivery, and backend-heavy fullstack work.
              </p>
            </div>

            <div className="grid gap-3">
              {CONTACT_INFO.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-teal-700/30 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-teal-300/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700/10 text-teal-700 dark:bg-teal-300/10 dark:text-teal-300">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{info.label}</p>
                    <p className="text-sm font-black text-zinc-950 dark:text-white">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-2">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-teal-700/30 hover:text-teal-700 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-teal-300/30 dark:hover:text-teal-300"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </aside>

          <div className="rounded-2xl border border-zinc-200 bg-[#f7f8f6] p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            {submitted ? (
              <div className="rounded-2xl border border-teal-700/20 bg-teal-700/10 p-8 text-center dark:border-teal-300/20 dark:bg-teal-300/10">
                <CheckCircle2 className="mx-auto mb-4 h-11 w-11 text-teal-700 dark:text-teal-300" />
                <h3 className="text-xl font-black text-zinc-950 dark:text-white">Message sent</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Thanks for reaching out. I will reply as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
                <FieldError htmlFor="contact-name" label="Full Name" error={errors.name?.message}>
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Nguyen Van An"
                    {...register("name")}
                    className={inputClass(Boolean(errors.name), "pl-10")}
                  />
                </FieldError>

                <FieldError htmlFor="contact-email" label="Email Address" error={errors.email?.message}>
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="an.nguyen@example.com"
                    {...register("email")}
                    className={inputClass(Boolean(errors.email), "pl-10")}
                  />
                </FieldError>

                <FieldError htmlFor="contact-message" label="Message" error={errors.message?.message}>
                  <MessageSquare className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me what you are building or hiring for..."
                    {...register("message")}
                    className={inputClass(Boolean(errors.message), "pl-10 resize-none")}
                  />
                </FieldError>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({
  htmlFor,
  label,
  error,
  children,
}: {
  htmlFor: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-black text-zinc-800 dark:text-zinc-200">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean, extra = "") {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-700/30 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 ${
    hasError
      ? "border-red-500"
      : "border-zinc-200 focus:border-teal-700/40 dark:border-zinc-800 dark:focus:border-teal-300/40"
  } ${extra}`;
}
