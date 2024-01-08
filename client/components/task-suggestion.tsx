import { format } from 'date-fns';

import { Icons } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { PromptTask } from '@/lib/util/open-ai';

import { priorities } from '@/components/shared/task/priority-picker';
import { Button } from './ui/button';

export default function TaskSuggestion({
  suggestion,
  onDiscard,
}: {
  suggestion: PromptTask;
  onDiscard: () => void;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div className="space-y-2 border p-3 rounded-md bg-background">
      <div className="space-y-1">
        <div className="flex-between">
          <div className="flex-gap">
            <h4 className="text-sm font-medium leading-none">
              {suggestion?.name}
            </h4>
            <Badge className="ml-2 flex-gap text-xs" variant="outline">
              <Icons.Sparkles className="w-3 h-3" />
              AI Suggestion
            </Badge>
          </div>
          <Button
            onClick={onDiscard}
            size="icon"
            variant="secondary"
            className="rounded-sm"
          >
            <Icons.Trash className="w-3 h-3" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {suggestion?.description}
        </p>
      </div>
      <div className="flex-gap">
        {suggestion?.dueDate && (
          <div className="flex-gap-sm text-xs text-muted-foreground">
            <Icons.Calendar className="w-3 h-3" />
            {format(new Date(suggestion.dueDate), 'dd MMMM, yyyy HH:mm')}
          </div>
        )}
        {suggestion?.priority && (
          <div className="flex-gap-sm text-xs text-muted-foreground">
            <Icons.Flag
              className="w-3 h-3"
              style={{
                color:
                  priorities.find((p) => p.value === suggestion?.priority)
                    ?.color || '#fffff',
              }}
            />
            {priorities.find((p) => p.value === suggestion?.priority)?.label}
          </div>
        )}
      </div>
    </div>
  );
}

TaskSuggestion.Loading = function LoadingSuggestion() {
  return (
    <div className="border p-3 rounded-md flex items-center text-sm text-muted-foreground bg-background">
      <Icons.Spinner className="w-4 h-4 animate-spin mr-2" />
      Creating prompt...
    </div>
  );
};

export const taskSuggestions = [
  { name: 'Go the bank', description: 'tomorrow at 7 pm.' },
  { name: 'Meet with Tom', description: 'and drink a coffee sometime.' },
];

TaskSuggestion.Empty = function Empty({
  name,
  description,
  onClick,
}: {
  name: string;
  description: string;
  onClick: () => void;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="button"
      className="border p-3 rounded-md hover:bg-accent bg-background"
      onClick={onClick}
    >
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">{name}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
