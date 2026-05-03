"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

type FooterLink = { href: string; label: string };

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections: FooterSection[] = [
    {
      title: "Tools",
      links: [
        { href: "/tools/budget-planner", label: "Budget Planner" },
        { href: "/tools/money-manager", label: "Simple Money Manager" },
        {
          href: "/tools/savings-calculator",
          label: "Savings Goals Calculator",
        },
        { href: "/tools", label: "Explore all tools" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "Who we are" },
        { href: "/advisors", label: "Our advisors" },
        { href: "/services", label: "What we help with" },
        { href: "/pricing", label: "Pricing" },
        { href: "/financial-wellbeing", label: "Financial wellbeing" },
        { href: "/resources", label: "Resources" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/free-consultation", label: "Book a free consultation" },
        { href: "/contact", label: "Help & support" },
        { href: "/faqs", label: "FAQs" },
        { href: "/privacy", label: "Privacy policy" },
        { href: "/terms", label: "Terms of service" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-transparent pt-5">
      <div className="mx-auto w-full px-4">
        <div className="relative overflow-hidden rounded-2xl max-w-360 mx-auto bg-primary text-white shadow-[0_30px_110px_rgba(0,0,0,0.22)]">
          {/* Subtle wash */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.10),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(99,102,241,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_90%,rgba(168,85,247,0.14),transparent_55%)]" />

          {/* INNER: reduce empty space by making content occupy the width */}
          <div className="relative mx-auto w-full max-w-360 px-10 py-20 sm:py-24">
            <div className="grid gap-16 lg:grid-cols-[1fr_2.2fr] lg:items-start">
              {/* Brand */}
              <div className="max-w-xs">
                <Link href="/" className="inline-flex items-center gap-3">
                  <Image
                    src="/logos/logoWhite.png"
                    alt="Celerey Logo"
                    width={140}
                    height={44}
                    priority
                    className="w-24 h-auto"
                  />
                </Link>
                <p className="mt-4 text-white/70">
                  Democratizing financial guidance through simple tools and
                  expert advice. Start with a quick scan, explore tools, or talk
                  to our team when you need clarity.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/contact">
                    <Button
                      variant={"outline"}
                      className="hover:bg-white/20 border-white hover:text-white w-full"
                    >
                      Chat with us
                    </Button>
                  </Link>
                  <Link href="/#wealth-scan">
                    <Button className="bg-white text-primary hover:bg-gray-200 hover:text-primary/70 w-full">
                      Take Free Financial Scan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Links — 4 columns on desktop */}
              <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
                {sections.map((sec) => (
                  <div key={sec.title}>
                    <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                      {sec.title}
                    </p>

                    <ul className="mt-5 space-y-3 text-sm text-white/70">
                      {sec.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="transition hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                    Contact
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-white/70">
                    <p>
                      <Link
                        href="/contact"
                        className="underline underline-offset-4 text-white/60 hover:text-white"
                      >
                        Contact Celerey
                      </Link>
                    </p>
                    <p>
                      <a
                        href="mailto:info@celerey.co"
                        className="underline underline-offset-4 text-white/60 hover:text-white"
                      >
                        info@celerey.co
                      </a>
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="https://www.linkedin.com/company/celerey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on LinkedIn"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/celerey.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on Instagram"
                      title="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </Link>

                    <Link
                      href="https://wa.me/12272296921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center rounded-full border border-white/14 bg-white/6 px-4 text-sm font-medium text-white/85 transition hover:border-white/22 hover:bg-white/10"
                      aria-label="Celerey on WhatsApp"
                      title="WhatsApp"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              <p className="text-white">
                © {currentYear} Celerey. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href="/terms" className="transition hover:text-white">
                  Terms
                </Link>
                <span className="hidden text-white/30 sm:inline">•</span>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy
                </Link>
                <span className="hidden text-white/30 sm:inline">•</span>
                <Link href="/faqs" className="transition hover:text-white">
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* tiny breathing room below footer block */}
        <div className="h-2" />
      </div>
    </footer>
  );
}
