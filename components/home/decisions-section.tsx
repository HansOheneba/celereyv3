import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";

export function DecisionsSection() {
  const decisions = [
    {
      title: "Buying a home",
      description:
        "Navigate timing, financing, and what you can actually afford.",
    },
    {
      title: "Preparing for early retirement",
      description: "Plan your exit strategy with confidence.",
    },
    {
      title: "Funding education",
      description: "Build a strategy for your children&apos;s future.",
    },
    {
      title: "Starting a business",
      description: "Understand the financial side of entrepreneurship.",
    },
  ];

  return (
    <section className=" bg-[#FFF3EF]">
      <div className="max-w-360 py-20 px-6 mx-auto">
        <Reveal className="mb-16 text-center">
          <p className="text-muted-foreground mb-2">Moments</p>
          <h1 className="mb-4">Real decisions we help with</h1>
          <p className="text-muted-foreground">
            These are the conversations that shape lives.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Life section */}
          <Reveal
            className="space-y-8 flex flex-col bg-white rounded-2xl"
            delay={0.04}
          >
            <div className="relative flex-1 overflow-hidden  rounded-2xl min-h-70 sm:min-h-75">
              <Image
                src="/homepage/moments1.png"
                alt="Financial planning discussion"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="p-5">
              <p className="text-black mb-2">Shift</p>
              <h3 className="text-gray-900 mb-4">Thinking beyond salary</h3>
              <p className="mb-6">
                You&apos;re wondering if there&apos;s a better way to structure
                your income and build security.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
                >
                  <Button className="w-full sm:w-auto">
                    View bespoke services
                  </Button>
                </a>
                <a
                  href="/resources"
                  className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
                >
                  <Button variant={"outline"} className="w-full sm:w-auto">
                    Learn
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right side */}
          <div className="flex flex-col gap-6">
            {/* Top 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <Reveal className="bg-white rounded-2xl p-6" delay={0.08}>
                <h3 className="text-gray-900 mb-3">
                  Building wealth intentionally
                </h3>
                <p className="text-gray-500 mb-4">
                  You have income but no clear strategy for making it work
                  harder for you.
                </p>
                <a
                  href="/services/wealth-review"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </Reveal>

              {/* Card 2 */}
              <Reveal className="bg-white rounded-2xl p-6" delay={0.12}>
                <h3 className="text-gray-900 mb-3">Preparing for family</h3>
                <p className="text-gray-500 mb-4">
                  A child is coming and you want to get your finances right
                  before everything changes.
                </p>
                <a
                  href="/services/estate"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </Reveal>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white h-full rounded-2xl ">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl min-h-70 sm:min-h-75">
                <Image
                  src="/homepage/moments2.png"
                  alt="Financial planning discussion"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Card 3 */}
              <Reveal
                className="bg-white rounded-2xl p-6 flex flex-col justify-center gap-2"
                delay={0.14}
              >
                <p className="">Life</p>
                <h3 className="text-gray-900 mb-3">Planning for property</h3>
                <p className="text-gray-500 mb-4">
                  You&apos;re ready to buy but unsure about timing and what you
                  can actually afford.
                </p>
                <a
                  href="/services/property"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
