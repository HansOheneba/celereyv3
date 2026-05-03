import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getLifeSituationBySlug, lifeSituations } from "@/lib/life-situations";
import { insights } from "@/lib/insights";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return lifeSituations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const situation = getLifeSituationBySlug(slug);
  if (!situation) return {};
  return {
    title: `${situation.title} | Celerey`,
    description: situation.description,
  };
}

export default async function LifeSituationPage({ params }: PageProps) {
  const { slug } = await params;
  const situation = getLifeSituationBySlug(slug);

  if (!situation) notFound();

  const relatedInsights = insights
    .filter((ins) =>
      ins.tags.some((tag) => situation.relatedTags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Back */}
      <section className="max-w-360 mx-auto px-6 pt-28">
        <Link
          href="/life"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Life Situations
        </Link>
      </section>

      {/* HERO - FULL BLEED */}
      <section className="max-w-360 pb-16 mx-auto px-6 mt-10 grid lg:grid-cols-2 items-stretch">
        {/* Image */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[720px] w-full rounded-lg overflow-hidden ">
          <Image
            src={situation.image}
            alt={situation.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="flex items-center px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-xl">
            <p className="text-[#b07d3d]">Life Situation</p>

            <h1 className="mt-6 text-neutral-900">{situation.title}</h1>

            <p className="mt-4 text-neutral-500">{situation.tagline}</p>

            <p className="mt-6 text-neutral-600">{situation.description}</p>

            {/* Highlights */}
            <ul className="mt-8 space-y-4">
              {situation.highlights.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#b07d3d]" />
                  <span className="text-sm text-neutral-800">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6"
              >
                <Link href={situation.ctaHref}>{situation.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - WIDE */}
      <section className="py-10" style={{ backgroundColor: "#f2eee5" }}>
        <div className="max-w-360 mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <p className="text-[#ef5b22]">Questions</p>
              <h2 className="mt-4 text-neutral-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-neutral-500">
                Our experts are providing clarity so you can move forward with
                confidence.
              </p>

              <Link
                href="/contact"
                className="inline-block mt-6 text-sm font-medium text-[#ef5b22] hover:underline"
              >
                Ask us a question
              </Link>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {situation.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[16px] text-neutral-700 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* RELATED INSIGHTS */}
      {relatedInsights.length > 0 && (
        <section className="max-w-360 mx-auto px-6 pb-24 pt-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#b07d3d]">Related Reading</p>
              <h2 className="mt-3 text-neutral-900">
                Insights on {situation.title}
              </h2>
            </div>

            <Link
              href="/resources/insights"
              className="hidden sm:block text-sm font-medium text-[#b07d3d] hover:underline"
            >
              All insights
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((ins) => (
              <Link
                key={ins.slug}
                href={`/insights/${ins.slug}`}
                className="group block"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-3xl">
                  <Image
                    src={ins.coverImage}
                    alt={ins.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {ins.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wide text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-neutral-900">{ins.title}</h3>

                  <p className="mt-2 text-neutral-500 line-clamp-2">
                    {ins.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
