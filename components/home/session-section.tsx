import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function SessionSection() {
  return (
    <section className="py-20 md:py-32 md:px-24 px-6 bg-[#354A49]">
      <div className=" mx-auto grid grid-cols-1 min-h-[60vh] md:grid-cols-2 gap-12 items-center text-white">
        <div>
          <p className="text-sm font-bold text-[#CDE6AF] mb-4 tracking-wide">
            Starting point
          </p>
          <h2 className="text-4xl  md:text-5xl font-light leading-tight mb-6">
            Private 45 minute session
          </h2>
          <p className="text-lg mb-8 leading-relaxed">
            A focused session to help you make smarter financial decisions with
            clarity.
          </p>

          <div className="space-y-8 mb-12 md:flex md:items-start md:gap-12">
            <div>
              <p className="text-2xl font-semibold mb-2 text-[#CDE6AF]">$100</p>
              <p className="">
                One private session with an advisor who listens and thinks
                through your situation.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3 text-[#CDE6AF]">
                What&apos;s included
              </p>
             <p>Honest perspective, practical next steps, and a clear sense of
              what matters most.</p>
            </div>
          </div>

          <Button className="bg-[#CDE6AF] text-gray-800 hover:bg-[#CDE6AF]/50">
            Book your session
          </Button>
        </div>

        <div className="relative rounded-2xl overflow-hidden h-96 md:h-full min-h-96">
          <Image
            src="/homepage/man-waving.png"
            alt="Financial planning workspace"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
