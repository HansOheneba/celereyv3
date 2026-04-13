import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  const leftFeatures = [
    {
      title: "Start investing properly",
      description:
        "Move beyond saving into intentional wealth building with confidence.",
    },
    {
      title: "Get my finances organised",
      description:
        "Sort through what matters and build a foundation that works.",
    },
    {
      title: "Plan for property",
      description:
        "Navigate timing, financing, and long-term property decisions clearly.",
    },
    {
      title: "Plan for family",
      description:
        "Prepare financially for the people and moments that matter most.",
    },
  ];

  return (
    <section className="py-24 min-h-[80vh] flex items-center px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            What are you trying to do next?
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us where you are and we&apos;ll point you in the right direction.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: 2x2 GRID */}
          <div className="grid sm:grid-cols-2 gap-6">
            {leftFeatures.map((feature, idx) => (
              <Card
                key={idx}
                className=" bg-muted rounded-2xl p-6  transition"
              >
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium mb-3">{feature.title}</h3>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <button className="text-sm font-medium flex items-center gap-1">
                    Explore
                    <span className="text-lg">›</span>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RIGHT: FEATURE BLOCK */}
          <div className="space-y-6">
            {/* Image Placeholder */}
            <div className="bg-muted rounded-3xl h-[260px] md:h-[320px] flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                Image Placeholder
              </span>
            </div>

            {/* Text Content */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">More</p>

              <h3 className="text-2xl md:text-3xl font-light mb-4">
                Get clarity on my next move
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sometimes you need a sounding board for what comes next in your
                financial life.
              </p>

              <div className="flex items-center gap-4">
                <Button className=" px-6">Book</Button>

                <button className="text-sm font-medium flex items-center gap-1">
                  Explore
                  <span className="text-lg">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
