"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowDownToLine, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    title: "Building Wealth That Lasts",
    description:
      "A candid conversation about creating lasting financial security and making your money work harder for you.",
    embedId: "B5-jYW4fj6g",
    date: "2026-02-10",
    tags: ["Wealth", "Strategy"],
  },
  {
    kind: "podcast",
    title: "Navigating Markets With Confidence",
    description:
      "How to stay grounded and make sound investment decisions even during periods of uncertainty.",
    embedId: "tgRSVw5Dtq8",
    date: "2026-01-28",
    tags: ["Markets", "Investing"],
  },
  {
    kind: "podcast",
    title: "The Mindset Behind Financial Freedom",
    description:
      "Exploring the habits and beliefs that separate those who build wealth from those who don&apos;t.",
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
  const [activeTab, setActiveTab] = useState<TabKey>("story");

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
      <div className="md:px-24 mx-auto px-6 py-20 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-5xl font-light mb-4 leading-tight text-gray-900">
            Thoughtful guidance for your future
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Ideas worth considering as you shape what comes next.
          </p>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap gap-8">
            {(["story", "insights", "podcasts"] as TabKey[]).map((tab) => (
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
        </motion.div>

        {/* Grid */}
        <div className="mx-auto md:px-24">
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
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
                        {dateLine(item.date) && (
                          <span className="text-sm text-gray-500">
                            {dateLine(item.date)}
                          </span>
                        )}
                        <h3 className="mt-2 text-lg font-medium text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                        {item.tags?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
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
                      </div>
                    </motion.article>
                  );
                }

                const href = item.kind === "story" ? item.href : item.pdfHref;
                const isExternal = item.kind === "insights";

                return (
                  <motion.article
                    key={`${item.kind}-${item.title}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 520px"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-70" />

                        {item.kind === "insights" && (
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-medium text-gray-800 border border-gray-200">
                            <FileText className="w-4 h-4" />
                            {item.meta ?? "PDF"}
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="mt-6">
                        {dateLine(item.date) && (
                          <span className="text-sm text-gray-500">
                            {dateLine(item.date)}
                          </span>
                        )}
                        <h3 className="mt-2 text-xl md:text-2xl font-medium text-gray-900 line-clamp-2">
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            View more <span aria-hidden>&#8594;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
