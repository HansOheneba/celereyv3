import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InsightsSection() {
  const insights = [
    {
      title: 'Five questions to ask before buying property',
      excerpt: 'The right questions guide you toward a decision that truly makes sense for your situation.'
    },
    {
      title: 'Building wealth on your own terms',
      excerpt: 'What intentional investing actually looks like in practice, without the jargon.'
    },
    {
      title: 'The conversation nobody has about financial security',
      excerpt: 'Why talking openly about money strengthens relationships and reduces stress.'
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Insights</p>
          <h2 className="text-5xl font-light mb-4 leading-tight">
            Thoughtful guidance for your future
          </h2>
          <p className="text-muted-foreground text-lg">
            Ideas worth considering as you shape what comes next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, idx) => (
            <Card key={idx} className="border flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <div className="bg-background rounded-xl h-48 mb-6"></div>
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Article</p>
                <h3 className="text-xl font-semibold mb-3 leading-tight flex-1">{insight.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{insight.excerpt}</p>
                <Button variant="link" className="p-0 h-auto w-fit">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
