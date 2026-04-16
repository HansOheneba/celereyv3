"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-24 bg-[#FFF4F4]">
      <div className="mx-auto flex flex-col gap-12 md:flex-row md:px-24">
        {/* Heading */}
        <Reveal className="text-center md:text-left">
          <h2 className="font-cirka text-3xl md:text-5xl font-light leading-tight mb-6 sm:text-4xl">
            Most people don't need more financial noise. <br />
            They need clarity.
          </h2>
        </Reveal>

        {/* Content wrapper */}
        <div className="flex flex-col gap-10">
          {/* Intro text */}
          <Reveal delay={0.1} amount={0.4} distance={15}>
            <p className="text-base text-center md:text-left">
              The right guidance cuts through complexity and helps you see what
              actually matters for your situation.
            </p>
          </Reveal>

          {/* 2-column section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Simple */}
            <Reveal delay={0.15} amount={0.4}>
              <div className="text-center md:text-left">
                <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                  Simple
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  We explain things in plain language, not jargon or sales
                  speak.
                </p>
              </div>
            </Reveal>

            {/* Honest */}
            <Reveal delay={0.2} amount={0.4}>
              <div className="text-center md:text-left">
                <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                  Honest
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  We tell you what we think, not what we think you want to hear.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Buttons */}
          <Reveal delay={0.25} amount={0.4}>
            <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-6 pt-6">
              <a href="/learn">
                <Button variant="outline" className="px-10 w-full sm:w-auto">
                  Learn
                </Button>
              </a>

              <a
                href="/explore"
                className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
              >
                Explore
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
