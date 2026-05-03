import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "What is Celerey?",
    a: "Celerey is building a simpler way to access structured financial guidance, combining practical tools with support designed to improve decision-making.",
  },
  {
    q: "Is Celerey advice personalised?",
    a: "Celerey can provide guidance and structured frameworks. When personalised support is requested, we route you to the right workflow and advisor-led options.",
  },
  {
    q: "How do bookings work?",
    a: "You request a session, we confirm availability, and you receive the next steps by email. Session formats depend on the type of support you select.",
  },
  {
    q: "Where is Celerey available?",
    a: "Celerey is expanding. Availability can vary by service and jurisdiction. If something is not available yet, we will still offer tools and updates.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#FFF3EF" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          {/* Image — square */}
          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1611943574626-91c9be96abc6?q=80&w=2517&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Person reviewing their finances"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal className="lg:pt-4">
            <h1 className="mb-4">Common questions</h1>

          

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${idx}`}
                  className="border-b border-black/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-7 pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="border-black/20 hover:border-black/40"
              >
                <Link href="/faqs">See all FAQs</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
