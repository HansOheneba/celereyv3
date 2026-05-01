import Image from "next/image";
import Link from "next/link";
import { Reveal, InteractiveImage } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8]">
      {/* Ambient background wash */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(26,24,86,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(176,125,61,0.06),transparent_55%)]" />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 pt-16 pb-0 sm:pt-20">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-sm tracking-widest text-[#b07d3d]">
            ABOUT CELEREY
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-neutral-900">
            Building the infrastructure that allows individuals everywhere to
            make better financial decisions and build enduring wealth.
          </h1>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px]">
            <div className="relative h-105 w-full sm:h-130 lg:h-160">
              <Image
                src="https://images.unsplash.com/photo-1567408298100-551880dd8054?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="People building wealth together"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 1200px, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,11,53,0.72),rgba(0,0,0,0.08)_55%)]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="mb-3 text-sm tracking-widest text-white/60">
                OUR PURPOSE
              </p>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-white sm:text-2xl">
                We combine technology and expert advice to create a personalised
                experience that helps you grow and protect your wealth, now and
                into the future.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-light text-neutral-900">
            Our mission is to empower everyone, everywhere to achieve lasting
            financial security and freedom.
          </h2>
          <div className="mx-auto mt-8 h-px w-20 bg-[#b07d3d]/40" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600">
            We&apos;re dedicated to making wealth management accessible for all.
            Our mission is clear: to deliver personalised, intuitive financial
            solutions that empower you to take control of your future, no matter
            where your journey begins.
          </p>
        </Reveal>
      </section>

      {/* ── HOW WE WORK: IMAGE + TEXT ────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <InteractiveImage className="relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1650050349195-140cb7126310?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Personalised financial guidance"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </InteractiveImage>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mb-5 text-sm tracking-widest text-[#b07d3d]">
              HOW WE WORK
            </p>
            <h2 className="text-neutral-900">
              Technology and human expertise, working together for you.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Celerey brings together world-class financial advisors and
              intelligent technology to create something that has not really
              existed before: wealth guidance that feels personal, that grows
              with you, and that actually fits the way you live.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              We believe you should not have to be wealthy to access great
              financial advice. The tools, the insight, and the expert guidance
              we provide are built to meet you wherever you are on your journey.
            </p>
            <div className="mt-8 h-px w-full bg-black/10" />
            <p className="mt-6 text-base italic text-neutral-500">
              &ldquo;Accessible, personalised, and empowering&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BELIEF STATEMENT ─────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#160b35]">
            <div className="absolute inset-0">
              <Image
                src="/homepage/moments1.png"
                alt=""
                fill
                className="object-cover opacity-20 mix-blend-luminosity"
                sizes="100vw"
              />
            </div>
            <div className="relative px-8 py-16 text-center sm:px-16 sm:py-24">
              <p className="mb-6 text-sm tracking-widest text-[#b07d3d]">
                WHAT WE BELIEVE
              </p>
              <h2 className="mx-auto max-w-3xl font-light text-white">
                We believe wealth management should be accessible, personalised,
                and empowering, giving you the tools to grow and protect your
                wealth, now and for the future.
              </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TOOLS: TEXT + IMAGE ──────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal delay={0.06}>
            <p className="mb-5 text-sm tracking-widest text-[#b07d3d]">
              YOUR FINANCIAL FUTURE
            </p>
            <h2 className="text-neutral-900">
              Tools that put you in control of your financial future.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              From budgeting and planning to investment guidance and wealth
              tracking, everything we build is designed to give you clarity and
              confidence. Because the best financial decisions come from
              understanding, not guesswork.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                {
                  label: "WealthScan",
                  desc: "Understand your financial health at a glance.",
                },
                {
                  label: "Budget Planner",
                  desc: "See where your money is going",
                },
                {
                  label: "Savings Calculator",
                  desc: "Map out a clear path to your goals.",
                },
                {
                  label: "Expert Advisors",
                  desc: "Real humans who know their craft.",
                },
              ].map((tool) => (
                <div
                  key={tool.label}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <p className="text-sm font-medium text-neutral-900">
                    {tool.label}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{tool.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/tools">
                <Button>Explore our tools</Button>
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <InteractiveImage className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1664574654589-8f6c9b94c02d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tools for your financial future"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </InteractiveImage>
          </Reveal>
        </div>
      </section>

      {/* ── THREE IMAGES GRID ────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 pb-20">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image
                src="/homepage/hero.png"
                alt="Financial clarity"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,11,53,0.5),transparent_60%)]" />
              <p className="absolute bottom-5 left-5 text-sm text-white/80">
                Clarity
              </p>
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl sm:mt-8">
              <Image
                src="https://images.unsplash.com/photo-1714357293281-9e82084bd144?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building enduring wealth"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,11,53,0.5),transparent_60%)]" />
              <p className="absolute bottom-5 left-5 text-sm text-white/80">
                Enduring wealth
              </p>
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image
                src="/homepage/man-waving.png"
                alt="Expert guidance"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,11,53,0.5),transparent_60%)]" />
              <p className="absolute bottom-5 left-5 text-sm text-white/80">
                Expert guidance
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-360 px-6 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-light text-neutral-900">
            Your financial journey deserves more than generic advice.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
            Start with us today and experience what truly personalised guidance
            can do. Wherever you are, we&apos;re building this for you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/book-session">
              <Button className="w-full sm:w-auto">Book a session</Button>
            </Link>
            <Link href="/wealthscan">
              <Button variant="outline" className="w-full sm:w-auto">
                Try WealthScan
              </Button>
            </Link>
          </div>
          <div className="mx-auto mt-16 h-px w-20 bg-neutral-900/10" />
        </Reveal>
      </section>
    </main>
  );
}
