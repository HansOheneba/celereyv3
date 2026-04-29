"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, InteractiveImage } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type FormData = {
  full_name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = {
  type: "success" | "error" | null;
  message: string;
};

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M20.52 3.48A11.89 11.89 0 0012.07 0 11.93 11.93 0 000 11.93a11.8 11.8 0 001.57 5.92L0 24l6.28-1.63a11.9 11.9 0 005.79 1.48h.01c6.61 0 11.93-5.32 11.93-11.93 0-3.18-1.24-6.16-3.49-8.42zm-8.45 18.09a9.9 9.9 0 01-5.06-1.39l-.36-.21-3.73.97.99-3.64-.24-.37a9.93 9.93 0 01-1.52-5.29 10.01 10.01 0 0110.02-10.02c2.68 0 5.2 1.05 7.1 2.95a10.03 10.03 0 012.93 7.1 10.02 10.02 0 01-10.13 10.9zm5.54-7.48c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.38s-1.05 1.02-1.05 2.48 1.08 2.87 1.23 3.07c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.63.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
  </svg>
);

const inputClass =
  "w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Your message has been sent. We&apos;ll be in touch within one business day.",
        });
        setFormData({ full_name: "", email: "", subject: "", message: "" });
      } else {
        const data = (await response.json()) as { error?: string };
        setSubmitStatus({
          type: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      {/* ── Hero / form section ── */}
      <section className=" sm:py-20">
        <div className="mx-auto max-w-360 px-6">
          {/* Page intro */}
          <Reveal className="mb-16 text-center">

            <h1 className="text-primary">Let&apos;s start a conversation</h1>
            <p className="mt-5 text-gray-500 max-w-lg mx-auto">
              Whether you&apos;re exploring Celerey for the first time or ready
              to take the next step, our team is here to help.
            </p>
          </Reveal>

          {/* Two-column grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {/* Left — image panel */}
            <InteractiveImage className="relative overflow-hidden rounded-3xl min-h-100 md:min-h-0">
              <Image
                src="https://images.unsplash.com/photo-1662104935883-e9dd0619eaba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Celerey Advisory Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Warm gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-amber-900/10 via-transparent to-primary/85" />

              {/* Text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h4 className="">
                  &ldquo;The right conversation
                  <br />
                  changes everything.&rdquo;
                </h4>
                <p className="mt-3 text-white/80">
                  Our advisors bring clarity, not complexity.
                </p>

                <div className="mt-6">
                  <Link
                    href="https://wa.me/12272296921"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-white/25 transition-all"
                  >
                    <WhatsAppIcon />
                    Chat with us on WhatsApp
                  </Link>
                </div>
              </div>
            </InteractiveImage>

            {/* Right — form card */}
            <Reveal className="bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-sm">
              <h2 className="text-primary mb-2">Send us a message</h2>
              <p className="text-gray-500 mb-8">
                Fill in the form and we&apos;ll respond as soon as possible
                typically within one business day.
              </p>

              {/* Status banner */}
              {submitStatus.type && (
                <div
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-2xl mb-6 text-sm",
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-100"
                      : "bg-red-50 text-red-800 border border-red-100",
                  )}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  )}
                  <span>
                    {submitStatus.type === "success"
                      ? "Your message has been sent. We will get in touch shortly"
                      : submitStatus.message}
                  </span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-sm font-medium text-primary mb-1.5"
                    >
                      Full Name{" "}
                      <span className="text-[#D4AF37]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Your name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary mb-1.5"
                    >
                      Email{" "}
                      <span className="text-[#D4AF37]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-primary mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="e.g. Wealth Planning Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary mb-1.5"
                  >
                    Message{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your goals or question&hellip;"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? "Sending\u2026" : "Send Message"}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <Reveal className="mx-auto max-w-3xl text-center px-6 pb-28">
        <p className="text-[#D4AF37] mb-4">Together</p>
        <h2 className="text-primary mb-4">
          Let&apos;s build your financial future
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Celerey is a partnership. Reach out today to connect with our wealth
          advisors and start building a plan that&apos;s as unique as your
          goals.
        </p>
      </Reveal>
    </main>
  );
}
