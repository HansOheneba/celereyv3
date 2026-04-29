"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowDownToLine, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  InteractiveImage,
  Reveal,
  useSkipEntranceOnBackForward,
} from "@/components/motion/reveal";

type StoryItem = {
  kind: "story";
  title: string;
  description: string;
  image: string;
  href: string;
  date?: string;
  tags?: string[];
};

type InsightsItem = {
  kind: "insights";
  title: string;
  description: string;
  image: string;
  pdfHref: string;
  meta?: string;
  date?: string;
  tags?: string[];
};

type PodcastItem = {
  kind: "podcast";
  title: string;
  description: string;
  embedId: string;
  date?: string;
  tags?: string[];
};

type TabKey = "story" | "insights" | "podcasts";
type ContentItem = StoryItem | InsightsItem | PodcastItem;

const storyPosts: StoryItem[] = [
  {
    kind: "story",
    title: "The Future of Wealth Management",
    description:
      "How AI and human expertise are reshaping the way financial guidance is delivered and experienced.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    href: "/resources/stories",
    date: "2026-01-10",
    tags: ["Advisory", "AI", "Strategy"],
  },
  {
    kind: "story",
    title: "Building a Personalised Investment Strategy",
    description:
      "A practical guide to building an investment framework that fits your life, goals, and risk tolerance.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    href: "/resources/stories",
    date: "2026-01-18",
    tags: ["Investing", "Planning"],
  },
  {
    kind: "story",
    title: "Behavioral Finance: The Hidden Psychology Behind Wealth",
    description:
      "Exploring the psychological factors that influence financial decision-making and wealth-building behaviors.",
    image:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=1200&q=80",
    href: "/resources/stories",
    date: "2026-01-18",
    tags: ["Investing", "Planning"],
  },
];

const insightItems: InsightsItem[] = [
  {
    kind: "insights",
    title: "2026 Market Outlook",
    description:
      "A forward-looking analysis of the global investment landscape as economies move from volatility toward gradual normalization. Covers inflation, rate cuts, AI impact, and portfolio strategy.",
    image:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/16e66a77-434f-4338-98b4-8f1119d107a9/MO2026.png?format=2500w",
    pdfHref: "https://www.celerey.co/s/2026-Market-Outlook-Celerey.pdf",
    date: "2026-02-01",
    tags: ["Outlook", "Macro"],
  },
  {
    kind: "insights",
    title: "Q4 Economic Update 2025",
    description:
      "A concise overview of key economic developments in Q4 2025, covering inflation trends, interest-rate expectations, and practical considerations for portfolio positioning into 2026.",
    image:
      "https://images.squarespace-cdn.com/content/v1/65ba13d52ed18742d3b5c312/a27958d7-f330-426f-ba9e-028e4d32e4ff/Q4.png?format=2500w",
    pdfHref: "https://www.celerey.co/s/Q4-Economic-Update-2025-Celerey.pdf",
    date: "2026-01-22",
    tags: ["Risk", "Framework"],
  },
];

const podcastItems: PodcastItem[] = [
  {
    kind: "podcast",
    title:
      "What Surviving a Plane Crash Teaches You About Risk | Francis Gyechie",
    description:
      "Francis Gyechie — education leader, institution builder, founder, and father of four — survived a plane crash landing. And what that experience gave him was something no boardroom, business school, or financial model ever could: a completely different understanding of what risk really means.",
    embedId: "B5-jYW4fj6g",
    date: "2026-02-10",
    tags: ["Wealth", "Strategy"],
  },
  {
    kind: "podcast",
    title:
      "From Breaking Things to Building Financial Systems | Tarek Mouganie, PhD (Affinity Africa)",
    description:
      "In this episode of CelereyPod, we sit down with Tarek Mouganie, PhD, Founder of Affinity Africa, for a thoughtful and deeply reflective conversation on building, risk, and rethinking financial systems.",
    embedId: "tgRSVw5Dtq8",
    date: "2026-01-28",
    tags: ["Markets", "Investing"],
  },
  {
    kind: "podcast",
    title: "Meet the Hosts of The Celerey Pod",
    description:
      "In this episode, we’re introducing the hosts and sharing the vision behind the podcast. Celerey Pod is a space for thoughtful conversations around wealth planning, business strategy, entrepreneurship, risk, and the decisions that shape our professional and personal lives.",
    embedId: "ud7hy_mf3JE",
    date: "2026-01-15",
    tags: ["Mindset", "Freedom"],
  },
];

