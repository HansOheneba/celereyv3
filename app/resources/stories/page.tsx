"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { insights } from "@/lib/insights";
import { Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

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
  const [showTags, setShowTags] = useState(false);

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
      <section className="md:pt-20 pt-10 pb-6 px-4 sm:px-6 lg:px-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[10px] tracking-[0.26em] text-[#b07d3d] uppercase">
            Stories
          </p>

          <h1 className="mt-3 font-serif font-thin text-2xl leading-snug text-neutral-900 sm:text-4xl">
            Perspectives on wealth and clarity
          </h1>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-500 max-w-md mx-auto">
            In-depth writing on financial decisions and life transitions.
          </p>

          <div className="flex items-center justify-center mt-5 gap-2">
            {/* Search */}
            <div className="flex gap-2 max-w-md mx-auto sm:mx-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-black/10 bg-white pl-9 pr-8 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <button className="hidden sm:block h-10 px-4 rounded-lg bg-[#160b35] text-white text-sm">
                Search
              </button>
            </div>

            {/* Mobile Tag Dropdown - Using shadcn DropdownMenu */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 px-4 border-black/10 bg-white text-sm text-neutral-700 justify-between min-w-[130px]"
                  >
                    <span>{activeTag ?? "Filter by tag"}</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>Filter by tag</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTag(null)}>
                    All
                  </DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop Tags */}
          <div className="mt-6 max-w-2xl mx-auto hidden sm:block">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setActiveTag(null)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium",
                  activeTag === null
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-black/10 bg-white text-neutral-600",
                )}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium",
                    activeTag === tag
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-black/10 bg-white text-neutral-600",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="h-px bg-black/6 mx-4 sm:mx-6 lg:mx-24" />

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-24 pt-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
          {/* ── Left ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] tracking-[0.26em] text-neutral-400 uppercase">
                {activeTag
                  ? `Tagged: ${activeTag}`
                  : query
                    ? `Results for "${query}"`
                    : "Recent stories"}
              </p>

              {(query || activeTag) && (
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                  className="text-xs text-[#b07d3d]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Empty */}
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-serif text-lg text-neutral-400">
                  No stories found.
                </p>
              </div>
            )}

            {/* Cards */}
            {filtered.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/resources/stories/${post.slug}`}
                    className="group relative block overflow-hidden rounded-2xl aspect-[4/3]"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
                    />

                    {/* STRONGER overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Tag */}
                    <span className="absolute top-3 left-3 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[10px] text-white uppercase">
                      {post.tags[0]}
                    </span>

                    {/* Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <h3 className="font-serif text-sm sm:text-base text-white leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[13px] text-white/85 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
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
