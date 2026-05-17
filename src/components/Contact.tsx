import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Github, Linkedin } from "./icons/CustomSocials";
import SectionHeader from "./SectionHeader";
import { EMAIL } from "@/utils/data";
import type { ContactForm } from "@/types";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long"),
});

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: MapPin,
    label: "Location",
    value: "Go Vap, Ho Chi Minh City",
    href: "#",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0356 309 561",
    href: "tel:+0356309561",
  },
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white/30 dark:bg-slate-950/15 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative neon spot */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Contact"
          title="Let's Work"
          titleAccent="Together"
          description="Have a project in mind? I'd love to hear about it. Let's build something great."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                I'm currently available for freelance projects, full-time roles,
                and consulting engagements. Don't hesitate to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/20 dark:border-white/5 liquid-glass liquid-glass-hover hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-50 dark:bg-white/5 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                Connect with me
              </p>
              <div className="flex gap-3">
                {SOCIAL.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-600 transition-colors shadow-sm"
                  >
                    <s.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl p-8 liquid-glass shadow-lg border border-white/20 dark:border-white/5 relative overflow-hidden">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center mx-auto mb-4 border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Thanks for reaching out! I'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Smith"
                        {...register("name")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all backdrop-blur-sm shadow-inner ${
                          errors.name
                            ? "border-red-400 dark:border-red-600"
                            : "focus:bg-white/40 dark:focus:bg-white/10"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all backdrop-blur-sm shadow-inner ${
                          errors.email
                            ? "border-red-400 dark:border-red-600"
                            : "focus:bg-white/40 dark:focus:bg-white/10"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        {...register("message")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all backdrop-blur-sm shadow-inner resize-none ${
                          errors.message
                            ? "border-red-400 dark:border-red-600"
                            : "focus:bg-white/40 dark:focus:bg-white/10"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
