"use client";

import 'regenerator-runtime/runtime';
import * as React from "react";

import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes } from '@/helpers/constants';
import { Textarea } from "@nextui-org/react";

import SelectMode from '@/components/select-mode';
import RecordButtons from '@/components/record-buttons';
import TaskPreview from './task-preview';
import { Button } from '@/components/common';

import { useRouter } from 'next/navigation';
import { handleError } from '@/helpers/util/error-handler';
import { extractNlpCommand } from '@/helpers/util/extract-nlp-cmd';

import { TaskEntry } from '@/types';
import TaskService from '@/helpers/services/task-service';
import toast from 'react-hot-toast';

interface CommandLineProps {
  onClose: () => void;
}

const CommandLine = ({
  onClose
}: CommandLineProps) => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[0]);
  const [command, setCommand] = React.useState<string>("");
  const [task, setTask] = React.useState<TaskEntry | null>(null);

  React.useEffect(() => {
    const updateTask = async () => {
        const task = await extractNlpCommand(command);
        setTask(task);
    };

    updateTask();
}, [command]);

  const router = useRouter();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();

  const sendCommand = async () => {
    try {
      if (task){
        await TaskService.createTask(task)
      }
      router.refresh();
      toast.success('Task created!')
      onClose();
    } catch (err) {
      handleError(err)
      console.log(err)
    }
  };

  const clearCommand = () => {
    setCommand("");
    resetTranscript();
  }

  React.useEffect(() => {
    setCommand((prevCommand) => prevCommand + " " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {}

  return (
    <div className='space-y-4'>
      {/*<SelectMode setSelectedMode={setSelectedMode}/>*/}
      <Textarea variant='faded' minRows={2} value={command} onValueChange={setCommand}/>
      <TaskPreview task={task}/>
      <div className='flex items-center gap-2'>
        <Button onClick={sendCommand}>Create Task</Button>
        <Button onClick={clearCommand} variant='light'>Clear</Button>
        <RecordButtons selectedMode={selectedMode}/>
      </div>
    </div>
  );
};
export default CommandLine;
