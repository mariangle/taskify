"use client";

import 'regenerator-runtime/runtime';
import * as React from "react";
import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes } from '@/lib/constants';

import {
  Card, 
  CardHeader,
  CardBody, 
  CardFooter, 
  Divider, 
  Code, 
  Button,
} from "@nextui-org/react";

import SelectMode from '@/components/select-mode';
import Buttons from '@/components/dictaphone-buttons';
import Microphone from '@/components/microphone';

const Dictaphone = () => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[1])

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  React.useEffect(() => {
    // ...
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    // ...
  }
  if (!isMicrophoneAvailable) {
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
          <Buttons selectedMode={selectedMode}/>
          <div className='flex-1'>
            <Button
              color='primary' radius='full' variant='light' size='sm'
              onClick={resetTranscript}
            >
              Clear
            </Button>
          </div>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter>
          <Code color='primary' className='flex flex-wrap w-full'>{transcript ? transcript : 'Recording not started...'}</Code>
      </CardFooter>
    </Card>
  );
};
export default Dictaphone;
