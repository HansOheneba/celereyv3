"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "76%",
    label: "of people say financial stress affects their daily performance",
  },
  { value: "3x", label: "more productive when financial anxiety is reduced" },
  { value: "60%", label: "of adults live without a structured financial plan" },
  {
    value: "$1.9T",
    label: "lost annually to poor financial decision-making globally",
  },
];

const pillars = [
  {
    number: "01",
    title: "Clarity Over Confusion",
    body: "Most people make financial decisions in the dark — reacting rather than planning. Financial wellbeing starts with having a clear, honest picture of where you stand and where you're going.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    alt: "Person reviewing financial documents with clarity",
  },
  {
    number: "02",
    title: "Control, Not Just Comfort",
    body: "Feeling financially well isn't about earning more — it's about feeling in control of what you have. Access to expert guidance transforms anxiety into action.",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80&auto=format&fit=crop",
    alt: "Professional feeling confident and in control",
  },
  {
    number: "03",
    title: "Planning as a Practice",
    body: "Wealth isn't built in a single decision. It grows through consistent, informed choices over time. The people who thrive financially treat planning as a discipline, not a destination.",
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
    title: "On-Demand Expert Access",
    body: "Connect with accredited international financial advisors whenever you need guidance — no waiting rooms, no gatekeeping.",
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
    title: "Personalised Financial Health Check",
    body: "A comprehensive snapshot of your financial position — goals, gaps, and opportunities — presented in minutes, not months.",
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
    title: "Structured Wealth Planning",
    body: "Move beyond saving and into building. Our advisors help you define a roadmap tailored to your life, not a generic template.",
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
    title: "Market Intelligence & Insights",
    body: "Expert-curated market reports and investment intelligence, delivered in plain language so you can act with confidence.",
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
    title: "A Community Built on Ambition",
    body: "Surround yourself with people who are intentional about their financial future. Our network events and shared experiences accelerate growth.",
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
    title: "Ongoing Advisory Relationship",
    body: "Wealth planning isn't a one-time conversation. Regular check-ins with your advisor keep your financial plan responsive to your life.",
  },
];

