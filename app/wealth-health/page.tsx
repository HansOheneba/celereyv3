"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calendar,
} from "lucide-react";

interface PillarScore {
  score: number;
  answer: string;
  rawValue: number;
}

interface PillarScores {
  [key: string]: PillarScore;
}

interface ScoreCategory {
  label: string;
  tone: string;
  persona: string;
}

interface WealthHealthResults {
  score: number;
  category: ScoreCategory;
  answers: string[];
  pillarScores: PillarScores;
  recommendations: string[];
  topPillars: string[];
  bottomPillars: string[];
  email: string;
  submittedAt: string;
}

// Accent + supporting tones (warm-led)
const PRIMARY = "#160b35";
const TEAL = "#354A49";

type BadgeStyle = { bg: string; text: string; label: string };

// Moved outside component so it's never part of the hook call order
// Brand fade: full #160b35 → mid tint → light tint as scores drop
const getPillarColor = (score: number): string => {
  if (score >= 75) return "#160b35";
  if (score >= 50) return "#6b5b8f";
  return "#bfb8d4";
};

const getPillarBadge = (score: number): BadgeStyle => {
  if (score >= 75) return { bg: "#CDE6AF", text: "#1a3d28", label: "Strong" };
  if (score >= 50)
    return { bg: "#D7EDFF", text: "#1a3060", label: "Developing" };
  return { bg: "#FFF4F4", text: "#8b1a1a", label: "Needs attention" };
};

