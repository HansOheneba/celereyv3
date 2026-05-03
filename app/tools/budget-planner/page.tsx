import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import BudgetPlanner from "./BudgetComponents/budget-planner";

export default function BudgetPlannerPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* HERO */}
      <section className="mx-auto w-full max-w-360 px-6 pt-16 pb-0 sm:pt-20">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Tools
          </Link>
          <p className="text-sm tracking-widest text-[#b07d3d]">
            CELEREY TOOLS &mdash; 01
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-neutral-900">
            Budget Planner
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-500">
            Most budgets fail because they are built on guesswork. Get a
            structured, honest breakdown of your income and spending so every
            decision is made with real numbers.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px]">
            <div className="relative h-72 w-full sm:h-96 lg:h-[26rem]">
              <Image
                src="https://images.unsplash.com/photo-1601134534909-22452bda4cde?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Planning your budget with clarity"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 1200px, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,11,53,0.3),rgba(0,0,0,0.05)_55%)]" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* TOOL */}
      <section className="py-16">
        <BudgetPlanner />
      </section>
    </main>
  );
}
