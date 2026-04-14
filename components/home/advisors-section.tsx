"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ADVISORS, type Advisor } from "@/lib/advisor-data";

const BIO_LIMIT = 120;

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + "...";
}

const jude = ADVISORS.find((a) => a.slug === "jude-addo");
const nonJude = ADVISORS.filter((a) => a.slug !== "jude-addo");
const defaultDisplay: Advisor[] = jude
  ? [jude, ...nonJude.slice(0, 2)]
  : ADVISORS.slice(0, 3);

function AdvisorRow({ advisor }: { advisor: Advisor }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-10 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative w-full aspect-4/3 max-w-[280px] bg-gray-200 rounded-2xl overflow-hidden shrink-0">
        {!imgError && advisor.image ? (
          <Image
            src={advisor.image}
            alt={advisor.name}
            fill
            sizes="280px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 max-w-xs pt-1">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {advisor.name}
          </h3>
          <p className="text-sm font-semibold text-gray-900 mt-0.5">
            {advisor.title}
          </p>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          {truncate(advisor.experience, BIO_LIMIT)}
        </p>
        <Link
          href={`/advisors/${advisor.slug}`}
          className="text-sm font-semibold text-gray-900 hover:underline"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export function AdvisorsSection() {
  const [displayAdvisors, setDisplayAdvisors] =
    useState<Advisor[]>(defaultDisplay);

  // Randomise the two supporting advisors after hydration (stable on server, new random on each page load)
  useEffect(() => {
    const shuffled = nonJude
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    setDisplayAdvisors(jude ? [jude, ...shuffled] : shuffled.slice(0, 3));
  }, []);

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* LEFT: sticky heading block */}
          <div className="lg:sticky lg:top-28 pt-10">
            <p className="text-xs font-bold tracking-widest text-gray-900 mb-4">
              Expert Guidance
            </p>
            <h2 className="font-cirka text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
              Meet the people behind the guidance
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              Each brings years of experience and a genuine commitment to
              understanding your situation.
            </p>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-gray-300 text-gray-900 hover:bg-gray-100 px-6"
            >
              <Link href="/advisors">Meet all Advisors</Link>
            </Button>
          </div>

          {/* RIGHT: scrolling advisor list */}
          <div className="divide-y divide-gray-100">
            {displayAdvisors.map((advisor) => (
              <AdvisorRow key={advisor.slug} advisor={advisor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
