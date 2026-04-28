"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Podcast = {
  embedId: string;
  title: string;
  description: string;
};

const podcasts: Podcast[] = [
  {
    embedId: "B5-jYW4fj6g",
    title:
      "What Surviving a Plane Crash Teaches You About Risk | Francis Gyechie",
    description:
      "Francis Gyechie — education leader, institution builder, founder, and father of four — survived a plane crash landing. And what that experience gave him was something no boardroom, business school, or financial model ever could: a completely different understanding of what risk really means.",
  },
  {
    embedId: "tgRSVw5Dtq8",
    title:
      "From Breaking Things to Building Financial Systems | Tarek Mouganie, PhD (Affinity Africa)",
    description:
      "In this episode of CelereyPod, we sit down with Tarek Mouganie, PhD, Founder of Affinity Africa, for a thoughtful and deeply reflective conversation on building, risk, and rethinking financial systems.",
  },
  {
    embedId: "ud7hy_mf3JE",
    title: "Meet the Hosts of The Celerey Pod",
    description:
      "In this episode, we’re introducing the hosts and sharing the vision behind the podcast. Celerey Pod is a space for thoughtful conversations around wealth planning, business strategy, entrepreneurship, risk, and the decisions that shape our professional and personal lives.",
  },
  {
    embedId: "DVdTKJyRnn8",
    title: "Smart Money Moves Through Changing Times",
    description:
      "In this session, Jude and Francis unpack real financial stories, strategies, and perspectives that help everyday professionals build lasting wealth and confidence; no matter where they are in life.",
  },
];

export default function PodcastsPage() {
  return (
    <section className="bg-white min-h-screen">
      <div className=" max-w-360 mx-auto px-6 py-20 md:py-24">
        {/* Back */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 mb-12 md:mb-16"
        >
          <h1 className="">
            Podcasts
          </h1>
          <p className="">
            Expert discussions on markets, behavioural finance, and wealth
            strategies. Watch and learn from experienced practitioners.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            {podcasts.map((podcast, index) => (
              <motion.article
                key={podcast.embedId}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                {/* YouTube embed */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${podcast.embedId}`}
                    title={podcast.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Text */}
                <div className="mt-5">
                  <h2 className="text-xl font-medium text-gray-900 line-clamp-2">
                    {podcast.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {podcast.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
