"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type FormData = {
  full_name: string;
  email: string;
  goal: string;
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "duplicate" }
  | { kind: "error"; message: string };

const inputClass =
  "w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

const benefits = [
  {
    title: "Personalised Guidance",
    body: "We meet you where you are and walk through your situation together.",
  },
  {
    title: "No Preparation Needed",
    body: "You do not need to prepare anything or have all the answers. Just come as you are.",
  },
  {
    title: "No Strings Attached",
    body: "The session is completely free. no obligations.",
  },
];

const outcomes = [
  "Get a clear snapshot of your current financial picture.",
  "Explore tailored options to help you reach your goals.",
  "Leave with actionable next steps to start your journey.",
];

export default function FreeConsultationPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    goal: "",
  });
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ kind: "loading" });

    try {
      const res = await fetch("/api/free-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as {
        success?: boolean;
        duplicate?: boolean;
        error?: string;
      };

      if (data.duplicate) {
        setState({ kind: "duplicate" });
      } else if (data.success) {
        setState({ kind: "success" });
        setFormData({ full_name: "", email: "", goal: "" });
      } else {
        setState({
          kind: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const isLoading = state.kind === "loading";

  return (
    <main className="bg-[#fbfaf8]">
      {/* ── Hero ── */}
      <section className="px-6 md:px-16 lg:px-24 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden rounded-[32px]"
          >
            <Image
              src="/homepage/girl-sitting.png"
              alt="Financial consultation session"
              fill
              priority
              className="object-cover"
            />

            {/* Soft warmth overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif font-thin text-4xl sm:text-5xl leading-tight text-neutral-900"
            >
              Book a free 15-minute consultation
              <br />
              with one of our advisors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mt-5 text-base text-neutral-600 max-w-lg"
            >
              Get clarity on your finances and understand your next steps. We
              will send you a private booking link after you fill the form
              below.
            </motion.p>
          </div>

          {/* Right — Image */}
        </div>
      </section>

      {/* ── Two-column: form + benefits ── */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — form card */}

          {/* Right — content */}
          <div className="space-y-10">
            {/* Benefits */}
            <Reveal delay={0.05}>
              <div>
                <h3 className="font-serif font-thin text-2xl text-neutral-900 mb-6">
                  Your future, simplified
                </h3>

                <div className="space-y-6">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#fdf0e0] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#b07d3d]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {b.title}
                        </p>
                        <p
                          className="mt-1 text-sm text-neutral-500 leading-6"
                          dangerouslySetInnerHTML={{ __html: b.body }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Outcomes */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-[#fdf8f0] border border-[#e8d9c0] px-6 py-6">
                <p className="text-sm font-medium text-neutral-900 mb-4">
                  With this call you will
                </p>

                <ul className="space-y-3">
                  {outcomes.map((o, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#b07d3d] mt-1 shrink-0" />
                      <p className="text-sm text-neutral-700">{o}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.15}>
              <p className="font-serif font-thin text-xl text-neutral-800">
                Simple. Clear. A good place to start.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-[28px] border border-black/10 bg-white px-6 sm:px-8 py-8 shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
              {/* Success state */}
              {state.kind === "success" && (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-4" />
                  <h2 className="font-serif font-thin text-2xl text-neutral-900 mb-3">
                    You’re all set
                  </h2>
                  <p className="text-sm leading-7 text-neutral-500">
                    We have sent your booking link. Choose a time that works for
                    you.
                  </p>
                  <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
                    Didn’t receive it? Check your spam folder or{" "}
                    <Link
                      href="/contact"
                      className="underline underline-offset-2 hover:text-neutral-700"
                    >
                      contact us
                    </Link>
                  </p>
                </div>
              )}

              {/* Duplicate state */}
              {state.kind === "duplicate" && (
                <div className="text-center py-4">
                  <Clock className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                  <h2 className="font-serif font-thin text-2xl text-neutral-900 mb-3">
                    You have already signed up
                  </h2>
                  <p className="text-sm leading-7 text-neutral-500">
                    We sent your booking link earlier. To keep things fair, free
                    sessions are limited to one every three months.
                  </p>

                  <div className="mt-6">
                    <Link href="/pricing">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Explore paid session
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Idle / Error */}
              {(state.kind === "idle" ||
                state.kind === "loading" ||
                state.kind === "error") && (
                <>
                  <p className="text-[11px] tracking-[0.22em] text-[#b07d3d] mb-4">
                    GET STARTED
                  </p>

                  <h2 className="font-serif font-thin text-2xl text-neutral-900 mb-2">
                    Tell us about you
                  </h2>

                  <p className="text-sm text-neutral-500 mb-6">
                    We will send you a private booking link after this.
                  </p>

                  {state.kind === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-xl mb-6 bg-red-50 border border-red-100 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{state.message}</span>
                    </div>
                  )}

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-primary mb-1.5">
                          Full Name
                        </label>
                        <input
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-primary mb-1.5">
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-primary mb-1.5">
                        What do you want help with?
                      </label>
                      <textarea
                        name="goal"
                        rows={4}
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        className={cn(inputClass, "resize-none")}
                      />
                    </div>

                    <div className="flex flex-col gap-3 items-center justify-center">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? "Sending..." : "Get booking link"}
                      </Button>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className=" flex items-center gap-6 text-sm text-neutral-500"
                      >
                        <span>*Limited slots weekly</span>
                      </motion.div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      {/* ── Bottom CTA — nudge to pricing ── */}
      <Reveal className="mx-auto max-w-3xl px-4 pb-28">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-3xl border border-black/10 bg-white px-8 py-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.06)]"
        >
          <p className="text-[11px] tracking-[0.22em] text-[#b07d3d]">
            WANT MORE?
          </p>
          <h3 className="mt-4 font-serif font-thin text-2xl text-neutral-900">
            Ready to go deeper?
          </h3>
          <p className="mt-4 text-sm leading-7 text-neutral-600 max-w-md mx-auto">
            Our full membership gives you ongoing access to expert guidance,
            structured plans, and a team that stays invested in your progress.
            Or explore our $100 focused session for a single deep-dive.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/pricing">
              <Button>Explore Membership</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline">See the $100 session</Button>
            </Link>
          </div>
        </motion.div>
      </Reveal>
    </main>
  );
}
