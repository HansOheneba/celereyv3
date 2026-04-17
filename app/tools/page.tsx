"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1999&q=80&auto=format&fit=crop"
            alt="Financial analytics and data on screen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-[#0D1F1A]/60 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-block border border-[#C9E8D5]/40 text-[#C9E8D5] text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full">
              Celerey Tools
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] max-w-4xl mb-8">
            Instruments built
            <br />
            for your <span className="italic text-[#C9E8D5]">financial</span>
            <br />
            clarity.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
              Not generic calculators. Tools designed around the moments that
              matter most in your financial life, built to help you understand,
              plan, and act with confidence.
            </p>
            <Button
              asChild
              className="group bg-white text-primary hover:bg-white/90 h-auto rounded-none px-8 py-4 text-sm tracking-widest uppercase font-medium gap-3 whitespace-nowrap self-start md:self-auto"
            >
              <a href="#tools">
                Explore the Tools
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
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">
            Scroll
          </span>
          <div className="w-px h-12 bg-white/40 relative overflow-hidden">
            <div
              className="absolute top-0 w-full bg-white"
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
                Why These Tools Exist
              </p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight">
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
        className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
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
                  <span className="text-[120px] font-normal text-[#E8EDE6] leading-none select-none block -mb-8">
                    {t.number}
                  </span>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#5C7A6A] mb-3">
                    {t.tagline}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-normal leading-tight mb-6">
                    {t.name}
                  </h3>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-md mb-10">
                    {t.body}
                  </p>
                  <Button
                    asChild
                    className="group bg-primary text-white hover:bg-primary/90 h-auto rounded-none px-8 py-4 text-sm tracking-widest uppercase font-medium gap-3"
                  >
                    <Link href={t.href}>
                      Open Tool
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
                </div>
                <div className="relative aspect-4/3 overflow-hidden">
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
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80&auto=format&fit=crop"
            alt="City skyline at night"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -right-32 -top-32 w-125 h-125 rounded-full border border-[#C9E8D5]/10" />
        <div className="absolute -right-16 -top-16 w-90 h-90 rounded-full border border-[#C9E8D5]/10" />

        <div className="relative z-10 px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#C9E8D5] text-[10px] tracking-[0.35em] uppercase mb-8">
              Go Deeper
            </p>
            <h2 className="text-white text-5xl md:text-7xl font-normal leading-[1.05] max-w-3xl mb-12">
              Tools are
              <br />
              a starting point.
              <br />
              <span className="italic text-[#C9E8D5]">
                Advisors finish the job.
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-lg leading-relaxed mb-12">
              Use these tools to build clarity about where you stand. Then bring
              that clarity into a conversation with one of our accredited
              financial advisors to turn it into a real, personalised plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="group bg-white text-primary hover:bg-white/90 h-auto px-10 py-4 text-sm tracking-widest uppercase font-medium gap-3"
              >
                <Link href="/free-consultation">
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
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10 hover:text-white h-auto px-10 py-4 text-sm tracking-widest uppercase"
              >
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

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
