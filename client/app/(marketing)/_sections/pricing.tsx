import { Separator } from '@/components/ui/seperator';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/util/tw-merge';

function Feature({
  locked = false,
  feature,
}: {
  locked?: boolean;
  feature: string;
}) {
  return (
    <li className="flex-gap">
      <Icons.Check
        className={cn('w-3 h-3 text-primary/60', locked && 'text-gray-400')}
      />
      <span>{feature}</span>
    </li>
  );
}

export default function Pricing() {
  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="text-center md:text-left mb-8">
        <h1 className="heading" id="pricing">
          Simple, <span className="vertical-gradient">transparent</span> pricing
        </h1>
        <p className="text-muted-foreground my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        {/* Free Plan */}
        <div className="shadow-md rounded-lg w-full max-w-xs p-6 glassmorphism">
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
            <Feature feature="Speech Recognition" />
            <Feature feature="Smart Quick Add" />
          </ul>
          <Button className="w-full mt-4" variant="outline">
            Get Started
          </Button>
        </div>
        {/* Premium Plan */}
        <div className="border shadow-xl rounded-lg w-full max-w-xs dark:bg-primary/10 shadow-primary/50 dark:border-primary/40 p-6">
          <div className="flex-between">
            <h2 className="text-lg font-semibold mb-2">Pro</h2>
            <Badge variant="outline">Recommended</Badge>
          </div>
          <div className="text-2xl font-bold">
            $9.99{' '}
            <span className="text-muted-foreground text-sm font-normal">
              per month
            </span>
          </div>
          <Separator className="my-4 dark:bg-primary/40" />
          <ul className="text-sm text-muted-foreground space-y-3">
            <Feature feature="Unlimited tasks" />
            <Feature feature="Speech Recognition" />
            <Feature feature="AI Assistant" />
            <Feature feature="Smart Quick Add" />
            <Feature feature="Filtering" />
            <Feature feature="Analytics" />
          </ul>
          <Button className="w-full mt-4">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
