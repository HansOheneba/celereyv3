import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { insights, type Insight } from "@/lib/insights";
import ShareButtons from "@/components/blog/share-buttons";

type ArticleLayoutProps = {
  post: Insight;
  htmlContent: string;
  backHref: string;
  backLabel: string;
};

type TocItem = { text: string; id: string };

function buildTOC(markdown: string): TocItem[] {
  const toc: TocItem[] = [];

  for (const line of markdown.split("\n")) {
    const match = line.match(/^#{3}\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      toc.push({ text, id });
    }
  }

  return toc;
}

export default function ArticleLayout({
  post,
  htmlContent,
  backHref,
  backLabel,
}: ArticleLayoutProps) {
  const toc = buildTOC(post.content);

  const recommended = insights
    .filter(
      (p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, 3);

  return (
    <main className="bg-[#f8f7f5] min-h-screen">
      {/* NAV */}
      <div className="px-6 lg:px-24 pt-10 md:pt-28 pb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>
      </div>

      {/* LAYOUT */}
      <div className="px-6 lg:px-24">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-16 items-start">
          {/* MAIN CONTENT */}
          <div className="w-full mx-auto max-w-3xl">
            {/* HEADER */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-200 px-3 py-1 text-[10px] font-medium text-neutral-600 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif font-bold text-3xl leading-[1.2] text-neutral-900 sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 md:text-lg leading-relaxed text-neutral-700">
                {post.excerpt}
              </p>

              <div className="mt-6 text-sm text-neutral-500">{post.author}</div>
            </div>

            {/* IMAGE */}
            <div className="mt-10">
              <div className="relative w-full aspect-video overflow-hidden rounded-3xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* MARKDOWN CONTENT */}
            <article
              className="mt-12 prose prose-neutral max-w-none blog-article
              prose-headings:font-serif prose-headings:text-neutral-900
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
              prose-p:text-neutral-800 prose-p:leading-[1.9] prose-p:text-[1.05rem] prose-p:mb-4
              prose-a:text-[#b07d3d] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-900 prose-strong:font-semibold
              prose-hr:border-black/10 prose-hr:my-10
              prose-ul:text-neutral-800 prose-ol:text-neutral-800
              prose-li:leading-relaxed"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = text
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "")
                      .trim()
                      .replace(/\s+/g, "-");

                    return (
                      <h3
                        id={id}
                        className="scroll-mt-28 text-xl mt-10 mb-3 font-serif text-neutral-900"
                      >
                        {children}
                      </h3>
                    );
                  },

                  p: ({ children }) => (
                    <p className="text-neutral-800 leading-[1.9] text-[1.05rem] mb-6">
                      {children}
                    </p>
                  ),

                  hr: () => <hr className="my-10 border-black/10" />,

                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#b07d3d] hover:underline"
                    >
                      {children}
                    </a>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-semibold text-neutral-900">
                      {children}
                    </strong>
                  ),

                  /* ✅ FIXED LIST RENDERING */
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-3 mb-8 text-neutral-800 leading-relaxed">
                      {children}
                    </ol>
                  ),

                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-3 mb-8 text-neutral-800 leading-relaxed">
                      {children}
                    </ul>
                  ),

                  li: ({ children }) => (
                    <li className="text-[1.05rem] leading-relaxed">
                      {children}
                    </li>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* MOBILE SHARE */}
            <div className="mt-14 space-y-10 lg:hidden">
              <div className="h-px bg-black/10" />
              <ShareButtons title={post.title} />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="hidden lg:block sticky top-28 space-y-8">
            {toc.length > 0 && (
              <div>
                <p className="text-[11px] tracking-[0.26em] text-neutral-500 uppercase mb-4">
                  In this article
                </p>

                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-2 pl-3 text-sm text-neutral-600 border-l-2 border-black/10 hover:text-neutral-900 hover:border-[#b07d3d] transition-colors"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="h-px bg-black/10" />

            <ShareButtons title={post.title} />
          </aside>
        </div>
      </div>
    </main>
  );
}
