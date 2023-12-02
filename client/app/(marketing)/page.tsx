import Features from "./components/features"
import TypewriterEffect from "./components/typewriter-effect"
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div className="py-8 w-full max-w-screen-lg p-6 mx-auto">
        { /* HERO SECTION */ }
        <div className="min-h-[30vh] flex flex-col justify-center">
          <div>
          <Checkbox />
              <h1 className="heading blue-gradient">Shape&nbsp;</h1>
              <h1 className="heading">your schedule.</h1>
          </div>
          <div className="mt-2">
            <p className="description md:w-1/2 lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati libero ipsa amet distinctio eos odit dolores omnis facere perspiciatis.</p>
          </div>
        </div>
        <div className="mt-20">
            <h1 className="heading">Convenient and&nbsp;</h1>
            <h1 className="heading purple-gradient">accessible.</h1>
          </div>
          <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 mt-12">
            <Features />
        </div>
        <div className="mt-20">
          <div>
              <h1 className="heading">Interact through&nbsp;</h1>
              <h1 className="heading green-gradient">commands.</h1>
          </div>
          <div className="mt-2">
            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati libero ipsa amet distinctio eos odit dolores omnis facere perspiciatis.</p>
          </div>
          <div className="my-8">
            <TypewriterEffect />
          </div>
        </div>
    </div>
  )
}
