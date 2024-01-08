'use client';

import 'regenerator-runtime/runtime';
import * as React from 'react';
import _uniqueId from 'lodash/uniqueId';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/seperator';
import { Input } from '@/components/ui/input';
import { PromptTask, sendPrompt } from '@/lib/util/open-ai';
import TaskSuggestion, { taskSuggestions } from '@/components/task-suggestion';
import { Icons } from '@/components/ui/icons';
import { TaskService } from '@/services/task-service';
import { Badge } from './ui/badge';

export default function PromptForm({ preview }: { preview?: boolean }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [prompt, setPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<PromptTask | null>(null);

  const onSubmitPrompt = async (prompt: string) => {
    try {
      setIsLoading(true);
      if (preview) {
        setPrompt('Go to the grocery store');
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setSuggestion({
              name: 'Grocery Shopping Excursion',
              description: 'Acquire Essential Items for Home and Daily Needs',
              dueDate: null,
              priority: 'MEDIUM',
            });
            resolve();
          }, 1000);
        });
      } else {
        const suggestion = await sendPrompt(prompt);
        setSuggestion(suggestion);
        setPrompt('');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Oops. Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onClear = React.useCallback(() => {
    setSuggestion(null);
    setPrompt('');
    resetTranscript();
  }, [setSuggestion, setPrompt, resetTranscript]);

  React.useEffect(() => {
    onClear();
  }, [onClear]);
  React.useEffect(() => {
    setPrompt('');
  }, [transcript]);

  React.useEffect(() => {
    prompt
      ? setPrompt((prev) => `${prev} ${transcript}`)
      : setPrompt(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  const onConfirm = () => {
    if (!suggestion || preview) {
      onClear();
      toast.success('Task created!');
      return;
    }
    setIsLoading(true);
    try {
      TaskService.createTask(suggestion);
    } catch (error) {
      toast.error('Oops. Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const onDiscard = () => {
    setSuggestion(null);
  };
  return (
    <div>
      <div className="text-lg font-semibold p-4 flex-gap">
        <Icons.Sparkles className="w-4 h-4 text-primary" />
        Generate AI task
        {preview && <Badge variant="secondary">Preview</Badge>}
      </div>
      <Separator />
      <div className="p-2">
        {suggestion ? (
          <div className="max-h-64 overflow-y-auto">
            {!isLoading && (
              <TaskSuggestion
                suggestion={suggestion}
                key={_uniqueId('ai_suggestion_')}
                onDiscard={onDiscard}
              />
            )}
          </div>
        ) : (
          <div className="md:grid md:grid-cols-2 space-y-2 md:space-y-0 md:gap-2">
            {!isLoading &&
              taskSuggestions.map((taskSuggestion) => (
                <TaskSuggestion.Empty
                  onClick={() =>
                    onSubmitPrompt(
                      `${taskSuggestion.name} ${taskSuggestion.description}`,
                    )
                  }
                  key={_uniqueId('task_suggestion_')}
                  name={taskSuggestion.name}
                  description={taskSuggestion.description}
                />
              ))}
          </div>
        )}
        {isLoading && <TaskSuggestion.Loading />}
      </div>
      <Separator />
      <div className="m-2 mb-0 rounded-sm flex items-center border bg-background">
        <Input
          placeholder="Write prompt..."
          className="rounded-none "
          transparent
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="flex-gap justify-end px-2 py-2">
        <div className="flex items-center justify-end gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={onClear}>
            Clear
          </Button>
          <div>
            {browserSupportsSpeechRecognition && (
              <Button
                variant="destructive"
                size="sm"
                onTouchStart={() => SpeechRecognition.startListening()}
                onMouseDown={() => SpeechRecognition.startListening()}
                onTouchEnd={SpeechRecognition.stopListening}
                onMouseUp={SpeechRecognition.stopListening}
              >
                {listening ? (
                  <Icons.Mic className="w-4 h-4" />
                ) : (
                  <Icons.MicOff className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          <Button
            onClick={() => {
              suggestion ? onConfirm() : onSubmitPrompt(prompt);
            }}
            type="button"
            size="sm"
            disabled={isLoading}
          >
            {suggestion ? 'Use Suggestion' : 'Send Prompt'}
          </Button>
        </div>
      </div>
    </div>
  );
}
