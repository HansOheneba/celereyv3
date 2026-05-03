"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type BeginJourneyValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeZone: string;
  agree: boolean;
};

type BeginJourneyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentUrl?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
};

export function BeginJourneyModal({
  open,
  onOpenChange,
  paymentUrl,
  title = "Begin Your Journey",
  subtitle = "Enter your details to get started",
  ctaLabel = "Continue",
}: BeginJourneyModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [values, setValues] = React.useState<BeginJourneyValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timeZone: "",
    agree: false,
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [locationInput, setLocationInput] = React.useState("");

  const resetAll = React.useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setTouched({});
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      timeZone: "",
      agree: false,
    });
    setLocationInput("");
  }, []);

  // When modal closes, reset to form for next open
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => resetAll(), 150);
      return () => clearTimeout(t);
    }
  }, [open, resetAll]);

  const setField = <K extends keyof BeginJourneyValues>(
    key: K,
    value: BeginJourneyValues[K],
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const markTouched = (key: keyof BeginJourneyValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
    setField("timeZone", value);
  };

  const errors = React.useMemo(() => {
    const e: Partial<Record<keyof BeginJourneyValues, string>> = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Enter a valid email";
    if (!values.phone.trim()) e.phone = "Phone number is required";
    if (!values.timeZone.trim()) e.timeZone = "Location is required";
    if (!values.agree) e.agree = "You must agree to continue";
    return e;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting;

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);

    Object.keys(values).forEach((key) => {
      markTouched(key as keyof BeginJourneyValues);
    });

    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);

      // Log to sheet + send emails (fire-and-forget — never block the redirect)
      fetch("/api/book-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          location: values.timeZone,
          paymentUrl: paymentUrl ?? "",
        }),
      }).catch(() => {
        // Silently ignore — the redirect is what matters
      });

      // Close and send user straight to Stripe
      onOpenChange(false);
      if (paymentUrl) {
        const url = new URL(paymentUrl);
        url.searchParams.set("prefilled_email", values.email);
        window.open(url.toString(), "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-180 gap-0 overflow-hidden rounded-2xl p-0">
        <div className="relative bg-white">
          {/* Close */}
          <DialogClose asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>

          <div className="px-8 py-8 sm:px-10">
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="text-neutral-900">{title}</DialogTitle>
                <p className="mt-2 text-neutral-600">{subtitle}</p>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* First + Last */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-neutral-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={values.firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      onBlur={() => markTouched("firstName")}
                      className="h-12 rounded-xl border-black/10 bg-white"
                    />
                    {touched.firstName && errors.firstName ? (
                      <p className="text-red-600">{errors.firstName}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-neutral-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={values.lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      onBlur={() => markTouched("lastName")}
                      className="h-12 rounded-xl border-black/10 bg-white"
                    />
                    {touched.lastName && errors.lastName ? (
                      <p className="text-red-600">{errors.lastName}</p>
                    ) : null}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => markTouched("email")}
                    className="h-12 rounded-xl border-black/10 bg-white"
                  />
                  {touched.email && errors.email ? (
                    <p className="text-red-600">{errors.email}</p>
                  ) : null}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-neutral-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={values.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    onBlur={() => markTouched("phone")}
                    className="h-12 rounded-xl border-black/10 bg-white"
                  />
                  {touched.phone && errors.phone ? (
                    <p className="text-red-600">{errors.phone}</p>
                  ) : null}
                </div>

                {/* Location - Simplified */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-neutral-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                    <Input
                      id="location"
                      value={locationInput}
                      onChange={handleLocationChange}
                      onBlur={() => markTouched("timeZone")}
                      placeholder="Enter your city, state, or country"
                      className="h-12 rounded-xl border-black/10 bg-white pl-10"
                    />
                  </div>
                  {touched.timeZone && errors.timeZone ? (
                    <p className="text-red-600">{errors.timeZone}</p>
                  ) : null}
                  <p className="text-neutral-500">
                    We&#39;ll use this to schedule sessions at convenient times
                    for you
                  </p>
                </div>

                {/* Agree */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agree"
                      checked={values.agree}
                      onCheckedChange={(v) => setField("agree", Boolean(v))}
                      onBlur={() => markTouched("agree")}
                      className="mt-1"
                    />
                    <Label htmlFor="agree" className="text-sm text-neutral-700">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-neutral-900"
                        target="_blank"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-neutral-900"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {touched.agree && errors.agree ? (
                    <p className="text-red-600">{errors.agree}</p>
                  ) : null}
                </div>

                {/* Error */}
                {submitError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    {submitError}
                  </div>
                ) : null}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full text-white disabled:opacity-60"
                >
                  {isSubmitting ? "Processing..." : ctaLabel}
                </Button>
              </form>
            </>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
