"use client";

import 'regenerator-runtime/runtime';
import React from "react";

import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes } from '@/lib/constants';
import { Input } from './ui/input';

import RecordButtons from '@/components/record-buttons';
import TaskPreview from '../app/(platform)/tasks/_components/task-preview';
import { Button } from './ui/button';

import { useRouter } from 'next/navigation';
import { extractNlpTask, handleError } from '@/util';
import { TaskEntry } from '@/types';
import TaskService from '@/services/task-service';

interface PromptLineProps {
  onClose: () => void;
}

const TaskPrompt = ({
  onClose
}: PromptLineProps) => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[0]);
  const [prompt, setPrompt] = React.useState<string>("");
  const [task, setTask] = React.useState<TaskEntry | null>(null);

  React.useEffect(() => {
    const updateTask = async () => {
        const task = await extractNlpTask(prompt);
        setTask(task);
    };
    updateTask();
}, [prompt]);

  const router = useRouter();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();

  const sendPrompt = async () => {
    try {
      if (!task || !task.name) {
        throw new Error("Name is required.");
      }
      await TaskService.createTask(task)
      router.refresh();
      onClose();
    } catch (err) {
      handleError(err)
    }
  };

  const clearPrompt = () => {
    setPrompt("");
    resetTranscript();
  }

  React.useEffect(() => {
    if (transcript) setPrompt((prevPrompt) => prevPrompt + " " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {}

  return (
    <>
        <Input value={prompt ||''} onChange={(e) => setPrompt(e.target.value)} placeholder='Eg. Doctor appointment tomorrow at 2 pm' className='border-none'/>
        <TaskPreview task={task}/>
        <div className='flex-gap'>
          <Button onClick={sendPrompt} variant={'secondary'}>Create Task</Button>
          <Button onClick={clearPrompt} variant={'ghost'}>Clear</Button>
          <RecordButtons selectedMode={selectedMode}/>
        </div>
    </>
  );
};
export default TaskPrompt;
