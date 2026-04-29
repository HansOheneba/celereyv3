"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Source for all stats below: PwC Employee Financial Wellness Survey, 2026
// https://www.pwc.com/us/en/services/consulting/business-transformation/library/employee-financial-wellness-survey.html
const stats = [
  {
    value: "59%",
    label:
      "of employees say financial stress is affecting their work right now",
    source: "PwC, 2026",
  },
  {
    value: "71%",
    label:
      "of Gen Z employees report reduced productivity due to financial stress",
    source: "PwC, 2026",
  },
  {
    value: "83%",
    label:
      "of employees use financial wellness services when their employer offers them",
    source: "PwC, 2026",
  },
  {
    value: "52%",
    label:
      "of employees do not feel capable of planning for their long-term financial goals",
    source: "PwC, 2026",
  },
];

const pillars = [
  {
    number: "01",
    title: "A More Focused Workforce",
    body: "When employees are not preoccupied by financial anxiety, they bring more focus, creativity, and energy to work. Investing in financial clarity is investing directly in daily performance.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    alt: "Person reviewing financial documents with clarity",
  },
  {
    number: "02",
    title: "Retention Through Real Support",
    body: "Financial wellbeing is one of the most valued workplace benefits today. Organisations that offer it build cultures people genuinely want to stay in, reducing the compounding costs of turnover.",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80&auto=format&fit=crop",
    alt: "Professional feeling confident and in control",
  },
  {
    number: "03",
    title: "Resilience Built Into Your Culture",
    body: "A workforce that understands its finances is better equipped to absorb pressure and change. Consistent financial guidance builds the kind of stability that strengthens organisations from the inside.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop",
    alt: "Financial planning and growth charts",
  },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3zm0 5v6l4 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Expert Advisors, Available to Your Team",
    body: "Your employees connect directly with accredited international financial advisors whenever they need guidance. No waiting rooms, no barriers to entry.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect
          x="4"
          y="6"
          width="20"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 13h10M9 17h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "A Financial Health Check for Every Employee",
    body: "Each team member receives a comprehensive snapshot of their financial position: goals, gaps, and next steps, presented clearly and without jargon.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M4 20l6-6 4 4 10-12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Personalised Wealth Plans, Not Generic Templates",
    body: "Our advisors build tailored financial roadmaps for each employee, moving them from reactive decisions into structured, long-term planning.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M14 9v5l3 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Financial Education and Market Insights",
    body: "Keep your workforce informed with expert-curated financial education and market intelligence, delivered in plain language your people can act on confidently.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M6 22v-4a4 4 0 014-4h8a4 4 0 014 4v4M14 10a4 4 0 100-8 4 4 0 000 8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "A Community That Reinforces Progress",
    body: "Your employees join a network of professionals who are intentional about their financial futures. Shared experience and peer accountability accelerate lasting change.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M12 4H6a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2v-6M18 4l6 6-10 10H8v-6L18 4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "A Long-Term Advisory Partnership",
    body: "Financial wellbeing is not a one-time benefit. Regular advisor check-ins keep financial plans current and responsive as employee circumstances evolve.",
  },
];

