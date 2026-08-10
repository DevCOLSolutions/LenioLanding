import { use } from "react";
import { setRequestLocale } from "next-intl/server";

import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import FeatureIntro from "@/components/funcionalidades/FeatureIntro";
import CtaSection from "@/components/cta/CtaSection";
import { PricingSection } from "@/components/pricing/pricing-section";
import Footer from "@/components/footer/Footer";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <FeatureIntro />
        <CtaSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
