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
import TypewriterEffect from '../_components/typewriter-effect';
import Blur1 from '@/public/static/bg-blur-1.webp';

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
        'glassmorphism rounded-md border-[0.4px] border-[rgba(76,79,116,0.24)] p-6 duration-300 w-full relative',
        className,
      )}
    >
      {children}
    </Card>
  );
}

export default function Features() {
  return (
    <section className="px-6 max-w-screen-lg mx-auto mt-12 relative">
      <Image
        src={Blur1}
        alt="background blur"
        className="opacity-20 absolute -translate-y-1/4"
      />
      <div className="text-center mb-12">
        <FadeOnView>
          <h2 className="heading" id="features">
            <span className="bg-gradient-to-r from-primary pl-1">Unma</span>
            tched features
          </h2>
        </FadeOnView>
      </div>
      <div className="space-y-6 relative">
        <div className="md:grid md:grid-cols-5 gap-6 space-y-6 md:space-y-0">
          <FadeOnView className="col-span-3">
            <FeatureCard className="h-full">
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
          </FadeOnView>
          <div className="col-span-2 space-y-6 flex flex-col">
            <FadeOnView className="h-full">
              <FeatureCard className="h-full">
                <span className="relative flex h-6 w-6">
                  <ZapIcon className="animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
                  <ZapIcon className="relative inline-flex rounded-full h-6 w-6 text-foreground" />
                </span>
                <h4 className="font-semibold text-foreground text-lg mt-2">
                  <TypewriterEffect />
                </h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Harness AI and NLP for seamless task creation with natural,
                  intuitive language.
                </p>
              </FeatureCard>
            </FadeOnView>
            <FadeOnView>
              <FeatureCard>
                <AlarmClockIcon className="relative inline-flex rounded-full h-6 w-6 text-foreground" />
                <h4 className="font-semibold text-foreground text-lg mt-2">
                  Task Completion Tracking
                </h4>
                <p className="text-muted-foreground text-sm mt-2">
                  Stay on top of your goals.
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <Switch id="auto-progress-updates" defaultChecked />
                  <Label htmlFor="auto-progress-updates" className="text-sm">
                    Automatic Progress Updates
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Switch id="goal-achievement-notifications" defaultChecked />
                  <Label
                    htmlFor="goal-achievement-notifications"
                    className="text-sm"
                  >
                    Goal Achievement Notifications
                  </Label>
                </div>
              </FeatureCard>
            </FadeOnView>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
          <FadeOnView className="col-span-1 hidden lg:block">
            <FeatureCard className="flex-center flex-col p-0 overflow-hidden h-full">
              <Image src={KeyboardShortCuts} alt="Keyboard shortcuts" />
            </FeatureCard>
          </FadeOnView>
          <FadeOnView className="col-span-3 lg:col-span-2">
            <FeatureCard className="w-full h-full">
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
          </FadeOnView>
        </div>
      </div>
    </section>
  );
}
