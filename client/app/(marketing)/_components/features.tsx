import * as React from 'react';

import { MicIcon, BotIcon, BrainIcon, CalendarIcon } from 'lucide-react';
import { Card, CardHeader, CardDescription } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Natural Language Processing',
    description:
      'Convert text-based task inputs into structured data for seamless interaction.',
    icon: <BotIcon className="w-4 h-4 text-primary/30" />,
  },
  {
    title: 'AI Assistant',
    description:
      'Leverage AI algorithms for intelligent task prioritization based on user behavior.',
    icon: <BrainIcon className="w-4 h-4 text-primary/30" />,
  },
  {
    title: 'Speech Recognition',
    description:
      'Add tasks hands-free by speaking, powered by advanced speech recognition technology.',
    icon: <MicIcon className="w-4 h-4 text-primary/30" />,
  },
  {
    title: 'Automated Smart Scheduling',
    description:
      'Enable the app to dynamically schedule tasks based on habits and priorities.',
    icon: <CalendarIcon className="w-4 h-4 text-primary/30" />,
  },
];

export default function Features() {
  return (
    <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 mt-12">
      {features.map(({ title, description, icon }) => (
        <Card key={title} className="border shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center">
              <div className="p-2 rounded-full w-8 h-8 mr-3 bg-primary/10">
                {icon}
              </div>
              <h4 className="text-sm font-semibold">{title}</h4>
            </div>
            <CardDescription className="m-0 ml-0 pl-0">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
