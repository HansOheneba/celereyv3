"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

// ─── Back/forward navigation detection ───────────────────────────────────────
// Module-level flag: lives outside the component lifecycle so it persists
// even after home-page components unmount (when the user navigates away).
// The popstate listener fires before Next.js App Router processes the navigation,
// so the flag is set before the returning page's components mount and read it.
let _backNavPending = false;

if (typeof window !== "undefined") {
  // Browser back / forward button — covers Next.js App Router client-side history
  window.addEventListener(
    "popstate",
    () => {
      _backNavPending = true;
    },
    true,
  );

  // bfcache restore (Safari, some Chrome scenarios)
  window.addEventListener("pageshow", (e: Event) => {
    if ((e as PageTransitionEvent).persisted) _backNavPending = true;
  });
}

export function useSkipEntranceOnBackForward(): boolean {
  // useState lazy initializer runs synchronously on every component mount,
  // so all Reveal instances in the same render batch capture the same flag value.
  const [skip] = useState<boolean>(() => _backNavPending);

  useEffect(() => {
    // Reset the flag after a tick so future normal navigations get fresh
    // entrance animations. Each Reveal schedules this; it is idempotent.
    const t = setTimeout(() => {
      _backNavPending = false;
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return skip;
}

// ─────────────────────────────────────────────────────────────────────────────

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  amount?: number;
  distance?: number;
  once?: boolean;
};

type InteractiveImageProps = HTMLMotionProps<"div"> & {
  delay?: number;
  amount?: number;
  hoverScale?: number;
  hoverY?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  distance = 20,
  once = true,
  transition,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const skip = useSkipEntranceOnBackForward();
  const noEntrance = shouldReduceMotion || skip;

  return (
    <motion.div
      initial={noEntrance ? false : { opacity: 0, y: distance }}
      whileInView={noEntrance ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1], // smoother, more natural curve
        delay,
        ...transition,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveImage({
  children,
  className,
  delay = 0,
  amount = 0.2,
  hoverScale = 1.01,
  hoverY = -2,
  transition,
  ...props
}: InteractiveImageProps) {
  const shouldReduceMotion = useReducedMotion();
  const skip = useSkipEntranceOnBackForward();
  const noEntrance = shouldReduceMotion || skip;

  return (
    <motion.div
      initial={noEntrance ? false : { opacity: 0, y: 20 }}
      whileInView={noEntrance ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        shouldReduceMotion ? undefined : { scale: hoverScale, y: hoverY }
      }
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
