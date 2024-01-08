import { Separator } from '@/components/ui/seperator';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeOnView } from '../_components/fade-on-view';

function Feature({ feature }: { feature: string }) {
  return (
    <li className="flex-gap">
      <Icons.Check className="w-3 h-3 text-primary/60" />
      <span className="text-foreground">{feature}</span>
    </li>
  );
}

export default function Pricing() {
  return (
    <section className="px-6 max-w-screen-lg mx-auto z-10 relative mt-24">
      <div className="text-center md:text-left mb-8">
        <FadeOnView>
          <h1 className="heading horizontal-gradient" id="pricing">
            Simple, transparent pricing
          </h1>
        </FadeOnView>
        <FadeOnView>
          <p className="text-muted-foreground my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </FadeOnView>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        {/* Free Plan */}
        <FadeOnView
          delay={0.2}
          className="shadow-md rounded-lg w-full max-w-xs p-6 glassmorphism"
        >
          <h2 className="text-lg font-semibold mb-2">Free</h2>
          <div className="text-2xl font-bold">
            $0{' '}
            <span className="text-muted-foreground text-sm font-normal">
              per month
            </span>
          </div>
          <Separator className="my-4" />
          <ul className="text-sm text-muted-foreground space-y-3">
            <Feature feature="Unlimited tasks" />
            <Feature feature="Mention-driven assignments" />
            <Feature feature="Labels and lists" />
          </ul>
          <Button className="w-full mt-4" variant="outline">
            Get Started
          </Button>
        </FadeOnView>
        {/* Premium Plan */}
        <FadeOnView className="border shadow-xl rounded-lg w-full max-w-xs bg-background/10 dark:bg-primary/20 shadow-primary/50 dark:border-primary/40 p-6">
          <div className="flex-between">
            <h2 className="text-lg font-semibold mb-2">Pro</h2>
            <Badge variant="outline">Recommended</Badge>
          </div>
          <div className="text-2xl font-bold">
            $4.99{' '}
            <span className="text-muted-foreground text-sm font-normal">
              per month
            </span>
          </div>
          <Separator className="my-4 dark:bg-primary/40" />
          <ul className="text-sm text-muted-foreground space-y-3">
            <Feature feature="All free features" />
            <Feature feature="Speech Recognition" />
            <Feature feature="AI Generated tasks" />
            <Feature feature="Filtering" />
            <Feature feature="Recurring tasks" />
            <Feature feature="Analytics" />
          </ul>
          <Button className="w-full mt-4">Get Started</Button>
        </FadeOnView>
      </div>
    </section>
  );
}
