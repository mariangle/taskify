import Features from './_components/features'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="py-8 w-full p-6 mx-auto">
      <section className="min-h-[50vh] flex flex-col justify-center text-center relative">
        <div className="absolute opacity-75 inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-500 to-orange-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative opacity-20 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-100 to-[#00FFD0] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="space-y-4">
          <span aria-level={2} className="border rounded-full px-3 py-1 border-sky-300 bg-sky-500/10 text-sky-500">
            Productivity Application
          </span>
          <h1 className="heading">
            <span className="blue-gradient">Increase</span> your productivity
          </h1>
        </div>
        <div className="my-4">
          <span className="text-muted-foreground md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati libero.
          </span>
        </div>
        <div className="space-x-2">
          <Button className="rounded-full shadow-lg">Get Started</Button>
          <Button className="rounded-full shadow-lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>
      <section className="mt-20 space-y-12 max-w-screen-lg mx-auto">
        <div className="text-center">
          <h2 className="heading">
            The <span className="green-gradient">feature</span> of task management
          </h2>
          <p className="text-muted-foreground mt-2 md:text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore consectetur iure possimus dolor?
            Modi illum officia totam consequatur corporis.
          </p>
        </div>
        <Features />
      </section>
    </div>
  )
}
