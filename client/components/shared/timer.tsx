import * as React from 'react';

import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Timer() {
  const [timer, setTimer] = React.useState<number>(0);
  const [countdownDuration, setCountdownDuration] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout;

    const handleInterval = () => {
      setTimer((prevTimer) => {
        const newTimer =
          isRunning && countdownDuration > 0
            ? Math.max(prevTimer - 1, 0)
            : prevTimer + 1;
        return newTimer;
      });
    };

    if (isRunning) {
      intervalId = setInterval(handleInterval, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, countdownDuration]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setCountdownDuration(0);
    setTimer(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number): string => {
    if (Number.isNaN(seconds) || seconds < 0) {
      return '00:00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-md border p-4 text-center w-[275px] bg-background-secondary relative">
      <div className="text-2xl horizontal-gradient font-bold">
        {formatTime(timer)}
      </div>
      <div className="flex-center space-x-2 mt-2">
        <Button
          onClick={resetTimer}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          <RefreshCw size={16} />
        </Button>
        <Button
          onClick={isRunning ? stopTimer : startTimer}
          size="icon"
          className="rounded-full"
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>
    </div>
  );
}
