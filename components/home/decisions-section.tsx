import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from "next/image";


export function DecisionsSection() {
  const decisions = [
    { title: 'Buying a home', description: 'Navigate timing, financing, and what you can actually afford.' },
    { title: 'Preparing for early retirement', description: 'Plan your exit strategy with confidence.' },
    { title: 'Funding education', description: 'Build a strategy for your children&apos;s future.' },
    { title: 'Starting a business', description: 'Understand the financial side of entrepreneurship.' }
  ];

  return (
    <section className="py-20 px-6 bg-[#FFF7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-2 font-semibold tracking-wide">
            Moments
          </p>
          <h2 className="text-5xl font-light mb-4 leading-tight">
            Real decisions we help with
          </h2>
          <p className="text-muted-foreground text-lg">
            These are the conversations that shape lives.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Life section */}
          <div className="space-y-8 flex flex-col bg-white rounded-2xl">
            <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[300px]">
              <Image
                src="/homepage/moments1.png"
                alt="Financial planning discussion"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="p-5">
              <p className="text-black text-sm font-semibold mb-2">Shift</p>
              <h3 className="font-cirka text-3xl font-bold text-gray-900 mb-4">
                Thinking beyond salary
              </h3>
              <p className=" leading-relaxed mb-6">
                You're wondering if there's a better way to structure your
                income and build security.
              </p>
              <div className="flex gap-4">
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
                >
                  <Button className="">Explore</Button>
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
                >
                  <Button variant={"outline"} className="">
                    Learn
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-6">
            {/* Top 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-cirka font-bold text-xl text-gray-900 mb-3">
                  Building wealth intentionally
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  You have income but no clear strategy for making it work
                  harder for you.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-cirka text-xl font-bold text-gray-900 mb-3">
                  Preparing for family
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  A child is coming and you want to get your finances right
                  before everything changes.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white h-full rounded-2xl ">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden min-h-[300px]">
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
              <div className="bg-white rounded-2xl p-6 flex flex-col justify-center gap-2">
                <p className='font-semibold'>Life</p>
                <h3 className="font-cirka text-xl font-bold text-gray-900 mb-3">
                  Planning for property
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  You're ready to buy but unsure about timing and what you can
                  actually afford.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
                >
                  Explore
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
