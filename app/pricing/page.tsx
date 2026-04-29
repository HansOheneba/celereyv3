"use client";

import EntryPointPricing from "@/components/home/pricing";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="bg-[#fbfaf8]">
      {/* Preface */}
      <section className="pt-14 max-w-360 px-6 mx-auto sm:pt-20">
        <div className=" text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[11px] tracking-[0.22em] text-[#b07d3d]"
          >
            CELEREY MEMBERSHIP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mx-auto mt-5 "
          >
            At Celerey, we believe wealth is not just about money, it is about
            clarity, control, and confidence at every stage of your journey.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-7 h-px w-24 bg-neutral-900/10 origin-center"
          />

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
            className="mx-auto mt-10 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                <Image
                  src="/pricingHero.jpg"
                  alt="Celerey private advisory setting"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing component (already animated inside) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-6"
      >
        <EntryPointPricing />
      </motion.div>

      {/* Bespoke Services Cross-Link */}

      <div className="h-12 sm:h-16" />
    </main>
  );
}
