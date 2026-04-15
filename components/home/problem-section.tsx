"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-24 bg-[#FFF4F4]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:px-24">
        {/* Heading */}
        <Reveal
          className="text-center md:text-left"
        >
          <h2 className="font-cirka text-3xl md:text-5xl font-light leading-tight mb-6 sm:text-4xl">
            Most people don't need more financial noise. <br />
            They need clarity.
          </h2>
        </Reveal>

        {/* Content wrapper */}
        <div className="flex flex-col gap-10">
          {/* Intro text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className=" text-base text-center md:text-left"
          >
            The right guidance cuts through complexity and helps you see what
            actually matters for your situation.
          </motion.p>

          {/* 2-column section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Simple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center md:text-left"
            >
              <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                Simple
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We explain things in plain language, not jargon or sales speak.
              </p>
            </motion.div>

            {/* Honest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                Honest
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We tell you what we think, not what we think you want to hear.
              </p>
            </motion.div>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-6 pt-6"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
