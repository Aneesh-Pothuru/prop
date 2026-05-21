import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { ProblemFraming } from "@/components/marketing/ProblemFraming";
import { AgentSections } from "@/components/marketing/AgentSections";
import { ComplianceMoat } from "@/components/marketing/ComplianceMoat";
import { Trust } from "@/components/marketing/Trust";
import { Pricing } from "@/components/marketing/Pricing";
import { Quotes } from "@/components/marketing/Quotes";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemFraming />
        <AgentSections />
        <ComplianceMoat />
        <Trust />
        <Pricing />
        <Quotes />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
