import { insights } from "@/lib/insights";
import { notFound } from "next/navigation";
import { renderContent } from "@/lib/render-content";
import type { Metadata } from "next";
import ArticleLayout from "@/components/blog/article-layout";

export async function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return notFound();

  const htmlContent = await renderContent(post.content);

  return (
    <ArticleLayout
      post={post}
      backHref="/resources/stories"
      backLabel="Stories"
    />
  );
}
