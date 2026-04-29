import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";
import Link from "next/link";

export function SessionSection() {
  return (
    <section className=" bg-[#354A49]">
      <div className="mx-auto max-w-360 py-24 px-6 grid min-h-[60vh] grid-cols-1 items-center gap-10 text-white md:grid-cols-2 md:gap-12">
        <Reveal>
          <p className="text-[#CDE6AF] mb-4">Starting point</p>
          <h2 className="mb-6">Private 45 minute session</h2>
          <p className="text-white mb-8">
            A focused session to help you make smarter financial decisions with
            clarity.
          </p>

          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[#CDE6AF]">$99</p>
              <p className="text-white">
                One private session with an advisor who listens and thinks
                through your situation.
              </p>
            </div>
            <div>
              <p className="mb-3 text-[#CDE6AF]">What&apos;s included</p>
              <p className="text-white">
                Honest perspective, practical next steps, and a clear sense of
                what matters most.
              </p>
            </div>
          </div>

          <Link href="/book-session">
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
            priority
          />

          <div className="absolute inset-0 bg-black/10" />
        </InteractiveImage>
      </div>
    </section>
  );
}
