import { Code, Link, Button  } from "@nextui-org/react";

import WidthContainer from "@/components/ui/width-container"
import PageLayout from "@/components/ui/page-layout"

import Features from "./components/features"
import TypewriterEffect from "./components/typewriter-effect"

export default function Home() {
  return (
    <PageLayout>
      <WidthContainer>
        { /* HERO SECTION */ }
        <div className="min-h-[30vh] flex flex-col justify-center">
          <div>
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
              <Code color='success' className='whitespace-pre-wrap w-full'>
                  <TypewriterEffect />
              </Code>
          </div>
          <Button
            href="/commands"
            as={Link}
            color="success"
            variant="solid"
            size="sm"
          >
            Learn More
          </Button>
        </div>
      </WidthContainer>
    </PageLayout>
  )
}
