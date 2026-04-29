"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ProblemSection() {
  return (
    <section className="bg-[#FFF4F4]">
      <div className="mx-auto w-full max-w-360 px-4 py-24 sm:px-6">
        {/* 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Heading */}
          <Reveal className="text-center md:text-left">
            <h2 className="">
              Most people don't need more financial noise. <br />
              They need clarity.
            </h2>
          </Reveal>

          {/* RIGHT: Content */}
          <div className="flex flex-col gap-10">
            {/* Intro text */}
            <Reveal delay={0.1} amount={0.4} distance={15}>
              <p className="text-center md:text-left">
                The right guidance cuts through complexity and helps you see
                what actually matters for your situation.
              </p>
            </Reveal>

            {/* Inner 2-column (Simple / Honest) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Simple */}
              <Reveal delay={0.15} amount={0.4}>
                <div className="text-center md:text-left">
                  <h3 className=" mb-3">
                    Simple
                  </h3>
                  <p className="text-gray-500">
                    We explain things in plain language, not jargon or sales
                    speak.
                  </p>
                </div>
              </Reveal>

              {/* Honest */}
              <Reveal delay={0.2} amount={0.4}>
                <div className="text-center md:text-left">
                  <h3 className=" mb-3">
                    Honest
                  </h3>
                  <p className="text-gray-500">
                    We tell you what we think, not what we think you want to
                    hear.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Buttons */}
            <Reveal delay={0.25} amount={0.4}>
              <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-6 pt-6">
                <a href="/resources">
                  <Button variant="outline" className="px-10 w-full sm:w-auto">
                    Learn
                  </Button>
                </a>

                <a
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
