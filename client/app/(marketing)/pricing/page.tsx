import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/seperator'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/shared/icons'

import { cn } from '@/lib/util/cn'

export default function Pricing() {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-2">
      <div className="min-h-[30vh] flex-center flex-col text-center">
        <h1 className="heading horizontal-gradient">Simple, transparent pricing</h1>
        <p className="text-muted-foreground my-8">
          Choose the plan that works best for you and start managing your tasks effortlessly.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Free Plan */}
        <div className="shadow-md rounded-lg w-full max-w-xs p-6 glassmorphism">
          <h2 className="text-lg font-semibold mb-2">Free</h2>
          <div className="text-2xl font-bold">
            $0 <span className="text-muted-foreground text-sm font-normal">per month</span>
          </div>
          <Separator className="my-4" />
          <ul className="text-sm text-muted-foreground space-y-3">
            <Feature feature="Unlimited tasks" />
            <Feature feature="Speech Recognition" />
            <Feature feature="Smart Quick Add" />
          </ul>
          <Button className="w-full mt-4">Get Started</Button>
        </div>
        {/* Premium Plan */}
        <div className="border shadow-xl rounded-lg w-full max-w-xs bg-purple-100/10 dark:bg-purple-950/10 shadow-purple-300 dark:shadow-purple-950 border-purple-300 dark:border-purple-400 p-6">
          <div className="flex-between">
            <h2 className="text-lg font-semibold mb-2">Pro</h2>
            <Badge variant={'outline'}>Recommended</Badge>
          </div>
          <div className="text-2xl font-bold">
            $9.99 <span className="text-muted-foreground text-sm font-normal">per month</span>
          </div>
          <Separator className="my-4" />
          <ul className="text-sm text-muted-foreground space-y-3">
            <Feature feature="Unlimited tasks" />
            <Feature feature="Speech Recognition" />
            <Feature feature="AI Assistant" />
            <Feature feature="Smart Quick Add" />
            <Feature feature="Filtering" />
            <Feature feature="Analytics" />
          </ul>
          <Button className="w-full bg-purple-500 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700 shadow-lg shadow-purple-500/50 hover:bg-purple-600 mt-4">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

const Feature = ({ locked = false, feature }: { locked?: boolean; feature: string }) => {
  return (
    <li className="flex-gap">
      <Icons.check className={cn('w-3 h-3 text-purple-500/60', locked && 'text-gray-400')} />
      <span>{feature}</span>
    </li>
  )
}
