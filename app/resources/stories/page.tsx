"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { insights } from "@/lib/insights";
import { Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const ITEMS_PER_PAGE = 10;

export default function StoriesPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return insights
      .filter((post) => {
        const matchesSearch =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q);

        const matchesTag = !activeTag || post.tags.includes(activeTag);

        return matchesSearch && matchesTag;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = (): (number | "...")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <main className="max-w-360 mx-auto min-h-screen px-6">
      {/* ── Hero header ─────────────────────────────────────────── */}
      <section className="md:pt-20 pt-10 pb-6  ">
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
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
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
                    className="h-10 px-4 border-black/10 bg-white text-sm text-neutral-700 justify-between min-w-32.5"
                  >
                    <span>{activeTag ?? "Filter by tag"}</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>Filter by tag</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setActiveTag(null);
                      setCurrentPage(1);
                    }}
                  >
                    All
                  </DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={() => {
                        setActiveTag(tag);
                        setCurrentPage(1);
                      }}
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
                onClick={() => {
                  setActiveTag(null);
                  setCurrentPage(1);
                }}
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
                  onClick={() => {
                    setActiveTag(activeTag === tag ? null : tag);
                    setCurrentPage(1);
                  }}
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
      <div className=" pt-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px]">
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
                    setCurrentPage(1);
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
            {paginated.length > 0 && (
              <div className="grid gap-10 sm:grid-cols-2">
                {paginated.map((post) => (
                  <Link
                    key={post.id}
                    href={`/resources/stories/${post.slug}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="mt-4 space-y-3">
                      {/* Tag */}
                      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                        {post.tags[0]}
                      </p>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl text-neutral-900 leading-snug group-hover:text-[#b07d3d] transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Optional "Read more" */}
                      <p className="text-sm text-[#b07d3d] opacity-0 group-hover:opacity-100 transition">
                        Read more
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center w-full">
                <Pagination className="w-auto mx-0">
                  <PaginationContent className="gap-1 flex-wrap justify-center">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        className="rounded-none h-8 w-8 sm:h-10 sm:w-auto sm:px-4 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {getVisiblePages().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "..." ? (
                          <span className="px-2 text-neutral-400 text-sm">
                            ...
                          </span>
                        ) : (
                          <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            className={cn(
                              "rounded-none h-8 w-8 sm:h-10 sm:w-10",
                              page === currentPage &&
                                "border-primary! border-0 border-b-2 bg-transparent! shadow-none!",
                            )}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        className="rounded-none h-8 w-8 sm:h-10 sm:w-auto sm:px-4 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block space-y-10 sticky top-26 self-start">
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