export default function WealthHealthPage() {
  const [results, setResults] = useState<WealthHealthResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem("wealthHealthResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        if (parsedResults.email) setResults(parsedResults);
        else router.push("/#wealth-scan");
      } catch {
        router.push("/#wealth-scan");
      }
    } else {
      router.push("/#wealth-scan");
    }
    setIsLoading(false);
  }, [router]);

  // Must be before any early returns
  const chartData = useMemo(
    () =>
      Object.entries(results?.pillarScores ?? {}).map(([pillar, data]) => ({
        name: pillar,
        score: data.score,
        color: getPillarColor(data.score),
      })),
    [results?.pillarScores],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <p className="text-neutral-700">Preparing your results...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <div className="text-center px-6">
          <p className="text-neutral-700 mb-6">No results found</p>
          <Button
            onClick={() => router.push("/#wealth-scan")}
            style={{ backgroundColor: PRIMARY, color: "white" }}
          >
            Take the Assessment
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryNarrative = (category: string) => {
    switch (category) {
      case "Strategic Planner":
        return {
          headline: "You operate with structure. Most people don&apos;t.",
          summary:
            "Your answers paint a picture of someone who has done the work. But here is the question worth sitting with: are you building on this, or simply maintaining it?",
          valueLine:
            "Stability is valuable. The people who compound wealth over time do something more deliberate with it.",
        };
      case "Structured Achiever":
        return {
          headline: "You are doing well. And you probably sense the gap.",
          summary:
            "Your answers show real consistency, alongside a few areas that are likely costing you more than they appear. Not dramatically. Quietly.",
          valueLine:
            "The most expensive gaps are the ones that feel manageable.",
        };
      case "Building Confidence":
        return {
          headline:
            "You are putting in the effort. The results feel inconsistent.",
          summary:
            "Your answers suggest real progress, alongside places where money still feels unpredictable. That feeling is not a character flaw. It is information.",
          valueLine:
            "When clarity is missing, effort gets misdirected. Structure is what turns effort into momentum.",
        };
      case "Foundation Builder":
        return {
          headline:
            "You are being honest with yourself. That already puts you ahead.",
          summary:
            "Your answers point to some core areas that feel unstable right now. That is not a judgment. It is where most people quietly live, without ever stopping to look.",
          valueLine:
            "Most people never stop to ask the questions you just answered.",
        };
      default:
        return {
          headline: "Your results point in a clear direction.",
          summary:
            "You have a mix of strengths and areas that can be strengthened with the right structure.",
          valueLine:
            "Clarity comes from seeing what matters, then addressing it in the right order.",
        };
    }
  };

  const narrative = getCategoryNarrative(results.category.label);

  const getMeaning = (pillar: string, score: number) => {
    switch (pillar) {
      case "Income Stability":
        if (score >= 75)
          return "Your income feels predictable. The next question is whether you are using that predictability to build, or simply to sustain.";
        if (score >= 50)
          return "Moderate income variability is common. But it is also one of the most common reasons financial plans quietly fall apart. Do you have a strategy for when income dips?";
        return "Unpredictable income makes almost every other financial goal harder. Not impossible, but harder. Do you have a plan that accounts for that, or are you relying on things staying steady?";
      case "Spending & Saving":
        if (score >= 75)
          return "You are creating consistent space between income and expenses. The question is whether you are directing that space intentionally, or letting it drift.";
        if (score >= 50)
          return "You have some balance, but it may not feel consistent month to month. Inconsistency here tends to compound quietly over time.";
        return "When expenses consistently meet or exceed income, there is little room for error and even less room for progress. This is usually the area to address first.";
      case "Resilience":
        if (score >= 75)
          return "You have a buffer. That is rarer than it sounds. The follow-up question is whether that buffer is working as hard as it could be.";
        if (score >= 50)
          return "Some buffer is better than none. But if an unexpected expense arrived today, would it feel manageable or destabilising?";
        return "Without a financial cushion, a single unexpected event can unravel months of effort. This is the area that makes everything else feel fragile.";
      case "Debt & Credit Health":
        if (score >= 75)
          return "Debt feels controlled from your answers. The question is whether you are optimising it, or simply managing it.";
        if (score >= 50)
          return "Debt is manageable, but may be quietly limiting options you do not even realise you have.";
        return "High or unstructured debt tends to shrink the decisions available to you. It is not just a number. It is a ceiling on what feels possible.";
      case "Growth Readiness":
        if (score >= 75)
          return "Your foundations look solid. The question is whether you have a clear strategy to put them to work, or whether growth is happening passively.";
        if (score >= 50)
          return "You are in the preparation phase. The path forward exists. It may just not feel fully defined yet.";
        return "Growth planning rarely becomes a priority until the basics feel stable. If it feels out of reach right now, that is a signal, not a verdict.";
      case "Planning & Direction":
        if (score >= 75)
          return "You have direction. That is a significant advantage. The question is whether your plan has been tested against your actual life, or whether it lives mostly in your head.";
        if (score >= 50)
          return "You have some structure, but may still find yourself reacting to situations more than you would like. That is a planning gap, not a personal one.";
        return "Without a clear financial direction, decisions tend to be made in the moment, under pressure. Clarity here tends to change how everything else feels.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* ── Cinematic hero ── */}
      <div className="relative w-full h-[62vh] sm:h-[72vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1800&q=80&auto=format&fit=crop"
          alt="Wealth health report"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#160b35]/80 via-[#160b35]/65 to-[#160b35]/95" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/45 mb-8"
          >
            FINANCIAL HEALTH REPORT
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex items-end justify-center gap-2 mb-5"
          >
            <span className="font-cirka font-thin text-[100px] sm:text-[130px] text-white leading-none">
              {results.score}
            </span>
            <span className="text-3xl text-white/35 font-thin pb-6">/100</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-cirka text-2xl sm:text-3xl text-white mb-3"
          >
            {results.category.label}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/60 max-w-lg"
            dangerouslySetInnerHTML={{ __html: narrative.headline }}
          />
        </div>
      </div>

      {/* ── Summary strip ── */}
      <div className="w-full bg-primary px-6 sm:px-12 lg:px-20 py-6">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="text-white/40 mb-1">
              ASSESSMENT COMPLETE
            </p>
            <p className="text-white">
              {results.category.label} &nbsp;&middot;&nbsp; Score:{" "}
              {results.score}/100
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {results.topPillars.slice(0, 2).map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#CDE6AF]" />
                <span className="text-sm text-white/65">{p}</span>
              </div>
            ))}
            {results.bottomPillars.slice(0, 2).map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FFF4F4]" />
                <span className="text-sm text-white/65">{p}</span>
              </div>
            ))}
          </div>

          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#354A49] hover:bg-white/90 transition-colors shrink-0"
          >
            Book free 15-min call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── 01 Summary ── */}
      <div className="w-full px-6 sm:px-12 lg:px-20 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: narrative */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-neutral-400 mb-4">
              01 &nbsp; SUMMARY
            </p>
            <h2 className="font-cirka text-3xl sm:text-4xl text-neutral-900 leading-tight mb-6">
              What your answers reveal
            </h2>

            <div className="rounded-2xl bg-[#D7EDFF] p-6 mb-6">
              <p
                className="text-neutral-800"
                dangerouslySetInnerHTML={{ __html: narrative.summary }}
              />
            </div>

            <p className="text-neutral-800 border-l-2 border-[#354A49] pl-4 mb-8">
              {narrative.valueLine}
            </p>

            <div className="space-y-3">
              <p className="text-neutral-800">
                This report does three things:
              </p>
              {[
                {
                  label: "Reflects reality",
                  body: "How stable or unstable things feel, based on your actual answers.",
                },
                {
                  label: "Reveals friction",
                  body: "The areas most likely to create stress, uncertainty, or stop-start progress.",
                },
                {
                  label: "Points direction",
                  body: "Which pillars are worth addressing first, before anything else.",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#354A49] shrink-0" />
                  <p className="text-neutral-800">
                    <span className="font-semibold text-neutral-900">
                      {item.label}:
                    </span>{" "}
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: score panel + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="rounded-2xl bg-primary p-8 text-center">
              <p className="text-white/45 mb-2">
                OVERALL SCORE
              </p>
              <div className="flex items-end justify-center gap-2 my-4">
                <span className="font-cirka text-7xl text-white font-thin">
                  {results.score}
                </span>
                <span className="text-2xl text-white/35 pb-3">/100</span>
              </div>
              <p className="text-white/70 mb-6">
                Calculated across 6 financial pillars
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    label: "Strong",
                    count: results.topPillars.length,
                    dot: "bg-[#CDE6AF]",
                  },
                  {
                    label: "Developing",
                    count: Object.values(results.pillarScores).filter(
                      (p) => p.score >= 50 && p.score < 75,
                    ).length,
                    dot: "bg-[#D7EDFF]",
                  },
                  {
                    label: "Need attention",
                    count: results.bottomPillars.length,
                    dot: "bg-white/30",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2 text-sm text-white/80">
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${stat.dot}`}
                      />
                      {stat.label}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {stat.count} of 6 pillars
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-black/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-[#354A49]" />
                <h4 className="text-sm font-semibold text-neutral-900">
                  Your strongest areas
                </h4>
              </div>
              <ul className="space-y-2">
                {results.topPillars.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm font-medium text-neutral-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#CDE6AF] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-black/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h4 className="text-sm font-semibold text-neutral-900">
                  Areas creating friction
                </h4>
              </div>
              <ul className="space-y-2">
                {results.bottomPillars.length > 0 ? (
                  results.bottomPillars.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm font-medium text-neutral-800"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFF4F4] border border-rose-200 shrink-0" />
                      {p}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-neutral-600">
                    All areas show a solid foundation.
                  </li>
                )}
              </ul>
              <p className="mt-4 text-neutral-600">
                These are signals, not labels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 02 Chart ── */}
      <div className="w-full px-6 sm:px-12 lg:px-20 py-14 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neutral-400 mb-4">
            02 &nbsp; BREAKDOWN
          </p>
          <h2 className="font-cirka text-3xl sm:text-4xl text-neutral-900 mb-2">
            Your six-area snapshot
          </h2>
          <p className="text-neutral-700 mb-8 max-w-2xl">
            Higher scores tend to feel calmer and more predictable. Lower scores
            often show up as friction, stress, or inconsistency in daily
            decisions.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-neutral-700 font-medium mb-6">
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded"
                style={{ backgroundColor: "#160b35" }}
              />
              Strong (75+)
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded"
                style={{ backgroundColor: "#6b5b8f" }}
              />
              Developing (50-74)
            </span>
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded"
                style={{ backgroundColor: "#bfb8d4" }}
              />
              Needs attention (below 50)
            </span>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={160}
                tick={{ fill: "#111827", fontWeight: 500, fontSize: 13 }}
              />
              <Tooltip
                formatter={(value) => [`${value as number}%`, "Score"]}
                cursor={{ fill: "rgba(53,74,73,0.06)" }}
              />
              <Bar dataKey="score" radius={[8, 8, 8, 8]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 rounded-2xl bg-[#D7EDFF] p-5">
            <p className="text-neutral-800">
              Patterns matter more than individual scores. If two or more areas
              sit in the lower range, they often influence each other. Income
              instability can affect saving consistency, which then affects
              resilience. Stability tends to build in layers.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Cinematic interlude ── */}
      <div className="relative w-full h-[42vh] sm:h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1800&q=80&auto=format&fit=crop"
          alt="Financial planning"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/92 to-[#354A49]/55" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-20">
          <div className="max-w-lg">
            <p className="text-white/40 mb-5">
              03 &nbsp; PERSPECTIVE
            </p>
            <p className="text-white">
              The goal is not a perfect score.
              <br />
              It is knowing which lever to pull next.
            </p>
          </div>
        </div>
      </div>

      {/* ── 04 Pillar cards ── */}
      <div className="w-full px-6 sm:px-12 lg:px-20 py-16 sm:py-20 bg-[#fafaf8]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-neutral-400 mb-4">
            04 &nbsp; DETAILED FINDINGS
          </p>
          <h2 className="font-cirka text-3xl sm:text-4xl text-neutral-900 mb-3">
            What each area suggests
          </h2>
          <p className="text-neutral-700 max-w-2xl">
            These are interpretations of your answers. Read each one carefully
            and ask yourself: does this land?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(results.pillarScores).map(([pillar, data], i) => {
            const score = data.score;
            const badge = getPillarBadge(score);
            const meaning = getMeaning(pillar, score);

            return (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-6 border border-black/5"
                style={{ backgroundColor: badge.bg }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="font-semibold text-neutral-900 text-base leading-snug">
                    {pillar}
                  </h4>
                  <span
                    className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium bg-white"
                    style={{ color: badge.text }}
                  >
                    {badge.label}
                  </span>
                </div>

                <div className="flex items-end gap-1 mb-4">
                  <span className="font-cirka text-4xl font-thin text-neutral-900">
                    {score}
                  </span>
                  <span className="text-neutral-500 pb-1">/100</span>
                </div>

                <p className="text-neutral-800">
                  {meaning}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── 05 Recommendations ── */}
      {results.recommendations.length > 0 && (
        <div className="w-full px-6 sm:px-12 lg:px-20 py-14 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-neutral-400 mb-4">
              05 &nbsp; RECOMMENDATIONS
            </p>
            <h2 className="font-cirka text-3xl sm:text-4xl text-neutral-900 mb-8">
              Where to focus next
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl bg-[#fafaf8] border border-black/5 p-5"
                >
                  <span className="font-cirka text-2xl text-[#354A49]/35 shrink-0 leading-none mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-neutral-800">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── CTA ── */}
      <div className="relative w-full overflow-hidden bg-primary px-6 sm:px-12 lg:px-20 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1800&q=80&auto=format&fit=crop"
            alt="Advisory session"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/35 mb-5">
              NEXT STEP
            </p>
            <h2 className="font-cirka text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
              Spend 15 minutes with someone who can read this with you.
            </h2>
            <p className="text-white/75">
              No pitch. No pressure. Just a clear conversation about what your
              results mean and what, if anything, is worth doing about it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/free-consultation"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-[#354A49] hover:bg-white/90 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Book free 15-min call
            </Link>

            <button
              type="button"
              onClick={() => router.push("/#wealth-scan")}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white/65 hover:text-white hover:border-white/40 transition-colors"
            >
              Retake the assessment
            </button>

            <p className="text-white/50 text-center mt-2">
              Educational report only. No financial advice is being provided.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
