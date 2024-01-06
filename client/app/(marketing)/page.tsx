import FeaturesSection from './_sections/features';
import PricingSection from './_sections/pricing';
import HeroSection from './_sections/hero';
import CallToActionSection from './_sections/call-to-action';

export default async function Home() {
  return (
    <main className="overflow-hidden pt-24">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CallToActionSection />
      <div className="relative">
        <div className="w-[800px] h-[800px] mx-auto absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2">
          <div className="glowing-marble w-[800px] h-[800px] translate-y-1/2 absolute" />
        </div>
      </div>
    </main>
  );
}
