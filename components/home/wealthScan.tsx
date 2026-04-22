"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface Question {
  question: string;
  options: string[];
  why: string;
  insight: string;
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

interface TopBottomPillars {
  top: string[];
  bottom: string[];
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
    why: "This helps us understand how stable your cash flow feels.",
    insight: "Income stability and planning flexibility.",
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
    why: "This gives a sense of how comfortably you balance today with the future.",
    insight: "Savings consistency and long term discipline.",
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
    why: "This shows how prepared you are for unexpected changes.",
    insight: "Emergency fund strength and resilience level.",
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
    why: "This helps measure how comfortable your current obligations feel.",
    insight: "Debt comfort level and financial pressure.",
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
    why: "This reflects how prepared you feel for long term goals.",
    insight: "Goal clarity and investment readiness.",
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
    why: "This shows your overall financial approach and habits.",
    insight: "Planning style and financial maturity.",
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
    why: "This helps us understand how actively you manage borrowing and credit pressure.",
    insight: "Debt behaviour and credit management habits.",
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
    why: "This gives a sense of how actively you are working toward longer-term financial goals.",
    insight: "Investment habits and long-term wealth planning.",
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
    why: "This shows how proactively you engage with your financial situation.",
    insight: "Financial review habits and self-awareness.",
    pillar: "Planning & Direction",
    weight: 0.075,
  },
];

export default function WealthScan() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      setStarted(true);
    }, 1200);
  };

  const router = useRouter();

  const progress = ((step + 1) / questions.length) * 100;
  const current = questions[step];

  // Match footer base color
  const FOOTER_BLUE = "#160b35";

  const handleSelect = (opt: string) => {
    const updated = [...answers];
    updated[step] = opt;
    setAnswers(updated);
  };

  const calculateScore = (): number => {
    let totalScore = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionIndex = question.options.indexOf(answer);
      const answerValue = 4 - optionIndex;
      totalScore += answerValue * question.weight;
    });

    // Map raw score [1, 4] to [15, 100] with a power curve for better spread
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
              "Gradually increase your savings rate by 1–2% each month",
            );
            break;
          case "Resilience":
            recommendations.push(
              "Build an emergency fund covering 3–6 months of essential expenses",
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

  const getTopAndBottomPillars = (
    pillarScores: PillarScores,
  ): TopBottomPillars => {
    const sorted = Object.entries(pillarScores).sort(
      ([, a], [, b]) => b.score - a.score,
    );
    const bottom = sorted
      .filter(([, data]) => data.score < 60)
      .map(([pillar]) => pillar);
    return {
      top: sorted.slice(0, 2).map(([pillar]) => pillar),
      bottom,
    };
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const saveLeadToDatabase = async (leadEmail: string): Promise<boolean> => {
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!base) return false;
      const apiUrl = `${base}/leads/`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, source: "wealth_scan" }),
      });

      if (!response.ok) return false;
      await response.json();
      return true;
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

      // Save to wealthscan sheet and lead database concurrently
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
      router.push("/wealth-health");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setShowEmailForm(true);
  };

  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        <p>Add questions to begin the wealth scan.</p>
      </div>
    );
  }

  return (
    <section
      id="wealth-scan"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 bg-muted"
    >
      {/* Background wash: same “family” as footer */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_90%,rgba(168,85,247,0.14),transparent_55%)]" />
      </div> */}

      <div className="relative w-full max-w-5xl">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center mb-2">
          Not Sure Where to Start With Your Finances?
        </h2>

        <p className="mx-auto my-5 max-w-2xl text-center text-sm">
          A short check-in that helps you decide what to focus on next. If you
          are not sure what to focus on, answer a few questions and you will see
          what is working, what needs attention, and what to improve next.
        </p>

        {/* Email Form Overlay */}
        <AnimatePresence>
          {showEmailForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {/* backdrop */}
              <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.30)]"
              >
                {/* subtle header tint to keep it “on brand” */}
                <div
                  style={{ backgroundColor: FOOTER_BLUE }}
                  className="px-8 py-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Save your results
                  </h3>
                  <p className="mt-1 text-sm text-white/75">
                    Enter your email and we will send you your results.
                  </p>
                </div>

                <div className="p-8">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-md"
                      required
                    />

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEmailForm(false)}
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        Not now
                      </Button>

                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "See my results"}
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      No spam. We use your email to send your results and the
                      occasional helpful note.
                    </p>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto mt-12 w-full max-w-4xl "
          >
            <div className="rounded-md bg-white shadow-md min-h-[50vh] grid md:grid-cols-2 overflow-hidden">
              <div className="hidden md:block relative">
                <img
                  src="/homepage/wealthscan.png"
                  alt="Finance planning"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-l from-black/20 to-transparent" />
              </div>
              {/* LEFT */}
              <div className="px-8 py-10 sm:px-12 sm:py-12 flex flex-col justify-center max-w-md">
                {/* Core message */}
                <p className="mt-4 text-sm text-slate-700 text-left">
                  Get a clear picture of your financial health, including how
                  stable your income is, how well you are saving, and where you
                  can improve, no sign up required.
                </p>

                {/* Light bullets */}
                <div className="mt-5 space-y-1 text-sm text-slate-600">
                  <p>• Identify your strengths</p>
                  <p>• Spot areas to improve</p>
                  <p>• Get simple next steps</p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex justify-center md:justify-start">
                  <Button
                    onClick={handleStart}
                    disabled={isStarting}
                    className="h-12 px-8"
                  >
                    {isStarting ? "Loading..." : "Start Assessment"}
                  </Button>
                </div>

                {/* Trust note */}
              </div>

              {/* RIGHT (IMAGE) */}
            </div>
          </motion.div>
        ) : (
          <div className="w-full mx-auto max-w-2xl bg-white border border-gray-100 rounded-md shadow-sm p-8">
            <Progress
              value={progress}
              className="w-full mb-8 h-2 bg-gray-200 [&>div]:bg-blue-900"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-center px-2"
              >
                <div className="min-h-18 flex items-center justify-center px-2">
                  <h3 className="md:text-lg text-base font-semibold text-blue-950 text-center">
                    {current.question}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 mb-6 w-full">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`w-full p-4 border rounded-xl text-sm transition-all duration-150 ${
                        answers[step] === opt
                          ? "border-blue-900 bg-primary text-white shadow-sm"
                          : "border-gray-300 hover:border-blue-800 hover:bg-blue-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-5 pb-2">
              <Button
                onClick={handlePrev}
                disabled={step === 0}
                variant="outline"
              >
                Previous
              </Button>

              <Button onClick={handleNext} disabled={!answers[step]}>
                {step === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
