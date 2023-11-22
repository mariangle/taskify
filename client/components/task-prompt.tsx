"use client";

import 'regenerator-runtime/runtime';
import React from "react";

import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes } from '@/helpers/constants';
import { Textarea } from "@nextui-org/react";

import SelectMode from '@/components/select-mode';
import RecordButtons from '@/components/record-buttons';
import TaskPreview from '../app/(protected)/tasks/components/task-preview';
import { Button } from '@/components/common';
import { Divider } from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { extractNlpTask, handleError } from '@/helpers/util';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { TaskEntry } from '@/types';
import TaskService from '@/helpers/services/task-service';

interface CommandLineProps {
  onClose: () => void;
}

const TaskPrompt = ({
  onClose
}: CommandLineProps) => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[0]);
  const [command, setCommand] = React.useState<string>("");
  const [task, setTask] = React.useState<TaskEntry | null>(null);

  React.useEffect(() => {
    const updateTask = async () => {
        const task = await extractNlpTask(command);
        setTask(task);
    };
    updateTask();
}, [command]);

  const router = useRouter();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();

  const sendCommand = async () => {
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

  const clearCommand = () => {
    setCommand("");
    resetTranscript();
  }

  React.useEffect(() => {
    if (transcript) setCommand((prevCommand) => prevCommand + " " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {}

  return (
    <Card>
      <CardBody className='space-y-3'>
        <Textarea variant='bordered' minRows={1} value={command ||''} onValueChange={setCommand} placeholder='Eg. Doctor appointment tomorrow at 2 pm'/>
        <TaskPreview task={task}/>
      </CardBody>
      <Divider />
      <CardFooter>
      <Button onClick={sendCommand}>Create Task</Button>
            <Button onClick={clearCommand} variant='light'>Clear</Button>
            <RecordButtons selectedMode={selectedMode}/>
      </CardFooter>
    </Card>
  );
};
export default TaskPrompt;
