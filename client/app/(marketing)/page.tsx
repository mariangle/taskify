import { SparklesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Features from './_components/features';
import HeroImage from './_components/hero-image';
import TypewriterEffect from './_components/typewriter-effect';

export default async function Home() {
  return (
    <div className="w-full p-6 mx-auto py-24">
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col justify-center text-center relative">
        <div className=" absolute opacity-75 inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pruple-200 dark:from-purple-500/10 to-sky-500 dark:to-purple-900/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
        <div className="space-y-4">
          <Badge variant="secondary" className="flex-gap py-1.5 px-3">
            <SparklesIcon className="w-4 h-4" />
            Work in progress
          </Badge>
          <h1 className="heading vertical-gradient lg:text-7xl flex-center gap-2 md:gap-4">
            Elevate your <TypewriterEffect />
          </h1>
        </div>
        <p className="text-muted-foreground md:text-lg my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati libero.
        </p>
        <div className="space-x-2">
          <Button className="rounded-full shadow-lg">Get Started</Button>
          <Button className="rounded-full shadow-lg" variant="outline">
            Github
          </Button>
        </div>
        <HeroImage />
      </section>
      {/* Features */}
      <section className="mt-20 space-y-12 max-w-screen-lg mx-auto">
        <div className="text-center">
          <h2 className="heading" id="features">
            The <span className="green-gradient">feature</span> of task
            management
          </h2>
          <p className="text-muted-foreground mt-2 md:text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            labore consectetur iure possimus dolor? Modi illum officia totam
            consequatur corporis.
          </p>
        </div>
        <Features />
      </section>
    </div>
  );
}
