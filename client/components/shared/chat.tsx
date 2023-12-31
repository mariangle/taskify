'use client';

import * as React from 'react';
import _uniqueId from 'lodash/uniqueId';
import { Icons } from '@/components/ui/icons';

import { cn } from '@/lib/util/cn';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLayoutStore } from '@/store/layout-store';

export default function Chat() {
  const { showChatOverlay, toggleChatOverlay } = useLayoutStore();

  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleChatOverlay();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleChatOverlay]);

  return (
    <div
      className={cn(
        'hidden right-4 bottom-4 glassmorphism rounded-lg fixed duration-300 transition z-50',
        showChatOverlay && 'block',
      )}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Kirk</p>
              <p className="text-sm text-muted-foreground">AI Assistant</p>
            </div>
          </div>
          <Button
            onClick={toggleChatOverlay}
            variant="secondary"
            size="icon"
            className="rounded-full h-6 w-6"
          >
            <Icons.Close className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[300px] overflow-y-scroll">
            {messages.map((message) => (
              <div
                key={_uniqueId('message_')}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted',
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input,
                },
              ]);
              setInput('');
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Icons.Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
