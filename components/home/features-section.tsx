import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";
import Link from "next/link";

const leftFeatures = [
  {
    icon: "/icons/graph.png",
    title: "Start investing properly",
    description:
      "Move beyond saving into intentional wealth building with confidence.",
    href: "/services",
  },
  {
    icon: "/icons/coins.png",
    title: "Get my finances organised",
    description: "Sort through what matters and build a foundation that works.",
    href: "/services",
  },
  {
    icon: "/icons/home.png",
    title: "Plan for property",
    description:
      "Navigate timing, financing, and long-term property decisions clearly.",
    href: "/services",
  },
  {
    icon: "/icons/family.png",
    title: "Plan for family",
    description:
      "Prepare financially for the people and moments that matter most.",
    href: "/services",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <h2 className="font-cirka text-3xl md:text-5xl font-light tracking-tight mb-4 text-gray-900 sm:text-4xl">
            What are you trying to do next?
          </h2>
          <p className="text-gray-500 text-base">
            Tell us where you are and we&apos;ll point you in the right
            direction.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="grid gap-6  items-start">
            {/* LEFT: 2×2 card grid */}
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {leftFeatures.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <Card className="bg-gray-50 border-0 rounded-2xl p-6 flex min-h-55 flex-col justify-between transition-colors">
                    <CardContent className="p-0 flex flex-col gap-4 h-full">
                      {/* Icon */}
                      <div className="w-8 h-8 relative">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          sizes="32px"
                          className="object-contain"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <CardTitle className="font-semibold mb-2 leading-snug text-gray-900">
                          {feature.title}
                        </CardTitle>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Explore link */}
                      <a
                        href={feature.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:gap-2 transition-all"
                      >
                        Explore
                        <ChevronRight className="h-4" />
                      </a>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="flex flex-col gap-6" delay={0.08}>
            {/* Image */}
            <InteractiveImage className="relative w-full aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/homepage/family-walking.png"
                alt="Financial planning and clarity"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </InteractiveImage>

            {/* Text + CTAs */}
            <div className="px-1">
              <p className="text-sm text-gray-400 mb-2 tracking-wide">More</p>
              <h3 className="font-cirka text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Get clarity on my next move
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Sometimes you need a sounding board for what comes next in your
                financial life.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <Link href="/pricing">
                  {" "}
                  <Button
                    variant={"outline"}
                    className="w-full px-10 sm:w-auto"
                  >
                    Book
                  </Button>
                </Link>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:gap-2 transition-all"
                >
                  Explore
                  <span className="text-base leading-none">›</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
