import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronsLeftRight } from "lucide-react";

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
        <div className="text-center mb-16">
          <h2 className="font-cirka text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
            What are you trying to do next?
          </h2>
          <p className="text-gray-500 text-base">
            Tell us where you are and we&apos;ll point you in the right
            direction.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="grid gap-6  items-start">
            {/* LEFT: 2×2 card grid */}
            <div className="grid grid-cols-2 h-full gap-4">
              {leftFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-gray-50 border-0 rounded-2xl p-6 flex flex-col justify-between min-h-55 transition-colors"
                >
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
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/homepage/family-walking.png"
                alt="Financial planning and clarity"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

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
              <div className="flex items-center gap-5">
                <Button variant={"outline"} className="px-10">
                  Book
                </Button>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:gap-2 transition-all"
                >
                  Explore
                  <span className="text-base leading-none">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
