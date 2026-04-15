import { HeroSection } from "@/components/home/hero-section";
import { ProblemSection } from "@/components/home/problem-section";
import { StepsSection } from "@/components/home//steps-section";
import { SessionSection } from "@/components/home//session-section";
import { FeaturesSection } from "@/components/home//features-section";
import { DecisionsSection } from "@/components/home//decisions-section";
import { InsightsSection } from "@/components/home//insights-section";
import { CTASection } from "@/components/home//cta-section";
import { AdvisorsSection } from "@/components/home/advisors-section";
import Community from "@/components/home/community";
import WealthScan from "@/components/home/wealthScan";


export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <ProblemSection />
      <WealthScan />
      <StepsSection />
      <SessionSection />
      <DecisionsSection />
      <AdvisorsSection />
      <InsightsSection />
      <CTASection />
      <Community />
    </main>
  );
}
