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
        toast.info(
          "You&apos;re already on the list! We&apos;ll keep you posted.",
        );
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
          ? `Welcome to the community, ${name.trim()}!`
          : "You&apos;re in. Welcome to the Celerey community!",
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
    <section className="py-20 px-6 bg-primary text-background">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-light leading-tight mb-6 sm:text-4xl md:text-5xl">
          You don&apos;t have to figure it all out alone
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
          Start building your financial future with clarity today. Let&apos;s
          turn confusion into confidence.
        </p>

        <div className="flex justify-center mb-12">
          <Button
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white/10 hover:text-white/90"
          >
            <Link href="/resources">Learn More</Link>
          </Button>
        </div>

        <div className="mx-auto max-w-xl">
          <p className="text-xs tracking-[0.2em] text-background/60 mb-6 uppercase">
            Join the community
          </p>

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
                className="h-10 w-full rounded-md bg-background/10 px-4 text-base text-background placeholder:text-background/50 ring-1 ring-background/20 focus:outline-none focus:ring-2 focus:ring-background/40"
              />
              <Button
                type="submit"
                variant="secondary"
              >
                Join
              </Button>
            </form>
          )}

          {step === "done" && (
            <p className="text-sm text-background/80">
              {name.trim()
                ? `Nice to meet you, ${name.trim()}. You&apos;re in.`
                : "You&apos;re in. Welcome to Celerey."}
            </p>
          )}

          <p className="mt-4 text-xs text-background/50">
            No spam. Just insights and updates. Unsubscribe anytime.
          </p>
        </div>
      </Reveal>

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-md w-[92vw] rounded-xl">
          <DialogHeader>
            <DialogTitle>Your email has been saved!</DialogTitle>
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
                className="h-12 w-full rounded-md bg-white px-4 text-base ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-blue-600/40 disabled:opacity-60"
              />
            </div>

            <DialogFooter className="mt-2 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="ghost"
                disabled={nameStatus === "loading"}
                onClick={() => handleDialogOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Skip
              </Button>
              <Button
                type="submit"
                disabled={nameStatus === "loading"}
                className="w-full sm:w-auto"
              >
                {nameStatus === "loading" ? "Saving..." : "Done"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
