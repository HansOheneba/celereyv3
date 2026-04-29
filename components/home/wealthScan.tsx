"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Reveal, InteractiveImage } from "@/components/motion/reveal";

export default function WealthScan() {
  return (
    <section id="wealth-scan" className="relative   bg-muted">
      <div className="mx-auto max-w-360 py-24 md:py-32 px-6 grid items-center gap-12 md:grid-cols-2">
        {/* IMAGE (LEFT) */}
        <InteractiveImage className="relative overflow-hidden rounded-3xl aspect-4/5 md:aspect-auto md:h-130">
          <Image
            src="/homepage/wealthscan.png"
            alt="Finance planning"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </InteractiveImage>

        {/* CONTENT (RIGHT) */}
        <Reveal className="">
          <h2 className="mb-6">Not sure where to start with your finances?</h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
            A short self check-in that helps you understand where you stand
            today and what to focus on next. No pressure, just clarity on what
            matters.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 mb-10 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">
                See what’s working
              </p>
              <p className="text-muted-foreground">
                Understand the strengths already in your finances.
              </p>
            </div>

            <div>
              <p className="font-medium text-foreground mb-1">
                Know what to improve
              </p>
              <p className="text-muted-foreground">
                Spot gaps and areas that need attention.
              </p>
            </div>

            <div>
              <p className="font-medium text-foreground mb-1">
                Get clear next steps
              </p>
              <p className="text-muted-foreground">
                Walk away knowing exactly what to do next.
              </p>
            </div>

            <div>
              <p className="font-medium text-foreground mb-1">
                No sign up needed
              </p>
              <p className="text-muted-foreground">
                Quick, simple, and accessible anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild className="h-12 px-8">
              <Link href="/wealthscan">Start your assessment</Link>
            </Button>

            <p className="text-xs text-muted-foreground">
              Takes less than 2 minutes
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
