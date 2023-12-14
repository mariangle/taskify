import TypewriterEffect from './_components/typewriter-effect'
import Features from './_components/features'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="py-8 w-full max-w-screen-xl p-6 mx-auto">
      <section className="min-h-[30vh] flex flex-col justify-center text-center">
        <div className="block">
          <span aria-level={2} className="description">
            Productivity Application
          </span>
          <h1 className="heading">
            <span className="blue-gradient">Increase</span> your productivity
          </h1>
        </div>
        <div className="my-4">
          <span className="text-muted-foreground text-lg sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati libero.
          </span>
        </div>
        <div className="space-x-2">
          <Button className="rounded-full">Get Started</Button>
          <Button className="rounded-full" variant="outline">
            Learn More
          </Button>
        </div>
      </section>
      <section className="mt-20 space-y-12">
        <div className="text-center">
          <h2 className="heading">
            The <span className="green-gradient">feature</span> of task management
          </h2>
          <p className="text-muted-foreground mt-2 text-lg sm:text-xl">
            Our cutting-edge task management app redefines efficiency with the seamless integration of AI and NLP
            technologies.
          </p>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <h4 className="subheading">AI Integration 🤖</h4>
            <p className="text-muted-foreground mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi cupiditate numquam recusandae aliquam
              voluptates amet ipsa iure quod consectetur dolor.
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <TypewriterEffect />
          </div>
          <div className="w-1/2 flex-1">
            <h4 className="subheading">Natural Language Processing 🌿</h4>
            <p className="text-muted-foreground mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quibusdam facere porro, similique magnam
              illum reiciendis modi placeat corrupti laudantium? Nobis!
            </p>
          </div>
        </div>
        <Features />
      </section>
    </div>
  )
}
