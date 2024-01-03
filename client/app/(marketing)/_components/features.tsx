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
  return (
    <>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 mt-12">
        {features.map(({ title, description, icon: Icon }) => (
          <div key={title} className="space-y-2">
            <span className="font-semibold text-foreground flex-gap items-start mb-1">
              <Icon className="w-4 h-4 text-foreground mt-1" />
              {title}
            </span>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
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
    </>
  );
}
