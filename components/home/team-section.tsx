import { Button } from "@/components/ui/button";

export function TeamSection() {
  const advisors = [
    {
      name: "Sarah Johnson",
      role: "Wealth Strategy Advisor",
      bio: "With 15+ years in financial planning, Sarah brings practical wisdom and a genuine commitment to understanding your unique situation.",
    },
    {
      name: "Michael Chen",
      role: "Investment Specialist",
      bio: "Michael helps clients build confident investment strategies aligned with their life goals and values.",
    },
    {
      name: "Emma Watson",
      role: "Family Financial Advisor",
      bio: "Emma specializes in helping families navigate major life transitions and build lasting financial security.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
          Expert Guidance
        </p>
        <h2 className="mb-8">Meet the people behind the guidance</h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Each brings years of experience and a genuine commitment to
          understanding your situation.
        </p>

        <Button variant="outline" className="mb-16">
          Meet all Advisors
        </Button>

        <div className="space-y-16">
          {advisors.map((advisor, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
            >
              <div className="bg-muted rounded-2xl h-72 order-2 md:order-1"></div>
              <div className="order-1 md:order-2">
                <h3 className="mb-2">{advisor.name}</h3>
                <p className="text-muted-foreground mb-4">{advisor.role}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {advisor.bio}
                </p>
                <Button variant="link" className="p-0 h-auto mb-6">
                  Learn More
                </Button>
                <div className="w-6 h-6 bg-muted rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
