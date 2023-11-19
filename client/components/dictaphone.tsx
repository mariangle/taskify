"use client";

import 'regenerator-runtime/runtime';
import * as React from "react";

import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes } from '@/helpers/constants';
import { handleCommand } from '@/helpers/util/cmd-handler';
import { Textarea } from "@nextui-org/react";

import {
  Card, 
  CardHeader,
  CardBody, 
  CardFooter, 
  Divider, 
  Button,
} from "@nextui-org/react";

import SelectMode from './select-mode';
import DictaphoneButtons from './dictaphone-buttons';
import Microphone from './microphone';

import { useRouter } from 'next/navigation';
import { handleError } from '@/helpers/util/error-handler';
import toast from 'react-hot-toast';

const Dictaphone = () => {
  const [mounted, setMounted] = React.useState<boolean>(false)
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[0])
  const [command, setCommand] = React.useState<string>("");
  const router = useRouter();
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const sendCommand = async () => {
    try {
      await handleCommand(command);
      clearCommand();
      router.refresh();
    } catch (err) {
      handleError(err)
    }
  };

  const clearCommand = () => {
    setCommand("");
    resetTranscript();
  }

  React.useEffect(() => {
    setCommand(prevCommand => prevCommand + " " + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    // ...
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Card className="max-w-[400px] w-full flex-1">
      <CardHeader>
        <SelectMode setSelectedMode={setSelectedMode}/>
      </CardHeader>
      <Divider />
      <CardBody>
        <Microphone />
        <div className='flex gap-2 w-full mt-4'>
          <div className='flex-1' />
          <DictaphoneButtons selectedMode={selectedMode}/>
          <div className='flex-1'>
            <Button
              color='primary' radius='full' variant='light' size='sm'
              onClick={clearCommand}
            >
              Clear
            </Button>
          </div>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className='block space-y-4'>
          <Textarea 
            variant='faded' 
            label="Command"
            className='whitespace-pre-wrap w-full' 
            minRows={1}
            value={command}
            onValueChange={setCommand}
            />
            <Button
              color='primary' size='sm' fullWidth
              onClick={sendCommand}
            >
              Schedule
            </Button>
      </CardFooter>
    </Card>
  );
};
export default Dictaphone;