const testimonials = [
  {
    quote:
      "We had no idea how much financial anxiety was affecting our team until we looked at the data. Since working with Celerey, the shift in day-to-day engagement has been noticeable and measurable.",
    name: "Sarah N.",
    role: "Chief People Officer",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&face",
  },
  {
    quote:
      "Our retention challenge was not about salary. It was about whether our people felt genuinely supported. Celerey filled a gap that no other benefit had come close to addressing.",
    name: "James A.",
    role: "HR Director, Financial Services",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&face",
  },
  {
    quote:
      "What stood out was how personalised it felt. This was not a generic financial literacy course. Every employee received a real, individual plan tailored to where they actually are.",
    name: "Kwame O.",
    role: "CEO, Professional Services",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop&face",
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

export default function FinancialWellbeingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#FAFAF8] text-[#1A1A1A] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="pt-14 max-w-360 px-6 mx-auto sm:pt-20">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[#5C7A6A]"
          >
            EMPLOYEE FINANCIAL WELLBEING
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mx-auto mt-5 max-w-3xl text-neutral-900"
          >
            Your people perform better when their finances are in order.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-neutral-600"
          >
            Financial stress is one of the most overlooked drains on workforce
            performance. Give your people the clarity, tools, and expert
            guidance to show up fully at work.
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
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop"
                  alt="Person looking out over a city with confidence"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.28 }}
            className="mt-8"
          >
            <Button asChild>
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </motion.div> */}
        </div>
      </section>

      {/* ── EDITORIAL STATEMENT ── */}
      <section className="py-28 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-[#5C7A6A] mb-6">
                The Business Case
              </p>
              <h2 className="">
                Financial stress is silently
                <br />
                <span className="italic">costing your organisation.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-16">
              <p className="text-[#4A4A4A] mb-6">
                It does not appear on a balance sheet. But it shows up in missed
                deadlines, disengaged teams, and the slow erosion of
                performance. When your people are distracted by financial
                anxiety, they cannot bring their best to work.
              </p>
              <p className="text-[#4A4A4A]">
                For most of your people, quality financial guidance has always
                felt out of reach. Celerey was built to change that: bringing
                world-class financial advisory to every level of your workforce.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-primary py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border-t border-[#C9E8D5]/20 pt-6">
                <p className="text-[#C9E8D5] mb-3">
                  {s.value}
                </p>
                <p className="text-white/50 mb-2">
                  {s.label}
                </p>
                {/* Source: PwC Employee Financial Wellness Survey, 2026 — https://www.pwc.com/us/en/services/consulting/business-transformation/library/employee-financial-wellness-survey.html */}
                <p className="text-white/30 mt-1">
                  Source: {s.source}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── THREE PILLARS (alternating) ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-20">
            <div className="w-8 h-px bg-[#5C7A6A]" />
            <p className="text-[#5C7A6A]">
              What Employee Financial Wellbeing Delivers
            </p>
          </div>
        </FadeIn>

        <div className="space-y-36">
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={0.1}>
              <div
                className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <span className="text-[120px] font-normal text-[#E8EDE6] leading-none select-none block -mb-8">
                    {p.number}
                  </span>
                  <h3 className="mb-6">{p.title}</h3>
                  <p className="text-[#4A4A4A] max-w-md">
                    {p.body}
                  </p>
                </div>
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0D1F1A]/10" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── LARGE PULL QUOTE ── */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1800&q=80&auto=format&fit=crop"
            alt="Sunrise over financial district"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="text-[#C9E8D5] mb-10">
              Celerey Belief
            </p>
            <blockquote className="text-white text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] italic">
              &ldquo;When your people
              <br />
              <span className="not-italic">feel financially secure,</span>
              <br />
              everything else follows.&rdquo;
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT CELEREY OFFERS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-6">
              <p className="text-[#5C7A6A] mb-4">
                How We Help
              </p>
              <h2 className="">
                A complete programme
                <br />
                for your workforce.
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-[#4A4A4A]">
                Celerey brings together accredited advisors, intelligent
                planning tools, and a thriving peer community: making
                world-class financial guidance accessible to every member of
                your team, regardless of seniority or income.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#E0E5DF]">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="border-b border-r border-[#E0E5DF] p-8 lg:p-10 group hover:bg-primary transition-colors duration-500 cursor-default">
                <div className="text-primary group-hover:text-white transition-colors mb-6">
                  {f.icon}
                </div>
                <h3 className="text-[#1A1A1A] group-hover:text-white transition-colors mb-3">
                  {f.title}
                </h3>
                <p className="text-[#4A4A4A] group-hover:text-white/60 transition-colors">
                  {f.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PHOTO COLLAGE BAND ── */}
      <section className="py-4 overflow-hidden">
        <div className="flex gap-4 px-4" style={{ height: "420px" }}>
          {[
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden"
              style={{ width: i === 2 ? "28%" : "18%", flexGrow: 1 }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20">
            <p className="text-[#5C7A6A] mb-4">
              How It Works
            </p>
            <h2 className="max-w-xl">
              Three steps to a<br />
              <span className="italic">financially well</span> workforce.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-px bg-[#C9E8D5]" />

          {[
            {
              step: "1",
              title: "Tell us about your organisation",
              body: "We start with a conversation about your team: size, structure, and the financial challenges your people are likely facing. No commitment required.",
              cta: "Get in Touch",
              href: "/contact",
            },
            {
              step: "2",
              title: "Deploy Celerey to your workforce",
              body: "We onboard your employees seamlessly. Each person receives a personalised financial health check and is matched with an advisor suited to their profile.",
              cta: "See What We Offer",
              href: "/services",
            },
            {
              step: "3",
              title: "Measure the impact over time",
              body: "Track the outcomes that matter: engagement, participation rates, and the qualitative shift in how your team relates to money and their financial futures.",
              cta: "Explore Partnerships",
              href: "/contact",
            },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div>
                <div className="w-16 h-16 border border-[#C9E8D5] flex items-center justify-center mb-8 relative bg-white">
                  <span className="text-2xl font-normal text-[#0D1F1A]">
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-4">{s.title}</h3>
                <p className="text-[#4A4A4A] mb-6">
                  {s.body}
                </p>
                <a
                  href={s.href}
                  className="text-[#0D1F1A] text-sm tracking-widest uppercase border-b border-[#0D1F1A] pb-px hover:text-[#5C7A6A] hover:border-[#5C7A6A] transition-colors"
                >
                  {s.cta} →
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FULL-BLEED CTA ── */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop"
            alt="City skyline at night"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-32 -top-32 w-125 h-125 rounded-full border border-[#C9E8D5]/10" />
        <div className="absolute -right-16 -top-16 w-90 h-90 rounded-full border border-[#C9E8D5]/10" />

        <div className="relative z-10 px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#C9E8D5] mb-8">
              Ready to Partner
            </p>
            <h2 className="text-white max-w-3xl mb-12">
              Bring financial
              <br />
              wellbeing to
              <br />
              <span className="italic text-[#C9E8D5]">your workforce.</span>
            </h2>
            <p className="text-white/60 max-w-lg mb-12">
              Forward-thinking organisations are already investing in their
              people&apos;s financial health. Let&apos;s talk about what that
              could look like for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="group bg-white text-primary hover:bg-white/90 h-auto px-10 py-4 text-sm tracking-widest uppercase font-medium gap-3"
              >
                <Link href="/contact">
                  Get in Touch
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10 hover:text-white h-auto px-10 py-4 text-sm tracking-widest uppercase"
              >
                <Link href="/services">Learn About Our Services</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#F2F5F0]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#5C7A6A] mb-16 text-center">
              Companies That Invested in Their People
            </p>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto min-h-70">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: i === activeTestimonial ? 1 : 0,
                  transform:
                    i === activeTestimonial
                      ? "translateY(0)"
                      : "translateY(20px)",
                  pointerEvents: i === activeTestimonial ? "auto" : "none",
                }}
              >
                <blockquote className="text-2xl md:text-3xl font-normal leading-relaxed text-[#1A1A1A] mb-10 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-[#1A1A1A]">{t.name}</p>
                    <p className="text-[#5C7A6A]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-20">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? "w-8 h-2 bg-[#0D1F1A]" : "w-2 h-2 bg-[#0D1F1A]/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Scroll animation keyframe */}
      <style jsx global>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
      `}</style>
    </main>
  );
}
