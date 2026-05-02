import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Reveal, InteractiveImage } from "@/components/motion/reveal";

export default function WealthScan() {
  return (
    <section
      id="wealth-scan"
      className="flex min-h-[90vh] items-center bg-muted py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-360 px-4 sm:px-6 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* IMAGE (RIGHT) */}
        <InteractiveImage className="relative overflow-hidden rounded-2xl aspect-square">
          <Image
            src="/homepage/wealthscan.png"
            alt="Wealth scan illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </InteractiveImage>
        {/* CONTENT (LEFT) */}
        <Reveal>
          <h2 className="mb-6">
            Not sure where to start with your finances?
          </h2>
          <p className="mb-8 text-muted-foreground max-w-lg">
            A short self check-in that helps you understand where you stand
            today and what to focus on next. No pressure, just clarity on what
            matters.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/wealthscan">Start your assessment</Link>
            </Button>
           
          </div>
        </Reveal>
      </div>
    </section>
  );
}
