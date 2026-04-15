"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EmailSaveResult = {
  ok: boolean;
  data: { success?: boolean; duplicate?: boolean; error?: string };
};

export default function Community() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<"email" | "done">("email");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [nameStatus, setNameStatus] = useState<"idle" | "loading">("idle");

  // Stores the background email-save promise so name submit can await it
  const emailSaveRef = useRef<Promise<EmailSaveResult> | null>(null);

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Open dialog instantly — no waiting
    setDialogOpen(true);

    // Fire API call concurrently in the background
    emailSaveRef.current = fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
    }).then(async (res) => ({
      ok: res.ok,
      data: (await res.json()) as EmailSaveResult["data"],
    }));
  }

  async function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameStatus === "loading") return;

    setNameStatus("loading");
    try {
      // Await the background email save before proceeding
      const saveResult = emailSaveRef.current
        ? await emailSaveRef.current
        : null;

      if (saveResult?.data?.duplicate) {
        toast.info("You're already on the list! We'll keep you posted.");
        setDialogOpen(false);
        setStep("done");
        return;
      }

      if (saveResult && !saveResult.ok && !saveResult.data?.success) {
        toast.error(
          saveResult.data?.error ?? "Failed to save your email. Please try again."
        );
        setDialogOpen(false);
        setStep("email");
        return;
      }

      // Update name + trigger emails
      const res = await fetch("/api/newsletter", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setDialogOpen(false);
      setStep("done");
      toast.success(
        name.trim()
          ? `Welcome to the community, ${name.trim()}! Check your inbox for a note from us.`
          : "You're in. Welcome to the Celerey community!"
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setNameStatus("idle");
    }
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open && nameStatus !== "loading") {
      // Closed without entering name — email already saving in background
      setDialogOpen(false);
      setStep("done");
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.22em] text-neutral-600/80"
        >
          JOIN THE COMMUNITY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 font-serif text-4xl text-neutral-900 sm:text-5xl md:text-6xl"
        >
          <span className="block">Build wealth with</span>
          <span className="block italic">confidence and intention</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-2xl text-base text-neutral-700 sm:text-lg"
        >
          You&apos;ve worked hard for what you have. Now ensure it works for you.
        </motion.p>

        <div className="mx-auto mt-10 max-w-2xl">
          {step === "email" && (
            <form
              autoComplete="on"
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 flex-1 rounded-md bg-white px-5 text-sm text-neutral-900 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
              />
              <Button type="submit">Join</Button>
            </form>
          )}

          {step === "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-neutral-700"
            >
              {name.trim() ? (
                <p>Nice to meet you, {name.trim()}. You&apos;re in.</p>
              ) : (
                <p>You&apos;re in. Welcome to Celerey.</p>
              )}
            </motion.div>
          )}

          <p className="mt-4 text-xs text-neutral-500">
            No spam. Just insights and updates. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Name dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your email has been saved!</DialogTitle>
            <DialogDescription>
              What should we call you? We&apos;d love to make this a little
              more personal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNameSubmit}>
            <div className="py-2">
              <input
                type="text"
                name="name"
                autoComplete="given-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={nameStatus === "loading"}
                className="h-10 w-full rounded-md bg-white px-4 text-sm text-neutral-900 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-blue-600/40 disabled:opacity-60"
              />
            </div>

            <DialogFooter className="mt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                disabled={nameStatus === "loading"}
                onClick={() => handleDialogOpenChange(false)}
              >
                Skip
              </Button>
              <Button type="submit" disabled={nameStatus === "loading"}>
                {nameStatus === "loading" ? "Saving..." : "Done"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
