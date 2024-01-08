import FeaturesSection from './_sections/features';
import AdditionalFeaturesSection from './_sections/additional-features';
import PricingSection from './_sections/pricing';
import HeroSection from './_sections/hero';
import CallToActionSection from './_sections/call-to-action';

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <div className="max-w-screen-2xl my-24 mx-auto h-px bg-transparent bg-gradient-to-r from-transparent via-border to-transparent opacity-75" />
      <AdditionalFeaturesSection />
      <div className="max-w-screen-2xl my-24 mx-auto h-px bg-transparent bg-gradient-to-r from-transparent via-border to-transparent opacity-75" />
      <div className="relative overflow-hidden">
        <div className="w-[800px] h-[800px] mx-auto absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2">
          <div className="glowing-marble w-[800px] h-[800px] translate-y-1/2 absolute" />
        </div>
        <PricingSection />
        <CallToActionSection />
      </div>
    </main>
  );
}
