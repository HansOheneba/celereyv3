"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { insights } from "@/lib/insights";
import { Search, X, ChevronDown, ArrowRight } from "lucide-react";
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

// ── Change this ID to promote a different story ──────────────────
const FEATURED_STORY_ID = "11";

const featuredStory = insights.find((p) => p.id === FEATURED_STORY_ID)!;

const allTags = Array.from(new Set(insights.flatMap((p) => p.tags))).sort();

const latestPosts = [...insights]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4);

const ITEMS_PER_PAGE = 10;

export default function StoriesPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return insights
      .filter((post) => {
        if (post.id === FEATURED_STORY_ID) return false;

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
      {/* ── Page title ──────────────────────────────────────────── */}
      <section className="md:pt-20 pt-10 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[#b07d3d]">Stories</p>

          <h1 className="mt-3 text-neutral-900">
            Perspectives on wealth and clarity
          </h1>

          <p className="mt-2 text-neutral-500 max-w-md mx-auto">
            In-depth writing on financial decisions and life transitions.
          </p>
        </div>
      </section>

      {/* ── Featured story ──────────────────────────────────────── */}
      <section className="pb-14">
        <p className="text-neutral-400 mb-6">Featured story</p>
        <Link
          href={`/resources/stories/${featuredStory.slug}`}
          className="group grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden rounded-3xl">
            <Image
              src={featuredStory.coverImage}
              alt={featuredStory.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5">
            <span className=" w-fit text-primary/50">
              {featuredStory.tags[0]}
            </span>

            <h2 className="text-neutral-900 group-hover:text-primary transition-colors">
              {featuredStory.title}
            </h2>

            <p className="text-neutral-600 line-clamp-4 max-w-lg">
              {featuredStory.excerpt}
            </p>

            <div className="flex items-center gap-2 text-[#b07d3d]">
              <span>Read story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </section>

      <div className="h-px bg-black/6" />

      {/* ── Recent stories ──────────────────────────────────────── */}
      <div className="pt-8 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px]">
          {/* ── Left ── */}
          <div>
            {/* Section header: label + search + tag dropdown */}
            <div className="flex items-center gap-2 justify-between flex-wrap mb-6">
              <p className="text-neutral-500">
                {activeTag
                  ? `Tagged: ${activeTag}`
                  : query
                    ? `Results for "${query}"`
                    : "Recent stories"}
              </p>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-9 w-44 rounded-lg border border-black/10 bg-white pl-9 pr-8 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20"
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

                {/* Tag dropdown - all screen sizes */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 px-3 border-black/10 bg-white text-sm text-neutral-700 gap-1.5"
                    >
                      <span>{activeTag ?? "All topics"}</span>
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuLabel>Filter by topic</DropdownMenuLabel>
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
            </div>

            {/* Empty */}
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-neutral-400">No stories found.</p>
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
                      <p className="text-neutral-400">{post.tags[0]}</p>

                      {/* Title */}
                      <h3 className="text-neutral-900 group-hover:text-[#b07d3d] transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-neutral-600 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Optional "Read more" */}
                      <p className="text-[#b07d3d] opacity-0 group-hover:opacity-100 transition">
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
            {/* Latest */}
            <div>
              <p className="text-neutral-400 mb-5 pb-3 border-b border-black/6">
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
                      {/* <p className="text-neutral-400">
                        {new Date(post.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p> */}
                      <h4 className="mt-0.5 text-neutral-900 line-clamp-2 group-hover:text-[#b07d3d] transition-colors">
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
