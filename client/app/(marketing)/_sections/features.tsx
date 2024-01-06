import * as React from 'react';

import {
  MicIcon,
  BotIcon,
  BrainIcon,
  LucideIcon,
  ArrowRight,
  Italic,
  Plus,
  AtSign,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/util/tw-merge';
import { buttonVariants } from '@/components/ui/button';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'Natural Language Processing.',
    description:
      'Convert text-based task inputs into structured data for seamless interaction.',
    icon: BrainIcon,
  },
  {
    title: 'AI Powered.',
    description:
      'AI algorithms providing intelligent suggestions and improving the overall user experience based on individual preferences.',
    icon: BotIcon,
  },
  {
    title: 'Speech Recognition.',
    description:
      'Add tasks hands-free by speaking, powered by advanced speech recognition technology.',
    icon: MicIcon,
  },
  {
    title: 'Smart Assignments via mentions.',
    description:
      'Experience Twitter-like mention suggestions for efficient task creation and assignment.',
    icon: AtSign,
  },
  {
    title: 'Markdown Editor.',
    description:
      'Utilize a Markdown editor for streamlined task creation, allowing for efficient formatting and content organization.',
    icon: Italic,
  },
  {
    title: 'Plus...',
    description:
      'Essential features like drag and drop, lists, filters, views, recurring tasks, and more, ensuring a comprehensive task management experience.',
    icon: Plus,
  },
];

export default function Features() {
  const Card = 'div';
  return (
    <section className="px-6 space-y-12 max-w-screen-lg mx-auto">
      <div className="text-center">
        <h2 className="heading" id="features">
          Features
        </h2>
        <p className="text-muted-foreground mt-2 md:text-lg max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-12">
        {features.map(({ title, description, icon: Icon }) => (
          <Card
            key={title}
            className="glassmorphism rounded-md border-[0.4px] border-[rgba(76,79,116,0.24)] p-6 duration-300  hover:scale-[101%] hover:shadow-xl"
          >
            <span className="font-semibold text-foreground flex-gap items-start mb-1">
              <Icon className="w-4 h-4 text-foreground mt-1" />
              {title}
            </span>
            <p className="text-muted-foreground text-sm">{description}</p>
          </Card>
        ))}
      </div>
      <Link
        href="/docs/features"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'p-0 w-full text-center',
        )}
      >
        See all features
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </section>
  );
}
