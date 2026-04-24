"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { insights } from "@/lib/insights";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const allTags = Array.from(new Set(insights.flatMap((p) => p.tags))).sort();

const featuredPosts = insights.filter((p) =>
  ["1", "2", "3", "4"].includes(p.id),
);

const latestPosts = [...insights]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4);

export default function StoriesPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return insights.filter((post) => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <main className="bg-[#fbfaf8] min-h-screen">
      {/* ── Hero header ─────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6 lg:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] tracking-[0.26em] text-[#b07d3d] uppercase">
            Stories
          </p>
          <h1 className="mt-4 font-serif font-thin text-4xl leading-[1.3] text-neutral-900 sm:text-5xl">
            Perspectives on wealth and clarity
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            In-depth writing on financial decisions, life transitions, and what
            it takes to build and preserve wealth.
          </p>

          {/* Search */}
          <div className="mt-8 flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search stories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 w-full rounded-xl border border-black/10 bg-white pl-10 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => {}}
              className="h-11 px-5 rounded-xl bg-[#160b35] text-white text-sm font-medium hover:bg-[#160b35]/90 transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* Tag filter — horizontal scroll, never wraps */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                activeTag === null
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-black/10 bg-white text-neutral-600 hover:border-neutral-400",
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  activeTag === tag
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-black/10 bg-white text-neutral-600 hover:border-neutral-400",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-black/6 mx-6 lg:mx-24" />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="px-6 lg:px-24 pt-10 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">

          {/* ── Left: article grid ── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] tracking-[0.26em] text-neutral-400 uppercase">
                {activeTag
                  ? `Tagged: ${activeTag}`
                  : query
                    ? `Results for &ldquo;${query}&rdquo;`
                    : "Recent stories"}
              </p>
              {(query || activeTag) && (
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                  className="text-xs text-[#b07d3d] hover:underline underline-offset-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-neutral-400">
                  No stories found.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                  className="mt-4 text-sm text-[#b07d3d] hover:underline underline-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Cards — image overlay style */}
            {filtered.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/resources/stories/${post.slug}`}
                    className="group relative block overflow-hidden rounded-2xl aspect-4/3"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
                    />
                    {/* dark gradient for text legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Tag chip */}
                    <span className="absolute top-3 left-3 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-white uppercase tracking-wide">
                      {post.tags[0]}
                    </span>

                    {/* Text at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-serif text-sm text-white leading-snug line-clamp-2 sm:text-base">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 text-[11px] text-white/65 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      {/* <p className="mt-3 text-[11px] text-white/50">
                        {new Date(post.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p> */}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <aside className="hidden lg:block space-y-10">

            {/* Featured */}
            <div>
              <p className="text-[11px] tracking-[0.26em] text-neutral-400 uppercase mb-5 pb-3 border-b border-black/6">
                Featured
              </p>
              <div className="space-y-5">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/resources/stories/${post.slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="relative w-16 h-12 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* <p className="text-[10px] text-neutral-400">
                        {new Date(post.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p> */}
                      <h4 className="mt-0.5 font-serif text-sm text-neutral-900 leading-snug line-clamp-2 group-hover:text-[#b07d3d] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest */}
            <div>
              <p className="text-[11px] tracking-[0.26em] text-neutral-400 uppercase mb-5 pb-3 border-b border-black/6">
                Latest
              </p>
              <div className="space-y-5">
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/resources/stories/${post.slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="relative w-16 h-12 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* <p className="text-[10px] text-neutral-400">
                        {new Date(post.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p> */}
                      <h4 className="mt-0.5 font-serif text-sm text-neutral-900 leading-snug line-clamp-2 group-hover:text-[#b07d3d] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
