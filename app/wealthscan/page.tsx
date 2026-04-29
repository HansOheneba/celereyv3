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
    }, 1000);
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
                <p className="text-white/70 text-sm mt-1">
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
        <section className="min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* IMAGE */}
            <div className="relative h-[70vh] rounded-3xl overflow-hidden">
              <Image
                src="/homepage/wealthscan.png"
                alt="Finance planning"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* CONTENT */}
            <div>
              <h1 className="mb-6">
                Understand your financial health in minutes
              </h1>

              <p className="text-muted-foreground mb-8 text-base leading-relaxed">
                A simple self-assessment that helps you understand where you are
                today, what is working, and what to improve next.
              </p>

              <div className="space-y-3 text-sm mb-10">
                <p>• See your financial strengths</p>
                <p>• Identify gaps holding you back</p>
                <p>• Get clear next steps</p>
              </div>

              <Button onClick={handleStart} disabled={isStarting} className="">
                {isStarting ? "Starting..." : "Start check"}
              </Button>
            </div>
          </div>
        </section>
      ) : (
        /* ===================== */
        /* QUIZ STATE */
        /* ===================== */
        <section className="min-h-screen flex items-center py-16">
          <div className="mx-auto w-full max-w-5xl px-6">
            {/* PROGRESS */}
            <div className="mb-10">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
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
