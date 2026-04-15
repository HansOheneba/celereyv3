"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
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
  hoverScale = 1.02,
  hoverY = -4,
  transition,
  ...props
}: InteractiveImageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
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