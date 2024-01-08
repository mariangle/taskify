import * as React from 'react';

import Image from 'next/image';
import { AlarmClockIcon, ZapIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import KeyboardShortCuts from '@/public/keyboard-shortcuts.gif';
import { cn } from '@/lib/util/tw-merge';
import { FadeOnView } from '../_components/fade-on-view';
import TaskFormPreview from '../_components/task-form-preview';
import PromptFormPreview from '../_components/prompt-form-preview';

function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const Card = 'div';

  return (
    <Card
      className={cn(
        'glassmorphism rounded-md border-[0.4px] border-[rgba(76,79,116,0.24)] p-6 duration-300 w-full',
        className,
      )}
    >
      {children}
    </Card>
  );
}

export default function Features() {
  return (
    <section className="px-6 max-w-screen-lg mx-auto mt-12">
      <div className="text-center mb-12">
        <FadeOnView>
          <h2 className="heading" id="features">
            Unmatched features
          </h2>
        </FadeOnView>
      </div>
      <div className="space-y-6">
        <div className="md:grid md:grid-cols-5 gap-6 space-y-6 md:space-y-0">
          <FeatureCard className="col-span-3">
            <div className="border rounded-lg">
              <PromptFormPreview />
            </div>
            <div className="text-center md:max-w-xs mx-auto mt-4">
              <h4 className="font-semibold text-foreground">
                AI Powered tasks
              </h4>
              <p className="text-muted-foreground text-sm mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, nesciunt!
              </p>
            </div>
          </FeatureCard>
          <div className="col-span-2 space-y-6 flex flex-col">
            <FeatureCard>
              <div className="flex items-center gap-4">
                <span className="relative flex h-6 w-6">
                  <ZapIcon className="animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
                  <ZapIcon className="relative inline-flex rounded-full h-6 w-6 text-foreground" />
                </span>
                <h4 className="font-semibold text-foreground text-lg mt-2">
                  Natural Language Processing
                </h4>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Harness AI and NLP for seamless task creation with natural,
                intuitive language.
              </p>
            </FeatureCard>
            <FeatureCard className="">
              <AlarmClockIcon className="relative inline-flex rounded-full h-6 w-6 text-foreground" />
              <h4 className="font-semibold text-foreground text-lg mt-2">
                Task Completion Tracking
              </h4>
              <p className="text-muted-foreground text-sm mt-2">
                Monitor your progress and track completed tasks to stay on top
                of your goals.
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <Switch id="auto-progress-updates" defaultChecked />
                <Label htmlFor="auto-progress-updates">
                  Automatic Progress Updates
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Switch id="goal-achievement-notifications" defaultChecked />
                <Label htmlFor="goal-achievement-notifications">
                  Goal Achievement Notifications
                </Label>
              </div>
            </FeatureCard>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
          <FeatureCard className="col-span-1 flex-center flex-col p-0 overflow-hidden hidden lg:block">
            <Image src={KeyboardShortCuts} alt="Keyboard shortcuts" />
          </FeatureCard>
          <FeatureCard className="col-span-2 w-full">
            <div className="text-center mb-4 md:max-w-xs mx-auto">
              <h4 className="font-semibold text-foreground">
                Mention-driven assignments
              </h4>
              <p className="text-muted-foreground text-sm mt-2">
                Experience Twitter-like mention suggestions for efficiency.
              </p>
            </div>
            <TaskFormPreview />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
