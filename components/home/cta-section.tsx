import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-light leading-tight mb-6">
          You don&apos;t have to figure it all out alone
        </h2>
        <p className="text-lg text-background/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Start building your financial future with clarity today. Let&apos;s turn confusion into confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary">Get Started</Button>
          <Button variant="ghost" className="text-background hover:text-background hover:bg-background/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
