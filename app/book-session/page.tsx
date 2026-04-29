"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeginJourneyModal } from "@/components/homepage/beginModal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const PAYMENT_URL = "https://buy.stripe.com/test_fZu9AT3b42k9fcT2s99Ve01";

const included = [
  "1:1 financial coaching call (up to 45 minutes)",
  "Fast clarity on what to focus on right now (income, spending, debt, savings)",
  "A simple, realistic action plan you can follow",
  "Personalised recommendations aligned to your goals and lifestyle",
  "Written recap with your key decisions and next steps after the session",
];

const outcomes = [
  {
    icon: Clock,
    label: "45 minutes",
    sub: "Private, focused session",
  },
  {
    icon: Shield,
    label: "One-time fee",
    sub: "No subscription required",
  },
  {
    icon: Check,
    label: "Written recap",
    sub: "Sent after every session",
  },
];

const faqs = [
  {
    q: "Do I need to prepare anything before the session?",
    a: "No preparation is required. You can come as you are. If you have a specific question or goal in mind it helps to bring it, but our advisors are trained to draw out what matters in the conversation.",
  },
  {
    q: "What happens after I pay?",
    a: "You will receive a private booking link to choose a time that works for you. Once booked, you will receive a confirmation with everything you need to join.",
  },
  {
    q: "Is this different from the free consultation?",
    a: "The free 15-minute consultation is a brief introductory call. The $99 session is a full 45-minute private advisory engagement with a written recap, tailored recommendations, and an action plan.",
  },
  {
    q: "Can I book more than one session?",
    a: "Yes. There is no limit. Some clients use these sessions regularly before committing to a membership plan.",
  },
];

export default function BookSessionPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#fbfaf8]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(26,24,86,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(176,125,61,0.07),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-360 px-6">
        {/* ── Hero ── */}
        <section className="pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full h-80 sm:h-100 lg:h-120 overflow-hidden rounded-4xl order-last lg:order-first"
            >
              <Image
                src="/homepage/man-waving.png"
                alt="A focused 45-minute financial advisory session"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

          
            </motion.div>

            {/* Right — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-[#b07d3d]"
              >
                1:1 PRIVATE ADVISORY SESSION
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
                className="mt-4 text-neutral-900"
              >
                45 minutes to change how you think about your money
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
                className="mt-5 text-neutral-600 max-w-lg"
              >
                A single, focused session with a Celerey advisor. No
                subscriptions. No commitments. Just honest perspective and a
                clear plan.
              </motion.p>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
                className="mt-8 flex flex-wrap gap-6"
              >
                {outcomes.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#fdf0e0] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#b07d3d]" />
                    </div>
                    <div>
                      <p className="text-neutral-900">{label}</p>
                      <p className="text-neutral-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button onClick={() => setModalOpen(true)} className="gap-2">
                  Book your session
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/free-consultation">
                  <Button variant="outline">
                    Try the free 15-min call first
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── What&apos;s included ── */}
        <section className="py-16 border-t border-black/8">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <p className="text-[#b07d3d]">WHAT&apos;S INCLUDED</p>
                <h2 className="mt-4 text-neutral-900">
                  Everything you get in your session
                </h2>
                <p className="mt-4 text-neutral-600 max-w-md">
                  Each session is private, tailored, and designed to leave you
                  with more clarity than you arrived with.
                </p>
              </div>

              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fdf0e0] ring-1 ring-[#e8d9c0]">
                      <Check className="h-3.5 w-3.5 text-[#b07d3d]" />
                    </span>
                    <p className="text-neutral-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ── Pricing card + FAQ ── */}
        <section className="py-16 border-t border-black/8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Pricing card */}
            <Reveal>
              <div className="rounded-[28px] border border-black/10 bg-white px-8 py-10 shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
                {/* Subtle glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_30%_15%,rgba(176,125,61,0.08),transparent_60%)]" />

                <p className="text-[#b07d3d]">FINANCIAL COACHING SESSION</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-5xl text-neutral-900">
                    $99
                  </span>
                </div>
                <p className="mt-1 text-neutral-500">
                  One-time. No subscription.
                </p>

                <div className="mt-6 h-px bg-black/10" />

                <p className="mt-6 text-neutral-700">
                  Ideal for young professionals and first-time planners who want
                  accountability, financial discipline, and small but consistent
                  steps toward stability.
                </p>

                <ul className="mt-6 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/3 ring-1 ring-black/10">
                        <Check className="h-4 w-4 text-neutral-900" />
                      </span>
                      <p className="text-neutral-700">{item}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    onClick={() => setModalOpen(true)}
                    className="w-full gap-2"
                  >
                    Book your session
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="mt-3 text-center text-neutral-500">
                    A booking link will be sent after you complete the form.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={0.05}>
              <p className="text-[#b07d3d]">FREQUENTLY ASKED</p>
              <h2 className="mt-4 text-neutral-900">Common questions</h2>

              <dl className="mt-8 space-y-8">
                {faqs.map(({ q, a }) => (
                  <div key={q}>
                    <dt>
                      <p className="text-neutral-900">{q}</p>
                    </dt>
                    <dd className="mt-2">
                      <p className="text-neutral-600">{a}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <Reveal className="pb-28">
          <div className="rounded-3xl bg-[#354A49] px-8 py-12 text-center">
            <p className="text-[#CDE6AF]">WANT ONGOING SUPPORT?</p>
            <h3 className="mt-4 text-white">
              Ready for something more structured?
            </h3>
            <p className="mt-4 text-white/70 max-w-md mx-auto">
              Our Core membership gives you two advisory sessions per year,
              quarterly reviews, and a team that stays invested in your
              long-term progress.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/pricing">
                <Button
                  className={cn(
                    "bg-[#CDE6AF] text-gray-800 hover:bg-[#CDE6AF]/80",
                  )}
                >
                  Explore membership
                </Button>
              </Link>
              <Link href="/free-consultation">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Book a free 15-min call
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <BeginJourneyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        paymentUrl={PAYMENT_URL}
      />
    </main>
  );
}
