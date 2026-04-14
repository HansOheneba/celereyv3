import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-20 md:px-24 px-6 min-h-[90vh] flex items-center">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
          Planning your future shouldn&apos;t feel unclear
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Whether you are planning for property, family, investing or
          retirement, Celerey helps you make clear financial decisions with
          expert guidance and clear next steps
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button>Book a session</Button>
          <Button variant="outline" className="px-10">
            Learn
          </Button>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden min-h-[70vh] md:h-full bg-gray-900">
        <Image
          src="/homepage/hero.png"
          alt="Financial planning illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  </section>
);
}
