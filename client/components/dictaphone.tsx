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

import SelectMode from '@/components/select-mode';
import DictaphoneButtons from '@/components/dictaphone-buttons';
import Microphone from '@/components/microphone';
import { useRouter } from 'next/navigation';
import { handleError } from '@/helpers/util/error-handler';

const Dictaphone = () => {
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
    if (!command) return;
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

  return (
    <Card className="max-w-[400px] w-full">
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
            <button onClick={sendCommand}>hey</button>
          </div>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className='block'>
          <Textarea 
            variant='faded' 
            label="Command"
            className='whitespace-pre-wrap w-full' 
            description='You have the option to speak into the microphone, type your command, and make edits directly.'
            minRows={1}
            value={command}
            onValueChange={setCommand}
            />
      </CardFooter>
    </Card>
  );
};
export default Dictaphone;