const testimonials = [
  {
    quote:
      "I always assumed financial planning was for people who already had wealth. Celerey changed that entirely. Now I actually understand where my money is going — and where it should be.",
    name: "Ama K.",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&face",
  },
  {
    quote:
      "The financial health check alone was worth it. In 20 minutes I had more clarity than 5 years of self-managing ever gave me.",
    name: "David O.",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&face",
  },
  {
    quote:
      "I stopped feeling anxious about money when I stopped guessing. Celerey gave me a plan and the confidence to follow it.",
    name: "Zara M.",
    role: "Entrepreneur",
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
      <section className="relative min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
        {/* Full bleed hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596079890687-48800eb570c9?w=1800&q=85&auto=format&fit=crop"
            alt="Person looking out over a city with confidence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F1A] via-[#0D1F1A]/60 to-transparent" />
        </div>

        {/* Floating eyebrow pill */}
        <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-block border border-[#C9E8D5]/40 text-[#C9E8D5] text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              Financial Wellbeing
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] max-w-4xl mb-8">
            Your finances
            <br />
            <span className="italic text-[#C9E8D5]">deserve</span> the
            <br />
            same care as
            <br />
            your health.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
              Financial wellbeing isn't about wealth. It's about the freedom,
              clarity, and confidence that comes from knowing your future is
              planned.
            </p>
            <a
              href="/virtual-consultation"
              className="group flex items-center gap-3 bg-[#C9E8D5] text-[#0D1F1A] px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors duration-300 whitespace-nowrap self-start md:self-auto"
            >
              Start Your Journey
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
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">
            Scroll
          </span>
          <div className="w-px h-12 bg-white/40 relative overflow-hidden">
            <div
              className="absolute top-0 w-full bg-white animate-scroll-line"
              style={{
                height: "30%",
                animation: "scrollLine 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STATEMENT ── */}
      <section className="py-28 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-6">
                The Reality
              </p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight">
                Financial stress is the world's
                <br />
                <span className="italic">quietest epidemic.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-16">
              <p className="text-xl text-[#4A4A4A] leading-relaxed mb-6">
                It shows up in sleepless nights, deferred dreams, and decisions
                made out of fear rather than strategy. Across professions and
                income levels, the absence of financial clarity is one of the
                most pervasive sources of human anxiety.
              </p>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                Yet for most people, truly personalised financial guidance has
                always felt out of reach — reserved for the already-wealthy.
                Celerey was built to change that.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-[#0D1F1A] py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border-t border-[#C9E8D5]/20 pt-6">
                <p className="text-[#C9E8D5] text-5xl md:text-6xl font-normal mb-3">
                  {s.value}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  {s.label}
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
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A]">
              What Financial Wellbeing Looks Like
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
                  <h3 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
                    {p.title}
                  </h3>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-md">
                    {p.body}
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
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
          <div className="absolute inset-0 bg-[#0D1F1A]/80" />
        </div>
        <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="text-[#C9E8D5] text-[10px] tracking-[0.35em] uppercase mb-10">
              Celerey Belief
            </p>
            <blockquote className="text-white text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] italic">
              "Financial security isn't a luxury —<br />
              <span className="not-italic">it's a choice anyone can make</span>
              <br />
              with the right guidance."
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT CELEREY OFFERS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-4">
                How We Help
              </p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight">
                Everything you need
                <br />
                to take control.
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Celerey brings together expert advisors, intelligent planning
                tools, and a community of ambitious individuals — making
                world-class financial guidance genuinely accessible.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#E0E5DF]">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="border-b border-r border-[#E0E5DF] p-8 lg:p-10 group hover:bg-[#0D1F1A] transition-colors duration-500 cursor-default">
                <div className="text-[#5C7A6A] group-hover:text-[#C9E8D5] transition-colors mb-6">
                  {f.icon}
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A] group-hover:text-white transition-colors mb-3">
                  {f.title}
                </h3>
                <p className="text-[#4A4A4A] group-hover:text-white/60 text-sm leading-relaxed transition-colors">
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
              className="flex-shrink-0 overflow-hidden"
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#F2F5F0]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-16 text-center">
              People Who Chose Clarity
            </p>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto min-h-[280px]">
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
                    <p className="font-medium text-[#1A1A1A]">{t.name}</p>
                    <p className="text-sm text-[#5C7A6A]">{t.role}</p>
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-4">
              Your Path Forward
            </p>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight max-w-xl">
              Three steps to a<br />
              <span className="italic">financially well</span> life.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-px bg-[#C9E8D5]" />

          {[
            {
              step: "1",
              title: "Understand where you stand",
              body: "Take a free financial health check. In minutes, get a clear picture of your financial position — no jargon, no judgment.",
              cta: "Get a Free Health Check",
              href: "https://celerey.app/",
            },
            {
              step: "2",
              title: "Build your plan with an expert",
              body: "Book a consultation with one of our accredited international advisors. Walk away with a clear, personalised strategy — not a generic template.",
              cta: "Book a Consultation",
              href: "/virtual-consultation",
            },
            {
              step: "3",
              title: "Grow with ongoing support",
              body: "Subscribe to Celerey for regular advisory sessions, market insights, and a community that keeps your financial momentum alive.",
              cta: "View Plans",
              href: "/subscribe",
            },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div>
                <div className="w-16 h-16 border border-[#C9E8D5] flex items-center justify-center mb-8 relative bg-white">
                  <span className="text-2xl font-normal text-[#0D1F1A]">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-2xl font-normal mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-6 text-sm">
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
      <section className="relative overflow-hidden bg-[#0D1F1A]">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop"
            alt="City skyline at night"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full border border-[#C9E8D5]/10" />
        <div className="absolute -right-16 -top-16 w-[360px] h-[360px] rounded-full border border-[#C9E8D5]/10" />

        <div className="relative z-10 px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#C9E8D5] text-[10px] tracking-[0.35em] uppercase mb-8">
              Take the First Step
            </p>
            <h2 className="text-white text-5xl md:text-7xl font-normal leading-[1.05] max-w-3xl mb-12">
              Your financial
              <br />
              future starts
              <br />
              <span className="italic text-[#C9E8D5]">with one decision.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-lg leading-relaxed mb-12">
              Join the thousands of people who chose clarity over anxiety. Book
              your free consultation and take control of where your life is
              headed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/virtual-consultation"
                className="group inline-flex items-center gap-3 bg-[#C9E8D5] text-[#0D1F1A] px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors duration-300"
              >
                Book a Free Consultation
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
              </a>
              <a
                href="https://celerey.app/"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-10 py-4 text-sm tracking-widest uppercase hover:border-white/60 transition-colors duration-300"
              >
                Get a Free Health Check
              </a>
            </div>
          </FadeIn>
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
