import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RefreshCw } from 'lucide-react'

export const Timer = () => {
  const [timer, setTimer] = React.useState<number>(0)
  const [countdownDuration, setCountdownDuration] = React.useState<number>(0)
  const [isRunning, setIsRunning] = React.useState<boolean>(false)

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    const handleInterval = () => {
      setTimer((prevTimer) => {
        const newTimer = isRunning && countdownDuration > 0 ? Math.max(prevTimer - 1, 0) : prevTimer + 1
        return newTimer
      })
    }

    if (isRunning) {
      intervalId = setInterval(handleInterval, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isRunning, countdownDuration])

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setCountdownDuration(0)
    setTimer(0)
    setIsRunning(false)
  }

  const handleDurationChange = (selectedDuration: number | null) => {
    setCountdownDuration(selectedDuration ?? 0)
    setTimer(selectedDuration ?? 0)
  }

  const calculateCircleProgress = (): number => {
    return 100 - (timer / countdownDuration) * 100
  }

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) {
      return '00:00:00'
    }

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  const DurationDropdown: React.FC = () => (
    <select
      value={countdownDuration !== null ? countdownDuration : ''}
      onChange={(e) => handleDurationChange(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
      className="p-2 border rounded-md text-center"
    >
      <option value="">Set duration (seconds)</option>
      <option value="3">3 seconds</option>
      <option value="60">1 minute</option>
      <option value="120">2 minutes</option>
    </select>
  )

  return (
    <div className="rounded-md mt-3 border p-4 text-center w-[275px] bg-background-secondary relative">
      <svg
        className="absolute inset-0 rounded-full"
        style={{
          transformOrigin: 'center',
          transition: 'stroke-dashoffset 1s linear',
        }}
        width="20px"
        height="20px"
      >
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="transparent"
          stroke="#fdd835" // Change this to your desired color
          strokeWidth="8%"
          strokeDasharray="100%"
          strokeDashoffset={calculateCircleProgress() + '%'}
        />
      </svg>
      <div className="text-2xl horizontal-gradient font-bold font-mono" style={{ color: '#fdd835' }}>
        {formatTime(timer)}
      </div>
      <div className="flex-center space-x-2 mt-2">
        <Button onClick={resetTimer} variant="secondary" size="icon" className="rounded-full">
          <RefreshCw size={16} />
        </Button>
        <Button onClick={isRunning ? stopTimer : startTimer} size="icon" className="rounded-full">
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>
      <DurationDropdown />
    </div>
  )
}
