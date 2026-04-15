import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-primary text-background">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-light leading-tight mb-6 sm:text-4xl md:text-5xl">
          You don&apos;t have to figure it all out alone
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-background/80 sm:text-lg">
          Start building your financial future with clarity today. Let&apos;s
          turn confusion into confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button
            variant="ghost"
            className="w-full text-background hover:text-background hover:bg-background/10 sm:w-auto"
          >
            Learn More
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
