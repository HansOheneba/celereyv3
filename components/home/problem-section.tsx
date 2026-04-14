import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 md:px-24 px-6 bg-gray-100">
      <div className=" mx-auto flex">
        {/* Main heading */}
        <div className=" mx-auto mb-16">
          <h2 className="font-cirka text-4xl md:text-5xl font-light leading-tight mb-6">
            Most people don&apos;t need more financial noise. <br />
            They need clarity.
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-gray-500 text-base">
            The right guidance cuts through complexity and helps you see what
            actually matters for your situation.
          </p>

          {/* Two column layout with Simple | Honest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
            {/* Simple */}
            <div>
              <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                Simple
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We explain things in plain language, not jargon or sales speak.
              </p>
            </div>

            {/* Honest */}
            <div>
              <h3 className="font-cirka text-2xl md:text-3xl font-light mb-3">
                Honest
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We tell you what we think, not what we think you want to hear.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="/learn"
                className="text-gray-900 font-medium hover:text-primary transition-colors"
              >
                <Button variant={"outline"} className="px-10">Learn</Button>
              </a>
              <a
                href="/explore"
                className="inline-flex items-center gap-1 text-gray-900 font-medium hover:gap-2 transition-all"
              >
                Explore
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        {/* Links/Buttons */}
      </div>
    </section>
  );
}
