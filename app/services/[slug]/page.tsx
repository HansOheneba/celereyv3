"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Service Data ────────────────────────────────────────────────────────────

type ServiceData = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  overview: string;
  image: string;
  imageAlt: string;
  covers: { label: string; detail: string }[];
  deliverable: string;
  advisor: string;
  forWho: string;
  whyItMatters: string[];
  serviceId: string;
};

const SERVICES: Record<string, ServiceData> = {
  "wealth-review": {
    slug: "wealth-review",
    number: "01",
    title: "Wealth & Portfolio Review",
    tagline: "Your portfolio should be working as hard as you did to build it.",
    overview:
      "Most people accumulate investments over time rather than by design. A pension here, a brokerage account there, an inheritance that has never quite been addressed. The result is a portfolio that may be working less hard than it should, carrying risks you are not fully aware of, or misaligned with where your life is heading. This engagement is for clients who already hold investments and want a structured, independent assessment of exactly where they stand.",
    image: "/services/investment.jpeg",
    imageAlt: "Financial portfolio review in session",
    covers: [
      {
        label: "Portfolio diagnostic",
        detail:
          "A structured review of all current holdings across accounts, platforms, and asset classes.",
      },
      {
        label: "Suitability assessment",
        detail:
          "An honest evaluation of whether your investments are aligned with your goals, timeline, and risk tolerance.",
      },
      {
        label: "Concentration & risk analysis",
        detail:
          "Identification of overexposure, correlation risks, and any structural vulnerabilities in your current allocation.",
      },
      {
        label: "Reallocation recommendations",
        detail:
          "Specific, actionable guidance on how to reposition your portfolio to better reflect your objectives.",
      },
    ],
    deliverable: "Written Advisory Opinion & Recommended Allocation",
    advisor: "Accredited Wealth Planner",
    forWho:
      "This engagement suits individuals who have built up assets over time and want clarity on whether their portfolio is structured correctly. It is equally valuable for those approaching a significant life event, a business exit, inheritance, or retirement, who want a clear picture before making further decisions.",
    whyItMatters: [
      "An independent review is not about finding fault with previous decisions. It is about understanding where you are today with clear eyes, so that the next decision you make is grounded in full information rather than assumption.",
      "Most people never receive a structured diagnosis of their complete financial position. They receive product recommendations. An advisory opinion is something different: it is an assessment of your situation against your goals, free from product incentive.",
      "The difference between a well-structured portfolio and a poorly constructed one compounds quietly across years. Small misalignments become significant losses of opportunity. This engagement is designed to surface that difference and give you a plan to act on it.",
    ],
    serviceId: "wealth-review",
  },

  tax: {
    slug: "tax",
    number: "02",
    title: "Tax Optimisation",
    tagline: "Structure your affairs. Keep more of what you earn.",
    overview:
      "Tax is one of the largest expenses most people never actively manage. For individuals with multiple income streams, business interests, or assets across jurisdictions, the gap between what you owe and what you could legally owe is often substantial. This engagement is a dedicated advisory session that reviews your current tax position, identifies the planning opportunities that apply to your circumstances, and gives you a written plan to act on them.",
    image: "/services/tax.png",
    imageAlt: "Tax planning advisory session",
    covers: [
      {
        label: "Current tax position review",
        detail:
          "A clear picture of your effective tax rate across income sources, assets, and jurisdictions.",
      },
      {
        label: "Opportunity identification",
        detail:
          "Identification of reliefs, allowances, and structures that are available but not yet being used.",
      },
      {
        label: "Pre-event structuring",
        detail:
          "Advice on how to structure transactions, sales, or transfers before they occur to minimise exposure.",
      },
      {
        label: "Cross-border considerations",
        detail:
          "Guidance for clients with income, assets, or residency arrangements that span multiple tax jurisdictions.",
      },
    ],
    deliverable: "Tax Plan & Written Advisory Opinion",
    advisor: "Accredited Tax Advisor",
    forWho:
      "This engagement is for individuals and business owners who want to understand and improve their tax position. It is particularly valuable if you have recently changed income structure, are preparing for a significant transaction, or have never had a formal review of how your affairs are currently arranged.",
    whyItMatters: [
      "Tax planning is not about avoidance in any scheme or aggressive sense. It is about understanding the rules that exist, applying them to your specific situation, and ensuring you are not paying more than you are required to.",
      "The difference between reactive and proactive tax planning is usually measured in thousands. Pre-event advice, before a sale, a restructure, or a gift, almost always produces a better outcome than advice sought after the fact.",
      "For individuals with complexity across income sources or borders, a coordinated view of your tax position is rarely something that emerges from a single professional engagement. This review is designed to surface that coordinated picture and translate it into a plan you can act on with confidence.",
    ],
    serviceId: "tax",
  },

  estate: {
    slug: "estate",
    number: "03",
    title: "Legacy & Estate Planning",
    tagline: "The wealth you build should outlast the decisions you delay.",
    overview:
      "Generational wealth is not an accident. It is the product of deliberate structures, clear intentions, and governance frameworks that hold across time, circumstance, and family complexity. This engagement is for individuals and families who are beginning to think seriously about how their wealth transfers, and what happens to it in the decades after them. It is a focused advisory session on the structures that protect, govern, and move wealth across generations.",
    image: "/services/legacy.png",
    imageAlt:
      "Family walking together, representing legacy and generational wealth",
    covers: [
      {
        label: "Trust & family structure review",
        detail:
          "An assessment of existing structures or guidance on which structures are appropriate for your circumstances.",
      },
      {
        label: "Succession planning",
        detail:
          "A review of how ownership and control of assets will transfer, and whether the current arrangements reflect your intentions.",
      },
      {
        label: "Intergenerational transfer strategy",
        detail:
          "Guidance on timing, method, and structure of transfers to optimise both tax efficiency and family impact.",
      },
      {
        label: "Governance framework overview",
        detail:
          "An outline of the decision-making structures and protections that can be put in place to govern family wealth over time.",
      },
    ],
    deliverable: "Legacy Strategy Report & Structural Recommendations",
    advisor: "Accredited Wealth Manager",
    forWho:
      "This engagement is for individuals and families who have built meaningful wealth and are ready to think carefully about what happens to it. It is also valuable for those navigating significant life changes, a new marriage, a growing family, or the ageing of a parent, where the question of structure becomes urgent.",
    whyItMatters: [
      "The conversations most families never have are the ones that determine what survives across generations. Wealth that is deliberately structured, governed, and transferred is fundamentally different from wealth that is simply accumulated and left.",
      "Estate planning is not a conversation reserved for the elderly or the ultra-wealthy. It is relevant any time you have assets, dependants, or intentions that you want protected. The earlier it is addressed, the more options are available.",
      "Structures like trusts are not exotic arrangements. They are practical legal tools that exist precisely to protect assets from fragmentation, tax, and dispute. Understanding which structures apply to your situation, and building them before they are urgently needed, is one of the highest-value decisions a family can make.",
    ],
    serviceId: "estate",
  },

  property: {
    slug: "property",
    number: "04",
    title: "International Property Advisory",
    tagline: "Buy right. Structure smarter. Move across borders with clarity.",
    overview:
      "Real estate across jurisdictions is one of the most complex financial decisions a person can make. What appears to be a straightforward acquisition often carries structuring implications, financing options, and jurisdiction-specific risks that are invisible until they are not. This engagement is for clients acquiring, financing, or restructuring real estate internationally, who want an independent advisory view before committing.",
    image: "/services/property.png",
    imageAlt: "International property advisory",
    covers: [
      {
        label: "Acquisition structure analysis",
        detail:
          "Guidance on whether to acquire personally, through a company, or via a trust structure, and the implications of each.",
      },
      {
        label: "Offshore financing review",
        detail:
          "An assessment of financing options available across jurisdictions and which structures offer the most efficient outcome.",
      },
      {
        label: "Yield & valuation assessment",
        detail:
          "An independent review of the financial case for the acquisition, including realistic yield expectations and valuation context.",
      },
      {
        label: "Jurisdiction risk overview",
        detail:
          "A clear-eyed view of the regulatory, legal, and currency risks associated with owning property in the relevant market.",
      },
    ],
    deliverable: "Property Advisory Report & Structuring Guidance",
    advisor: "Accredited Property Consultant",
    forWho:
      "This engagement is for individuals and families acquiring or already holding property across international markets. It is particularly valuable for those who are unfamiliar with a new jurisdiction, navigating financing for the first time across borders, or restructuring existing property holdings.",
    whyItMatters: [
      "Property purchases abroad are often made on the basis of lifestyle appeal rather than structural rigour. The financial implications of acquiring in the wrong name, with the wrong financing structure, or without understanding the local tax environment can take years to unravel.",
      "Jurisdiction risk is rarely front of mind during an acquisition. Currency exposure, repatriation rules, inheritance law differences, and exit taxes are the kinds of considerations that become expensive surprises rather than informed decisions.",
      "A single advisory session before commitment costs a fraction of what restructuring after the fact costs, both financially and in time. This engagement is designed to surface what you need to know before you sign, not after.",
    ],
    serviceId: "property",
  },

  capital: {
    slug: "capital",
    number: "05",
    title: "Business Financing & Capital Strategy",
    tagline:
      "The capital decisions that determine whether a business scales or stalls.",
    overview:
      "Founders and business owners make more consequential financial decisions in a single year than most individuals make in a decade. The question of how to finance growth, when to take on debt versus equity, how to position the business to lenders, and how to restructure an ageing balance sheet are decisions that compound. This engagement is a structured advisory session for founders and SME owners at a financing inflection point.",
    image: "/services/business.jpeg",
    imageAlt: "Business financing and capital strategy session",
    covers: [
      {
        label: "Capital needs assessment",
        detail:
          "A clear view of what capital the business actually needs, over what timeframe, and for what purpose.",
      },
      {
        label: "Debt optimisation review",
        detail:
          "An assessment of existing debt structures and whether they can be improved in terms of cost, covenants, or duration.",
      },
      {
        label: "Equity vs debt analysis",
        detail:
          "A structured comparison of funding options and their long-term implications for ownership, control, and financial flexibility.",
      },
      {
        label: "Lender & investor positioning",
        detail:
          "Guidance on how to present the business to capital providers in a way that reflects its strengths and reduces perceived risk.",
      },
    ],
    deliverable: "Capital Strategy Memorandum",
    advisor: "Senior Financial Advisor",
    forWho:
      "This engagement is for founders and SME owners who are navigating a capital decision and want an independent financial perspective before committing to a direction. It is particularly relevant at moments of growth, refinancing, acquisition, or when existing funding structures are no longer fit for purpose.",
    whyItMatters: [
      "Most founders approach capital decisions in reactive mode: a need arises, options are pursued, terms are accepted. A proactive capital strategy inverts this. It defines what you need, why you need it, and how to get it on terms that preserve your position.",
      "The difference between well-structured and poorly structured debt is not just cost. It is the covenants that constrain your decisions, the security you have pledged, and the flexibility you have surrendered. Understanding what you are agreeing to before you agree to it is the entire point.",
      "Equity is not simply a financing instrument. It is a permanent dilution of ownership and control. The decision between debt and equity, and the timing of that decision, should be made with full information. This engagement is designed to provide that information.",
    ],
    serviceId: "capital",
  },
};

