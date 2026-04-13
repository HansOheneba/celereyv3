import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    description:
      "Sort through what matters and build a foundation that works.",
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
                  className="bg-gray-50 border-0 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] hover:bg-gray-100 transition-colors"
                >
                  <CardContent className="p-0 flex flex-col gap-4 h-full">
                    {/* Icon */}
                    <div className="w-8 h-8 relative">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 mb-2 leading-snug">
                        {feature.title}
                      </h3>
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
                      <span className="text-base leading-none">›</span>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* Image */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Replace with your actual image */}
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {/* Swap to a real image like so:
              <Image
                src="/images/clarity.jpg"
                alt="Get clarity on your next move"
                fill
                className="object-cover"
              />
              */}
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
                <Button variant={"outline"}>
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