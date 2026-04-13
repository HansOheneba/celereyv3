export function ProblemSection() {
  return (
    <section className="py-20 md:px-24 px-6">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Most people don&apos;t need more information.
            They need clarity.
          </h2>
        </div>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Financial decisions feel overwhelming because there&apos;s too much noise and too many competing priorities.
          </p>
          <p>
            You need someone to help you cut through the confusion and focus on what actually matters for your situation.
          </p>
          <p>
            That&apos;s where clarity makes all the difference.
          </p>
        </div>
      </div>
    </section>
  );
}
