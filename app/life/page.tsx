import Link from "next/link";
import Image from "next/image";
import { lifeSituations } from "@/lib/life-situations";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Life Situations | Celerey",
  description:
    "Explore how Celerey helps you navigate the financial decisions that arise at every major stage of life.",
};

export default function LifeSituationsPage() {
  return (
    <main className="bg-[#fbfaf8] min-h-screen pt-28 pb-24">
      {/* Header */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.26em] text-[#b07d3d] uppercase">
            Life Situations
          </p>
          <h1 className="mt-6 font-serif font-thin text-4xl leading-[1.2] text-neutral-900 sm:text-5xl md:text-6xl">
            The right advice, for the right moment
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-500">
            Major financial events do not announce themselves with a manual.
            Whether you are exiting a business, navigating an inheritance, or
            planning for retirement, Celerey provides the independent advisory
            you need to move forward with confidence.
          </p>
        </div>
      </section>

      {/* Cinematic List */}
      <section className="px-6 md:px-16 lg:px-24 space-y-16">
        {lifeSituations.map((situation, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <Link
              key={situation.slug}
              href={`/life/${situation.slug}`}
              className="group block"
            >
              <div
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-[320px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden rounded-3xl">
                  <Image
                    src={situation.image}
                    alt={situation.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>

                {/* Text */}
                <div className="max-w-xl">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-900 leading-tight">
                    {situation.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-neutral-500">
                    {situation.tagline}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#b07d3d]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