function dateLine(d?: string): string | null {
  if (!d) return null;
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InsightsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("podcasts");
  const skipEntrance = useSkipEntranceOnBackForward();

  const content: ContentItem[] =
    activeTab === "story"
      ? storyPosts
      : activeTab === "insights"
        ? insightItems
        : podcastItems;

  const tabLabel = (tab: TabKey) => {
    if (tab === "story") return "Stories";
    if (tab === "insights") return "Insights";
    return "Podcasts";
  };

  const isPodcastTab = activeTab === "podcasts";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-360 px-6 py-20 md:py-24">
        {/* Header */}
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="mb-4 text-gray-900">
            Thoughtful guidance for your future
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ideas worth considering as you shape what comes next.
          </p>

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8">
            {(["podcasts", "story", "insights"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative text-base md:text-lg font-medium pb-2 transition-colors",
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900",
                )}
              >
                {tabLabel(tab)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="insights-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900/70 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "grid grid-cols-1 gap-x-12 gap-y-16",
                isPodcastTab ? "md:grid-cols-3" : "md:grid-cols-3 gap-x-16",
              )}
            >
              {content.map((item, index) => {
                if (item.kind === "podcast") {
                  return (
                    <motion.article
                      key={`podcast-${item.embedId}`}
                      initial={skipEntrance ? false : { opacity: 0, y: 18 }}
                      whileInView={
                        skipEntrance ? undefined : { opacity: 1, y: 0 }
                      }
                      transition={{ delay: index * 0.06, duration: 0.45 }}
                      viewport={{ once: true }}
                    >
                      {/* YouTube embed */}
                      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.embedId}`}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="w-full h-full border-0"
                        />
                      </div>

                      {/* Text */}
                      <div className="mt-5">
                        <h3 className="text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </motion.article>
                  );
                }

                const href = item.kind === "story" ? item.href : item.pdfHref;
                const isExternal = item.kind === "insights";

                return (
                  <motion.article
                    key={`${item.kind}-${item.title}-${index}`}
                    initial={skipEntrance ? false : { opacity: 0, y: 18 }}
                    whileInView={
                      skipEntrance ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link
                      href={href}
                      className="block"
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                    >
                      {/* Image */}
                      <InteractiveImage className="relative w-full aspect-4/3 overflow-hidden h-80 rounded-2xl bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-70" />

                        {item.kind === "insights" && (
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/85 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur">
                            <FileText className="w-4 h-4" />
                            {item.meta ?? "PDF"}
                          </div>
                        )}
                      </InteractiveImage>

                      {/* Text */}
                      <div className="mt-6">
                        {dateLine(item.date) && (
                          <span className="text-sm text-gray-500">
                            {dateLine(item.date)}
                          </span>
                        )}
                        <h3 className="mt-2 text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-gray-600 leading-relaxed line-clamp-3 max-w-xl">
                          {item.description}
                        </p>

                        {item.tags?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {item.kind === "story" && (
                          <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            Read story <span aria-hidden>&#8594;</span>
                          </div>
                        )}

                        {item.kind === "insights" && (
                          <div className="mt-5 text-gray-900/70 text-sm font-medium inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            Download PDF <ArrowDownToLine className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {item.kind === "insights" && (
                      <div className="mt-4">
                        <a
                          href={item.pdfHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900/80 hover:text-gray-900 transition-colors"
                        >
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View More */}
        <motion.div
          initial={skipEntrance ? false : { opacity: 0, y: 12 }}
          whileInView={skipEntrance ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <Button variant={"outline"}> View all resources</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
