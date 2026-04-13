import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StepsSection() {
  const steps = [
    {
      title: 'Understand where you are',
      description: 'We listen to your situation without judgment or assumptions about what matters.'
    },
    {
      title: 'Clarify what matters most',
      description: 'Together we separate what&apos;s urgent from what actually shapes your future.'
    },
    {
      title: 'Get expert-backed guidance',
      description: 'You receive honest perspective grounded in experience and tailored to your life.'
    },
    {
      title: 'Move with confidence',
      description: 'You walk away with practical next steps and clarity on what to do.'
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4 leading-tight">
            How Celerey helps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We walk you through four clear steps. Each one builds on the last, moving you from confusion to confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {steps.map((step, idx) => (
            <Card key={idx} className="border">
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  Step {idx + 1}
                </CardTitle>
                <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button>Get Started</Button>
        </div>
      </div>
    </section>
  );
}