// ─── Inquiry Form ────────────────────────────────────────────────────────────

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredContact: "WhatsApp" | "Email" | "Phone call";
  timeframe: "ASAP" | "This week" | "This month" | "Flexible";
  goal: string;
  context: string;
};

function InlineInquiryForm({ service }: { service: ServiceData }) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    preferredContact: "WhatsApp",
    timeframe: "This week",
    goal: "",
    context: "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const step1Valid =
    form.fullName.trim().length > 1 &&
    form.email.trim().includes("@") &&
    form.phone.trim().length > 4;

  const step2Valid = form.goal.trim().length > 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!step2Valid) return;

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          subject: `Service Inquiry: ${service.title}`,
          message: `Phone: ${form.phone}\nCountry: ${form.country}\nPreferred Contact: ${form.preferredContact}\nTimeframe: ${form.timeframe}\n\nGoal: ${form.goal}\n\nContext: ${form.context}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[22px] border border-black/10 bg-white px-8 py-12 text-center"
      >
        <p className="text-xs tracking-[0.22em] text-[#b07d3d]">RECEIVED</p>
        <h3 className="mt-4 font-serif text-2xl text-neutral-900">
          We will be in touch shortly.
        </h3>
        <p className="mt-4 text-sm leading-7 text-neutral-500 max-w-md mx-auto">
          Your inquiry has been received. A member of our advisory team will
          reach out to confirm scope and next steps, typically within one
          business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500">
          Step {step} of 2<span className="mx-2 text-neutral-300">•</span>
          <span className="text-neutral-700">
            {step === 1 ? "Your details" : "What you need"}
          </span>
        </p>
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs text-neutral-500 underline underline-offset-4 hover:text-neutral-800"
          >
            Back
          </button>
        )}
      </div>

      {step === 1 ? (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                className="text-xs tracking-wide text-neutral-500"
                htmlFor="fullName"
              >
                Full name
              </label>
              <input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-xs tracking-wide text-neutral-500"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 234 567 890"
                autoComplete="tel"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs tracking-wide text-neutral-500"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label
                className="text-xs tracking-wide text-neutral-500"
                htmlFor="country"
              >
                Country
              </label>
              <input
                id="country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="Where are you based?"
                autoComplete="country-name"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-xs tracking-wide text-neutral-500"
                htmlFor="preferredContact"
              >
                Preferred contact
              </label>
              <select
                id="preferredContact"
                value={form.preferredContact}
                onChange={(e) =>
                  update(
                    "preferredContact",
                    e.target.value as FormState["preferredContact"],
                  )
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black/20"
              >
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Phone call</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label
                className="text-xs tracking-wide text-neutral-500"
                htmlFor="timeframe"
              >
                Timeframe
              </label>
              <select
                id="timeframe"
                value={form.timeframe}
                onChange={(e) =>
                  update("timeframe", e.target.value as FormState["timeframe"])
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black/20"
              >
                <option>ASAP</option>
                <option>This week</option>
                <option>This month</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className={cn(
                "inline-flex h-11 items-center rounded-full px-8 text-sm font-medium transition-all",
                step1Valid
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed",
              )}
            >
              Continue
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label
              className="text-xs tracking-wide text-neutral-500"
              htmlFor="goal"
            >
              What outcome do you want from this engagement?
            </label>
            <input
              id="goal"
              value={form.goal}
              onChange={(e) => update("goal", e.target.value)}
              placeholder="One clear sentence is enough"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="text-xs tracking-wide text-neutral-500"
              htmlFor="context"
            >
              Context{" "}
              <span className="text-neutral-400">(optional, but helpful)</span>
            </label>
            <textarea
              id="context"
              value={form.context}
              onChange={(e) => update("context", e.target.value)}
              placeholder="Any background that will help us prepare for this conversation."
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-neutral-400 max-w-sm leading-5">
              We will confirm scope by email before any engagement begins.
            </p>
            <button
              type="submit"
              disabled={!step2Valid || loading}
              className={cn(
                "inline-flex h-11 items-center rounded-full px-8 text-sm font-medium transition-all",
                step2Valid && !loading
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed",
              )}
            >
              {loading ? "Sending..." : "Request Engagement"}
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiceDetailPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";
  const service = SERVICES[slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-[#fbfaf8] pb-32">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-16 md:px-24 sm:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[11px] tracking-[0.28em] text-[#b07d3d]"
        >
          PRIVATE ADVISORY &nbsp;·&nbsp; {service.number}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06 }}
          className="mt-8 font-serif font-thin text-4xl leading-tight text-neutral-900 sm:text-5xl md:text-6xl md:leading-tight max-w-4xl"
        >
          {service.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-6 text-sm tracking-wide text-neutral-500"
        >
          {service.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-10 h-px w-16 bg-neutral-900/15 origin-left"
        />
      </section>

      {/* ── Full-Width Image ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.18 }}
        className="px-6 pb-20 md:px-24"
      >
        <div className="overflow-hidden rounded-3xl border border-black/8">
          <div className="relative aspect-16/7 w-full">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </motion.section>

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.24em] text-neutral-400 mb-5">
              OVERVIEW
            </p>
            <p className="text-neutral-700 leading-8 text-[1.0625rem] max-w-2xl">
              {service.overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5 pt-9"
          >
            <div className="rounded-2xl border border-black/8 bg-white px-5 py-5">
              <p className="text-[10px] tracking-[0.22em] text-neutral-400">
                DELIVERABLE
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-900 leading-5">
                {service.deliverable}
              </p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white px-5 py-5">
              <p className="text-[10px] tracking-[0.22em] text-neutral-400">
                LED BY
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-900">
                {service.advisor}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="my-20 px-6 md:px-24">
        <div className="h-px w-full bg-black/6" />
      </div>

      {/* ── What This Covers ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.24em] text-neutral-400 mb-10"
        >
          WHAT THIS ENGAGEMENT COVERS
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.covers.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-black/8 bg-white p-6"
            >
              <span className="font-serif text-lg text-[#b07d3d]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium text-neutral-900 text-sm leading-5">
                {item.label}
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-6">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="my-20 px-6 md:px-24">
        <div className="h-px w-full bg-black/6" />
      </div>

      {/* ── Why It Matters ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-24">
        <div className="grid gap-16 lg:grid-cols-[220px_1fr]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-[0.24em] text-neutral-400">
              WHY IT MATTERS
            </p>
          </motion.div>

          <div className="space-y-8">
            {service.whyItMatters.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="text-neutral-700 leading-8 text-[1.0625rem]"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="my-20 px-6 md:px-24">
        <div className="h-px w-full bg-black/6" />
      </div>

      {/* ── Who This Is For ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-24">
        <div className="grid gap-16 lg:grid-cols-[220px_1fr]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-[0.24em] text-neutral-400">
              WHO THIS IS FOR
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="text-neutral-700 leading-8 text-[1.0625rem]"
          >
            {service.forWho}
          </motion.p>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="my-20 px-6 md:px-24">
        <div className="h-px w-full bg-black/6" />
      </div>

      {/* ── Inquiry Form ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-24">
        <div className="grid gap-16 lg:grid-cols-[360px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] tracking-[0.24em] text-neutral-400">
              REQUEST THIS ENGAGEMENT
            </p>
            <h2 className="mt-5 font-serif text-3xl text-neutral-900 leading-tight">
              Ready to begin?
            </h2>
            <p className="mt-4 text-sm text-neutral-500 leading-7">
              Share a few details and we will follow up to confirm scope and
              answer any questions before anything is formalised.
            </p>
            <p className="mt-6 text-xs text-neutral-400 leading-6">
              {service.advisor} &nbsp;&middot;&nbsp; Deliverable:{" "}
              {service.deliverable}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[22px] border border-black/8 bg-white p-8"
          >
            <InlineInquiryForm service={service} />
          </motion.div>
        </div>
      </section>

      {/* ── Footer Nav ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 px-6 md:px-24 flex items-center gap-6"
      >
        <Link
          href="/services"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-900 transition-colors"
        >
          All specialist engagements
        </Link>
        <span className="text-neutral-200">·</span>
        <Link
          href="/pricing"
          className="text-sm text-neutral-500 underline underline-offset-4 hover:text-neutral-900 transition-colors"
        >
          View membership
        </Link>
      </motion.div>
    </main>
  );
}
