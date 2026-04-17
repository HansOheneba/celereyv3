import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";
import Link from "next/link";

export function SessionSection() {
  return (
    <section className="py-20 md:py-32 md:px-24 px-6 bg-[#354A49]">
      <div className="mx-auto grid min-h-[60vh] grid-cols-1 items-center gap-10 text-white md:grid-cols-2 md:gap-12">
        <Reveal>
          <p className="text-sm font-bold text-[#CDE6AF] mb-4 tracking-wide">
            Starting point
          </p>
          <h2 className="text-3xl font-light leading-tight mb-6 sm:text-4xl md:text-5xl">
            Private 45 minute session
          </h2>
          <p className="text-base mb-8 leading-relaxed sm:text-lg">
            A focused session to help you make smarter financial decisions with
            clarity.
          </p>

          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-2xl font-semibold mb-2 text-[#CDE6AF]">$100</p>
              <p className="">
                One private session with an advisor who listens and thinks
                through your situation.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3 text-[#CDE6AF]">
                What&apos;s included
              </p>
              <p>
                Honest perspective, practical next steps, and a clear sense of
                what matters most.
              </p>
            </div>
          </div>

          <Link href="/pricing">
            <Button className="w-full bg-[#CDE6AF] text-gray-800 hover:bg-[#CDE6AF]/50 sm:w-auto">
              Book your session
            </Button>
          </Link>
        </Reveal>

        <InteractiveImage className="relative h-80 min-h-80 overflow-hidden rounded-2xl sm:h-96 sm:min-h-96 md:h-full">
          <Image
            src="/homepage/man-waving.png"
            alt="Financial planning workspace"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />
        </InteractiveImage>
      </div>
    </section>
  );
}
