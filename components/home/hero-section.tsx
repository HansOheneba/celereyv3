import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";

export function HeroSection() {
  return (
    <section className="flex min-h-[90vh] items-center bg-muted py-16 sm:py-20">
      <div className="mx-auto grid w-full max-w-360 px-4 sm:px-6 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        <Reveal>
          <h1 className="mb-6 text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
            Planning your future shouldn&apos;t feel unclear
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether you are planning for property, family, investing or
            retirement, Celerey helps you make clear financial decisions with
            expert guidance and clear next steps
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto">Book a session</Button>
            <Button variant="outline" className="w-full px-10 sm:w-auto">
              Learn
            </Button>
          </div>
        </Reveal>
        <InteractiveImage className="relative overflow-hidden rounded-2xl bg-gray-900 aspect-square">
          <Image
            src="/homepage/hero.png"
            alt="Financial planning illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </InteractiveImage>
      </div>
    </section>
  );
}
