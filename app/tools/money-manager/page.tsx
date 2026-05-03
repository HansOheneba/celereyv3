import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import MoneyManager from "./mmComponents/money-manager";

export default function MoneyManagerPage() {
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
            CELEREY TOOLS &mdash; 03
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-neutral-900">
            Money Manager
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-500">
            Stop managing money in fragments. Bring your income, expenses, and
            net worth into a single coherent view so you always know where you
            stand.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px]">
            <div className="relative h-72 w-full sm:h-96 lg:h-[26rem]">
              <Image
                src="/life-sit.jpg"
                alt="Your full financial picture in one place"
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
        <MoneyManager />
      </section>
    </main>
  );
}
