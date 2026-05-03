"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BeginJourneyModal } from "../homepage/beginModal";

type BillingCadence = "annual" | "one-time";
type TierKey = "foundation" | "dashboard";

type Tier = {
  key: TierKey;
  label: string;
  name: string;
  price: string;
  currency: string;
  cadence: BillingCadence;

  description: string;
  bullets: string[];

  ctaLabel: string;
  paymentUrl: string;
  footnote?: string;

  emphasis?: boolean;
  highlight?: string;
};

type EntryPointPricingProps = {
  currency?: string;
  id?: string;
  tiers?: Tier[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const foundationBullets = [
  "1:1 financial coaching call (up to 45 minutes)",
  "Fast clarity on what to focus on right now (income, spending, debt, savings)",
  "A simple, realistic action plan you can follow",
  "Personalised recommendations aligned to your goals and lifestyle",
  "Written recap with your key decisions and next steps after the session",
];

const dashboardBullets = [
  "Two advisory sessions per year with a certified Celerey Advisor",
  "Quarterly progress reviews with tailored insights",
  "Monthly accountability check-ins to keep you on track",
  "Annual portfolio and financial health review",
  "Priority email and WhatsApp support",
  "Continuous portfolio intelligence highlighting risks and opportunities",
  "Member webinars, masterclasses, and partner benefits",
];

function PriceLine({
  price,
  cadence,

  isCore,
}: {
  price: string;
  cadence: BillingCadence;

  isCore: boolean;
}) {
  const cadenceText =
    cadence === "annual" ? "Billed annually" : "One-time access";

  return (
    <div className="mt-3">
      <div className="flex items-baseline gap-2">
        <span className={cn(isCore ? "text-white" : "text-neutral-900")}>
          ${price}
        </span>
      </div>

      <p className={cn("mt-2", isCore ? "text-white/70" : "text-neutral-600")}>
        {cadenceText}
      </p>
    </div>
  );
}

function FeatureList({
  bullets,
  isCore,
}: {
  bullets: string[];
  isCore: boolean;
}) {
  return (
    <ul className="mt-5 space-y-3">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1",
              isCore ? "bg-white/10 ring-white/15" : "bg-black/3 ring-black/10",
            )}
          >
            <Check
              className={cn(
                "h-4 w-4",
                isCore ? "text-white/85" : "text-neutral-900",
              )}
            />
          </span>

          <p className={cn(isCore ? "text-white/85" : "text-neutral-700")}>
            {b}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function EntryPointPricing({
  currency = "USD",
  id = "entry-pricing",
  tiers,
}: EntryPointPricingProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaymentUrl, setSelectedPaymentUrl] = useState("");
  const router = useRouter();

  const defaultTiers: Tier[] = useMemo(
    () => [
      {
        key: "dashboard",
        label: "Core",
        name: "Core (Annual)",
        price: "299.99",
        currency,
        cadence: "annual",
        description:
          "Families and professionals who want structured support, accountability, and a personalised plan to grow and protect their wealth.",
        highlight: "Your financial plan, structured and supported.",
        bullets: dashboardBullets,
        ctaLabel: "Get Started",
        paymentUrl: "https://buy.stripe.com/test_7sYdR94f86ApggXgiZ9Ve02",
        emphasis: true,
        footnote: "7-day free trial. Then billed annually. Cancel anytime.",
      },
    ],
    [currency],
  );

  const allTiers = tiers ?? defaultTiers;

  return (
    <>
      <section id={id} className="py-10 sm:py-24">
        <div className="flex flex-col items-center text-center pb-10">
          <h2 className="mt-10 text-neutral-900">Celerey Membership</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            One plan. Structured advisory, ongoing accountability, and a
            personalised strategy built around your goals.
          </p>
        </div>

        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-6xl grid-cols-1"
          >
            {allTiers.map((t) => {
              const isCore = t.key === "dashboard";

              return (
                <article
                  key={t.key}
                  className={cn(
                    "relative overflow-hidden rounded-[26px] border p-10 sm:p-12",
                    "flex flex-col",
                    isCore
                      ? "bg-primary border-white/15"
                      : "bg-white border-black/10",
                    isCore
                      ? "shadow-[0_28px_80px_rgba(0,0,0,0.22)]"
                      : "shadow-[0_18px_55px_rgba(0,0,0,0.08)]",
                  )}
                >
                  {/* subtle top glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0",
                      isCore
                        ? "bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.14),transparent_55%)]"
                        : "bg-[radial-gradient(circle_at_30%_15%,rgba(176,125,61,0.10),transparent_60%)]",
                    )}
                  />

                  {/* Body — 2-col on md+ */}
                  <div className="relative grid md:grid-cols-2 md:gap-12">
                    {/* Left: identity + price + description */}
                    <div className="flex flex-col">
                      <h3
                        className={cn(
                          isCore ? "text-white" : "text-neutral-900",
                        )}
                      >
                        {t.label}
                      </h3>

                      <PriceLine
                        price={t.price}
                        cadence={t.cadence}
                        isCore={isCore}
                      />

                      <div
                        className={cn(
                          "mt-6 h-px w-full",
                          isCore ? "bg-white/15" : "bg-black/10",
                        )}
                      />

                      <section className="mt-8">
                        <p className="text-[#b07d3d]">Ideal for:</p>
                        <p
                          className={cn(
                            "mt-3",
                            isCore ? "text-white/80" : "text-neutral-700",
                          )}
                        >
                          {t.description}
                        </p>
                      </section>

                      <div className="mt-auto pt-10">
                        <Button
                          onClick={() => {
                            if (isCore) {
                              window.open(
                                "https://celerey.app/",
                                "_blank",
                                "noopener,noreferrer",
                              );
                              return;
                            }
                            setSelectedPaymentUrl(t.paymentUrl);
                            setModalOpen(true);
                          }}
                          className={cn(
                            "w-full",
                            isCore
                              ? "bg-white text-neutral-900 hover:bg-white/90"
                              : "bg-transparent text-neutral-900 ring-1 ring-black/20 hover:bg-black/4",
                          )}
                        >
                          {t.ctaLabel}
                        </Button>
                        {t.footnote ? (
                          <p
                            className={cn(
                              "mt-4 text-center",
                              isCore ? "text-white/55" : "text-neutral-500",
                            )}
                          >
                            {t.footnote}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* Right: features */}
                    <div className="mt-10 md:mt-0">
                      <p className="text-[#b07d3d]">Features</p>
                      {t.highlight ? (
                        <p
                          className={cn(
                            "mt-3",
                            isCore ? "text-white/75" : "text-neutral-700",
                          )}
                        >
                          {t.highlight}
                        </p>
                      ) : null}
                      <FeatureList bullets={t.bullets} isCore={isCore} />
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-6xl"
          >
            <motion.div
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-3xl border border-black/10 bg-white px-10 py-10 sm:px-12 sm:py-12 shadow-[0_18px_55px_rgba(0,0,0,0.06)] text-left"
            >
              <p className="text-[#b07d3d]">BESPOKE ENGAGEMENTS</p>

              <h3 className="mt-4 text-neutral-900">
                Prefer something more tailored?
              </h3>

              <p className="mt-3 text-neutral-700">
                While our membership provides structured, ongoing guidance, some
                clients prefer focused, custom engagements built around a
                specific need. These private services are delivered with the
                same global standards, but without long-term commitment.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="/services">
                  <Button>Explore bespoke services</Button>
                </a>
                <p className="text-neutral-500">
                  Discrete. Fixed-fee. Clearly scoped.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BeginJourneyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        paymentUrl={selectedPaymentUrl}
      />
    </>
  );
}
