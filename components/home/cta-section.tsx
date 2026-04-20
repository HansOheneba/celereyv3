"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/reveal";

type EmailSaveResult = {
  ok: boolean;
  data: { success?: boolean; duplicate?: boolean; error?: string };
};

export function CTASection() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<"email" | "done">("email");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [nameStatus, setNameStatus] = useState<"idle" | "loading">("idle");

  const emailSaveRef = useRef<Promise<EmailSaveResult> | null>(null);

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setDialogOpen(true);

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
      const saveResult = emailSaveRef.current
        ? await emailSaveRef.current
        : null;

      if (saveResult?.data?.duplicate) {
        toast.info("You’re already on the list. We’ll keep you updated.");
        setDialogOpen(false);
        setStep("done");
        return;
      }

      if (saveResult && !saveResult.ok && !saveResult.data?.success) {
        toast.error(
          saveResult.data?.error ??
            "Failed to save your email. Please try again.",
        );
        setDialogOpen(false);
        setStep("email");
        return;
      }

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
          ? `Welcome, ${name.trim()}!`
          : "You’re in. Welcome to Celerey.",
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setNameStatus("idle");
    }
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open && nameStatus !== "loading") {
      setDialogOpen(false);
      setStep("done");
    }
  }

  return (
    <section className="py-24 px-6 bg-primary text-background">
      <Reveal className="mx-auto max-w-4xl text-center">
        {/* KEEPING YOUR ORIGINAL COPY */}
        <h2 className="text-3xl font-light leading-tight mb-6 sm:text-4xl md:text-5xl">
          You don&apos;t have to figure it all out alone
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
          Start building your financial future with clarity today. Let&apos;s
          turn confusion into confidence.
        </p>

        {/* Secondary CTA (kept subtle, no competition) */}
        <div className="flex justify-center mb-14">
          <Button
            variant="ghost"
            asChild
            className="text-background/70 hover:text-background"
          >
            <Link href="/resources">Explore resources</Link>
          </Button>
        </div>

        {/* NEWSLETTER (soft glass, no harsh white block) */}
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <h3 className="text-2xl font-medium mb-2">
              Get smarter about your money today
            </h3>

            <p className="text-sm text-background/70 mb-6">
              Practical insights to help guide you in your financaial journey.
            </p>

            {step === "email" && (
              <form
                autoComplete="on"
                onSubmit={handleEmailSubmit}
                className="flex flex-col items-center sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 bg-white/10 border-white/10 text-background placeholder:text-background/50 focus-visible:ring-white/30"
                />

                <Button type="submit" className="">
                  Join
                </Button>
              </form>
            )}

            {step === "done" && (
              <p className="text-sm text-background/70">
                {name.trim()
                  ? `Welcome, ${name.trim()}. You’re on the list.`
                  : "You’re on the list. Welcome aboard."}
              </p>
            )}

            <p className="mt-4 text-xs text-background/50">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Reveal>

      {/* NAME DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md w-[92vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>Almost there</DialogTitle>
            <DialogDescription>What should we call you?</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNameSubmit}>
            <div className="py-2">
              <Input
                type="text"
                name="name"
                autoComplete="given-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={nameStatus === "loading"}
              />
            </div>

            <DialogFooter className="mt-2 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="ghost"
                disabled={nameStatus === "loading"}
                onClick={() => handleDialogOpenChange(false)}
              >
                Skip
              </Button>

              <Button type="submit" disabled={nameStatus === "loading"}>
                {nameStatus === "loading" ? "Saving..." : "Finish"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
