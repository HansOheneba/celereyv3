import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InteractiveImage, Reveal } from "@/components/motion/reveal";

export function StepsSection() {
  const steps = [
    {
      step: "01",
      title: "Understand where you are",
      description:
        "We listen to your situation without judgment or assumptions about what matters.",
    },
    {
      step: "02",
      title: "Clarify what matters most",
      description:
        "Together we separate what's urgent from what actually shapes your future.",
    },
    {
      step: "03",
      title: "Get expert guidance",
      description:
        "You receive honest perspective grounded in experience and tailored to your life.",
    },
    {
      step: "04",
      title: "Leave with practical next steps",
      description:
        "You walk away knowing exactly what to do and why it matters for you.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <p className=" text-sm tracking-wide mb-3">Our Process</p>
          <h2 className="font-cirka text-3xl font-light mb-4 text-gray-900 sm:text-4xl md:text-5xl">
            How Celerey Helps
          </h2>
          <p className=" text-base max-w-2xl mx-auto">
            We walk you through four clear steps. Each one builds on the last,
            moving you from confusion to confidence.
          </p>
        </Reveal>

        <InteractiveImage className="relative mb-16 mx-auto w-full max-w-4xl overflow-hidden rounded-2xl aspect-[4/5] sm:aspect-[4/3] sm:max-h-125">
          <Image
            src="/homepage/girl-sitting.png"
            alt="Financial clarity and planning"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </InteractiveImage>
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.06}
              className="border-0 shadow-none bg-transparent p-0 max-w-md mx-auto"
            >
              <div className="p-0 flex flex-col justify-start">
                <h1 className="text-primary text-3xl mb-3 font-thin ">
                  {step.step}
                </h1>
                <p className=" text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Buttons */}
        <Reveal className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="default"
            className="w-full bg-primary px-6 text-white hover:bg-primary/90 sm:w-auto"
          >
            Book a session
          </Button>
          <Button variant="outline" className="w-full bg-white px-6 sm:w-auto">
            Learn More
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
