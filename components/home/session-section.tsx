import { Button } from '@/components/ui/button';

export function SessionSection() {
  return (
    <section className="py-20 md:px-24 px-6">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Starting point</p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Private 45 minute session
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            A focused session to help you make smarter financial decisions with clarity.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <p className="text-2xl font-semibold mb-2">$100</p>
              <p className="text-muted-foreground">
                One private session with an advisor who listens and thinks through your situation.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3">What&apos;s included</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Honest perspective grounded in experience</li>
                <li>• Practical next steps tailored to you</li>
                <li>• Clear sense of what matters most</li>
              </ul>
            </div>
          </div>

          <Button>Book now</Button>
        </div>

        <div className="bg-muted rounded-2xl h-96 md:h-full min-h-96"></div>
      </div>
    </section>
  );
}
