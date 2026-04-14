import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function StepsSection() {
  const steps = [
    {
      step: "Step One",
      title: "Understand where you are",
      description:
        "We listen to your situation without judgment or assumptions about what matters.",
    },
    {
      step: "Step 2",
      title: "Clarify what matters most",
      description:
        "Together we separate what's urgent from what actually shapes your future.",
    },
    {
      step: "Step 3",
      title: "Get expert guidance",
      description:
        "You receive honest perspective grounded in experience and tailored to your life.",
    },
    {
      step: "Step 4",
      title: "Leave with practical next steps",
      description:
        "You walk away knowing exactly what to do and why it matters for you.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className=" text-sm tracking-wide mb-3">
            Our Process
          </p>
          <h2 className="font-cirka text-4xl md:text-5xl font-light mb-4 text-gray-900">
            How Celerey Helps
          </h2>
          <p className=" text-base max-w-2xl mx-auto">
            We walk you through four clear steps. Each one builds on the last,
            moving you from confusion to confidence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="border-0 shadow-none bg-transparent p-0 max-w-md mx-auto">
              <div className="p-0 flex flex-col justify-center">
                <h1 className="text-primary text-3xl mb-3 text-center font-thin ">{step.step}</h1>
                <p className="text-center text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </p>
                <p className="text-gray-500 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary/90 px-6"
          >
            Book a session
          </Button>
          <Button variant="outline" className="bg-white px-6">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
