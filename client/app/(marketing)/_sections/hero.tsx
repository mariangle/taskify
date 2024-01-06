import { SparklesIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TypewriterEffect from '../_components/typewriter-effect';
import { cn } from '@/lib/util/tw-merge';

export default function Hero() {
  return (
    <section className="px-6 min-h-[40vh] flex flex-col justify-center text-center relative">
      <Badge variant="secondary" className="w-fit mx-auto">
        <SparklesIcon className="w-4 h-4 mr-2" />
        Under construction
      </Badge>
      <h1 className="heading vertical-gradient lg:text-7xl sm:flex-center gap-2 sm:gap-4 py-4 md:py-6">
        Inrease your <TypewriterEffect />
      </h1>
      <p className="text-muted-foreground md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="space-x-2 mt-6">
        <Button className="rounded-full shadow-lg">Get Started</Button>
        <Button className="rounded-full shadow-lg" variant="outline">
          GitHub
        </Button>
      </div>
      <div
        className={cn(
          'hero-border-animation',
          'rounded-[12px] overflow-hidden p-[1px] max-w-screen-xl mx-auto mt-16',
          'bg-gradient-to-t from-accent to-border',
        )}
        style={{
          maskImage: 'linear-gradient(to bottom, black 30%, transparent 90%)',
        }}
      >
        <div className="z-10 rounded-[12px] overflow-hidden ">
          <Image src="/hero-1.png" alt="App image" width={1920} height={1080} />
        </div>
      </div>
    </section>
  );
}
