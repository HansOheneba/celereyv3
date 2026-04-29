"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tools = [
  {
    number: "01",
    name: "Budget Planner",
    tagline: "See exactly where your money goes.",
    body: "Most budgets fail because they are built on guesswork. The Budget Planner gives you a structured, honest breakdown of your income and spending so you can make every decision with real numbers, not estimates.",
    href: "/tools/budget-planner",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    alt: "Person reviewing financial documents at a desk",
  },
  {
    number: "02",
    name: "Savings Calculator",
    tagline: "Model the future you are building towards.",
    body: "Clarity about the future changes how you act today. Enter your goals, timeline, and contribution rate to see precisely how your savings compound over time. Then adjust until the picture looks right.",
    href: "/tools/savings-calculator",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop",
    alt: "Growth charts illustrating compound savings over time",
  },
  {
    number: "03",
    name: "Money Manager",
    tagline: "Your full financial picture in one place.",
    body: "Stop managing money in fragments. The Money Manager brings your income, expenses, and net worth into a single, coherent view so you always know where you stand and what your next move should be.",
    href: "/tools/money-manager",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&q=80&auto=format&fit=crop",
    alt: "Professional reviewing an organised financial overview",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <main className="bg-[#FAFAF8] text-[#1A1A1A] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="pt-14 max-w-360 px-6 mx-auto sm:pt-20">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[11px] tracking-[0.22em] text-[#5C7A6A]"
          >
            CELEREY TOOLS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mx-auto mt-5 max-w-3xl text-neutral-900"
          >
            Instruments built for your financial clarity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600"
          >
            Not generic calculators. Tools designed around the moments that
            matter most in your financial life, built to help you understand,
            plan, and act with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-7 h-px w-24 bg-neutral-900/10 origin-center"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
            className="mx-auto mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video w-full sm:aspect-21/9">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1999&q=80&auto=format&fit=crop"
                  alt="Financial analytics and data on screen"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.28 }}
            className="mt-8"
          >
            {/* <Button asChild>
              <a href="#tools">Explore the Tools</a>
            </Button> */}
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL STATEMENT ── */}
      <section className="py-10 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-6">
                Why These Tools Exist
              </p>
              <h2 className="">
                Most financial tools
                <br />
                <span className="italic">overwhelm. Ours clarify.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-16">
              <p className="text-xl text-[#4A4A4A] leading-relaxed mb-6">
                We built these tools because the gap between knowing you should
                plan and actually having a plan is almost always a tool problem.
                Too complex, too generic, or too disconnected from real life.
              </p>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                Each tool in the Celerey suite was designed around a specific
                moment of financial decision-making: the moment you need clarity
                most. Simple enough to use in minutes. Precise enough to act on.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── TOOLS (alternating layout) ── */}
      <section
        id="tools"
        className="py-10 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
      >
        <FadeIn>
          <div className="flex items-center gap-4 mb-20">
            <div className="w-8 h-px bg-[#5C7A6A]" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A]">
              The Suite
            </p>
          </div>
        </FadeIn>

        <div className="space-y-36">
          {tools.map((t, i) => (
            <FadeIn key={i} delay={0.1}>
              <div
                className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-3">
                    {t.tagline}
                  </p>
                  <h3 className="mb-6">{t.name}</h3>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-md mb-10">
                    {t.body}
                  </p>
                  <Button asChild>
                    <Link href={t.href}>Open Tool</Link>
                  </Button>
                </div>
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.alt}
                    className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0D1F1A]/10" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FULL-BLEED CTA ── */}
      <section className="bg-primary">
        <div className="max-w-360 mx-auto px-6  py-12">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              {/* LEFT CONTENT */}
              <div className="max-w-2xl">
                <p className="text-[#C9E8D5] text-[10px] tracking-[0.35em] uppercase mb-4">
                  Go Deeper
                </p>

                <h2 className="text-white mb-4">
                  Tools are a starting point.{" "}
                  <span className="italic text-[#C9E8D5]">
                    Advisors finish the job.
                  </span>
                </h2>

                <p className="text-white/60 text-base leading-relaxed">
                  Use these tools to build clarity, then turn it into a real,
                  personalised plan with an accredited advisor.
                </p>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Button
                  asChild
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link href="/free-consultation">
                    Book a Free Consultation
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="text-white border-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
