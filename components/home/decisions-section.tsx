import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export function DecisionsSection() {
  const decisions = [
    { title: 'Buying a home', description: 'Navigate timing, financing, and what you can actually afford.' },
    { title: 'Preparing for early retirement', description: 'Plan your exit strategy with confidence.' },
    { title: 'Funding education', description: 'Build a strategy for your children&apos;s future.' },
    { title: 'Starting a business', description: 'Understand the financial side of entrepreneurship.' }
  ];

  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-2 font-semibold tracking-wide">Moments</p>
          <h2 className="text-5xl font-light mb-4 leading-tight">
            Real decisions we help with
          </h2>
          <p className="text-muted-foreground text-lg">
            These are the conversations that shape lives.
          </p>
        </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Life section */}
          <div className="space-y-8 flex flex-col">
            <div className="bg-gray-50 flex-1 rounded-2xl p-6">
            
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Shift</p>
              <h3 className="font-cirka text-3xl font-light text-gray-900 mb-4">
                Thinking beyond salary
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                You're wondering if there's a better way to structure your income and build security.
              </p>
              <a
                href="/services"
                className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
              >
                Explore
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right side - 2x2 grid (3 cards + 1 image) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-cirka text-xl font-light text-gray-900 mb-3">
                Building wealth intentionally
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                You have income but no clear strategy for making it work harder for you.
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
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-cirka text-xl font-light text-gray-900 mb-3">
                Preparing for family
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                A child is coming and you want to get your finances right before everything changes.
              </p>
              <a
                href="/services"
                className="inline-flex items-center gap-1 text-gray-900 text-sm font-medium hover:gap-2 transition-all"
              >
                Explore
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

            {/* Image placeholder */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
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
              {/* Replace with actual image when ready */}
              {/* <Image src="/images/placeholder.jpg" alt="Placeholder" fill className="object-cover" /> */}
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-cirka text-xl font-light text-gray-900 mb-3">
                Planning for property
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                You're ready to buy but unsure about timing and what you can actually afford.
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
    </section>
  );
}
