"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  options: string[];
  pillar: string;
  weight: number;
}

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

interface WealthHealthData {
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

const questions: Question[] = [
  {
    question: "How steady is your monthly income?",
    options: [
      "Very steady. I can plan ahead with confidence",
      "Mostly steady. It changes sometimes but I manage",
      "It varies quite a bit from month to month",
      "It feels unpredictable and hard to rely on",
    ],
    pillar: "Income Stability",
    weight: 0.15,
  },
  {
    question:
      "How much of your income do you usually save or invest each month?",
    options: [
      "More than 25%",
      "Around 10 to 25%",
      "Less than 10%",
      "I usually spend most or all of it",
    ],
    pillar: "Spending & Saving",
    weight: 0.2,
  },
  {
    question:
      "If your main income stopped today, how long could you cover your expenses?",
    options: [
      "More than 6 months",
      "Around 3 to 6 months",
      "About 1 to 3 months",
      "Less than a month",
    ],
    pillar: "Resilience",
    weight: 0.2,
  },
  {
    question: "How would you describe your current debt situation?",
    options: [
      "I do not have any debt",
      "My debt feels manageable",
      "It is manageable but sometimes tight",
      "It feels stressful or difficult to handle",
    ],
    pillar: "Debt & Credit Health",
    weight: 0.075,
  },
  {
    question:
      "How confident do you feel about your progress toward future goals?",
    options: [
      "Very confident. I have a clear plan in place",
      "Somewhat confident but unsure if it is enough",
      "Not very confident. I need more direction",
      "I have not really started planning yet",
    ],
    pillar: "Growth Readiness",
    weight: 0.075,
  },
  {
    question: "Which best describes how you generally manage your finances?",
    options: [
      "I follow a structured plan",
      "I have ideas but nothing written down",
      "I handle things as they come up",
      "I tend to avoid thinking about it",
    ],
    pillar: "Planning & Direction",
    weight: 0.075,
  },
  {
    question:
      "When you need to borrow or use credit, how do you usually approach it?",
    options: [
      "I only borrow when necessary and have a clear plan to repay",
      "I borrow occasionally and manage repayments reasonably well",
      "I borrow more than I would like but try to keep up",
      "I rely on credit regularly and find it hard to reduce",
    ],
    pillar: "Debt & Credit Health",
    weight: 0.075,
  },
  {
    question:
      "Have you started putting money toward investments or long-term wealth building?",
    options: [
      "Yes, regularly and with a clear strategy",
      "Some, but it is not consistent or fully structured",
      "Not really, but I plan to start soon",
      "No, and I am not sure where to begin",
    ],
    pillar: "Growth Readiness",
    weight: 0.075,
  },
  {
    question:
      "How often do you review your finances, such as tracking spending or checking progress toward goals?",
    options: [
      "Regularly, at least once a month",
      "Every few months when I get around to it",
      "Rarely, usually only when something goes wrong",
      "Hardly ever or never",
    ],
    pillar: "Planning & Direction",
    weight: 0.075,
  },
];

const FOOTER_BLUE = "#160b35";

export default function WealthScanPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((step + 1) / questions.length) * 100;
  const current = questions[step];

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      setStarted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const handleSelect = (opt: string) => {
    const updated = [...answers];
    updated[step] = opt;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setShowEmailForm(true);
  };

  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const calculateScore = (): number => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = 4 - optionIndex;
      totalScore += answerValue * question.weight;
    });
    const normalized = Math.max(0, (totalScore - 1) / 3);
    const curved = Math.pow(normalized, 1.8);
    return Math.min(Math.round(15 + curved * 85), 100);
  };

  const getPillarScores = (): PillarScores => {
    const accumulator: {
      [key: string]: {
        scoreSum: number;
        count: number;
        lastAnswer: string;
        lastRawValue: number;
      };
    } = {};

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = 4 - optionIndex;
      const pillarPercentage = (answerValue / 4) * 100;

      if (!accumulator[question.pillar]) {
        accumulator[question.pillar] = {
          scoreSum: 0,
          count: 0,
          lastAnswer: answer,
          lastRawValue: answerValue,
        };
      }
      accumulator[question.pillar].scoreSum += pillarPercentage;
      accumulator[question.pillar].count++;
      accumulator[question.pillar].lastAnswer = answer;
      accumulator[question.pillar].lastRawValue = answerValue;
    });

    const pillarScores: PillarScores = {};
    Object.entries(accumulator).forEach(([pillar, data]) => {
      pillarScores[pillar] = {
        score: Math.round(data.scoreSum / data.count),
        answer: data.lastAnswer,
        rawValue: data.lastRawValue,
      };
    });
    return pillarScores;
  };

  const getScoreCategory = (score: number): ScoreCategory => {
    if (score >= 80)
      return {
        label: "Strategic Planner",
        tone: "Empowering",
        persona: "Strategist",
      };
    if (score >= 60)
      return {
        label: "Structured Achiever",
        tone: "Balanced",
        persona: "Planner",
      };
    if (score >= 40)
      return {
        label: "Building Confidence",
        tone: "Encouraging",
        persona: "Builder",
      };
    return {
      label: "Foundation Builder",
      tone: "Supportive",
      persona: "Groundbreaker",
    };
  };

  const generateRecommendations = (pillarScores: PillarScores): string[] => {
    const recommendations: string[] = [];
    const lowScoreThreshold = 50;

    Object.entries(pillarScores).forEach(([pillar, data]) => {
      if (data.score < lowScoreThreshold) {
        switch (pillar) {
          case "Income Stability":
            recommendations.push(
              "Build a larger emergency fund to handle income variability",
            );
            break;
          case "Spending & Saving":
            recommendations.push(
              "Gradually increase your savings rate by 1-2% each month",
            );
            break;
          case "Resilience":
            recommendations.push(
              "Build an emergency fund covering 3-6 months of essential expenses",
            );
            break;
          case "Debt & Credit Health":
            recommendations.push(
              "Develop a debt management strategy to reduce financial stress",
            );
            break;
          case "Growth Readiness":
            recommendations.push(
              "Create a clear investment plan aligned with your long-term goals",
            );
            break;
          case "Planning & Direction":
            recommendations.push(
              "Establish a proactive financial planning routine",
            );
            break;
        }
      }
    });

    if (recommendations.length === 0) {
      return [
        "Maintain your current healthy financial habits",
        "Consider periodic reviews to optimize your strategy",
        "Explore advanced investment opportunities",
      ];
    }
    return recommendations.slice(0, 3);
  };

  const getTopAndBottomPillars = (pillarScores: PillarScores) => {
    const sorted = Object.entries(pillarScores).sort(
      ([, a], [, b]) => b.score - a.score,
    );
    const bottom = sorted
      .filter(([, data]) => data.score < 60)
      .map(([pillar]) => pillar);
    return { top: sorted.slice(0, 2).map(([pillar]) => pillar), bottom };
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const saveLeadToDatabase = async (leadEmail: string): Promise<boolean> => {
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!base) return false;
      const response = await fetch(`${base}/leads/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, source: "wealth_scan" }),
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const score = calculateScore();
      const pillarScores = getPillarScores();
      const category = getScoreCategory(score);
      const { top, bottom } = getTopAndBottomPillars(pillarScores);

      await Promise.all([
        saveLeadToDatabase(email),
        fetch("/api/wealthscan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            score,
            categoryLabel: category.label,
            answers,
          }),
        }),
      ]);

      const data: WealthHealthData = {
        score,
        category,
        answers,
        pillarScores,
        recommendations: generateRecommendations(pillarScores),
        topPillars: top,
        bottomPillars: bottom,
        email,
        submittedAt: new Date().toISOString(),
      };

      sessionStorage.setItem("wealthHealthResults", JSON.stringify(data));
      router.push("/wealthscan/results");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ===================== */}
      {/* EMAIL MODAL */}
      {/* ===================== */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-2xl"
            >
              <div
                style={{ backgroundColor: FOOTER_BLUE }}
                className="px-6 py-5"
              >
                <h3 className="text-white">Save your results</h3>
                <p className="text-white/70 mt-1">
                  Enter your email to view your full report.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="p-6 space-y-4">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="h-12"
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowEmailForm(false)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "View results"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== */}
      {/* LANDING STATE */}
      {/* ===================== */}
      {!started ? (
        <div>
          {/* HERO */}
          <section className="pt-14 max-w-360 px-6 mx-auto sm:pt-20">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-[#5C7A6A]"
              >
                CELEREY WEALTH SCAN
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
                className="mx-auto mt-5 max-w-3xl"
              >
                Understand your financial health in minutes
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                A structured self-assessment across six financial pillars that
                shows you where you stand today, what is working, and exactly
                what to focus on next.
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
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="mx-auto mt-7 max-w-5xl overflow-hidden rounded-[28px] border border-black/10"
              >
                <motion.div
                  initial={{ scale: 1.02 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
                  className="relative"
                >
                  <div className="relative aspect-21/9 w-full">
                    <Image
                      src="/homepage/wealthscan.png"
                      alt="Wealth scan financial assessment"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* WHAT IT COVERS */}
          <section className="max-w-360 px-6 mx-auto mt-20 pb-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[#5C7A6A] mb-4">WHAT IT COVERS</p>
                <h2 className="max-w-sm">Six pillars. One clear picture.</h2>
                <p className="mt-4 text-muted-foreground max-w-md">
                  The Wealth Scan evaluates your finances across six areas that
                  together determine your true financial health. Each question
                  is weighted to reflect how much each area impacts your overall
                  position.
                </p>

                <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Income Stability",
                    "Spending & Saving",
                    "Resilience",
                    "Debt & Credit Health",
                    "Growth Readiness",
                    "Planning & Direction",
                  ].map((pillar) => (
                    <div key={pillar} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5C7A6A] shrink-0" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "See what is working",
                    body: "Understand the strengths already in your finances so you can build on them.",
                  },
                  {
                    title: "Know what to improve",
                    body: "Spot the gaps and blind spots that may be holding your progress back.",
                  },
                  {
                    title: "Get clear next steps",
                    body: "Walk away with specific, prioritised actions tailored to your results.",
                  },
                  {
                    title: "No sign up needed",
                    body: "Quick, honest, and accessible anytime. Your results are yours to keep.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/8 bg-neutral-50 p-6"
                  >
                    <p className="font-medium text-neutral-900 mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-360 px-6 mx-auto mt-16 pb-24">
            <div className="rounded-[28px] bg-primary px-8 py-14 text-center">
              <h2 className="text-white max-w-xl mx-auto">
                Ready to see where you stand?
              </h2>
              <p className="text-neutral-400 mt-4 max-w-md mx-auto">
                Takes less than 2 minutes. No account required. Your honest
                answers lead to your most useful results.
              </p>
              <Button
                onClick={handleStart}
                disabled={isStarting}
                variant="outline"
                className="mt-8 bg-white text-neutral-900 hover:bg-neutral-100 border-white h-12 px-10"
              >
                {isStarting ? "Starting..." : "Check your wealth health"}
              </Button>
            </div>
          </section>
        </div>
      ) : (
        /* ===================== */
        /* QUIZ STATE */
        /* ===================== */
        <section className="min-h-screen flex items-center py-16">
          <div className="mx-auto w-full max-w-5xl px-6">
            {/* PROGRESS */}
            <div className="mb-10">
              <Progress value={progress} className="h-2" />
              <p className="text-muted-foreground mt-2">
                Question {step + 1} of {questions.length}
              </p>
            </div>

            {/* QUESTION */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h2 className="text-center max-w-3xl mx-auto">
                {current.question}
              </h2>
            </motion.div>

            {/* OPTIONS */}
            <div className="grid gap-4 max-w-3xl mx-auto">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`p-5 rounded-xl border text-left transition ${
                    answers[step] === opt
                      ? "bg-primary text-white border-blue-900"
                      : "bg-white hover:border-blue-800"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* NAV */}
            <div className="flex justify-between mt-10 max-w-3xl mx-auto">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 0}
              >
                Back
              </Button>

              <Button onClick={handleNext} disabled={!answers[step]}>
                {step === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
