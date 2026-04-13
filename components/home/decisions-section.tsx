import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DecisionsSection() {
  const decisions = [
    { title: 'Buying a home', description: 'Navigate timing, financing, and what you can actually afford.' },
    { title: 'Preparing for early retirement', description: 'Plan your exit strategy with confidence.' },
    { title: 'Funding education', description: 'Build a strategy for your children&apos;s future.' },
    { title: 'Starting a business', description: 'Understand the financial side of entrepreneurship.' }
  ];

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Months</p>
          <h2 className="text-5xl font-light mb-4 leading-tight">
            Real decisions we help with
          </h2>
          <p className="text-muted-foreground text-lg">
            These are the conversations that shape lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background rounded-2xl h-96"></div>

          <div className="grid grid-cols-1 gap-6">
            {decisions.slice(0, 2).map((decision, idx) => (
              <Card key={idx} className="border">
                <CardHeader>
                  <CardTitle>{decision.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{decision.description}</p>
                  <Button variant="link" className="p-0 h-auto">
                    Explore →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {decisions.slice(2).map((decision, idx) => (
            <Card key={idx} className="border">
              <CardHeader>
                <CardTitle>{decision.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{decision.description}</p>
                <Button variant="link" className="p-0 h-auto">
                  Explore →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
