"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ADVISORS, type Advisor } from "@/lib/advisor-data";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";

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
    <Reveal className="grid items-start gap-6 border-b border-gray-100 py-10 last:border-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4">
      {/* Image */}
      <InteractiveImage className="relative w-full max-w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 shrink-0 sm:max-w-[280px]">
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
      </InteractiveImage>

      {/* Text */}
      <div className="flex max-w-none flex-col gap-3 pt-1 sm:max-w-xs">
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
    </Reveal>
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
    <section className=" bg-gray-50">
      <div className="max-w-360 py-24 px-6 mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* LEFT: sticky heading block */}
          <Reveal className="pt-2 lg:sticky lg:top-28 lg:pt-10">
            <p className="text-xs font-bold tracking-widest text-gray-900 mb-4">
              Expert Guidance
            </p>
            <h2 className="font-cirka text-3xl font-light text-gray-900 leading-tight mb-6 sm:text-4xl md:text-5xl">
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
          </Reveal>

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
