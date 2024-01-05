import FeaturesSection from './_sections/features';
import PricingSection from './_sections/pricing';
import HeroSection from './_sections/hero';

export default async function Home() {
  return (
    <main className="p-6 py-24 space-y-12">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}
