"use client";

import 'regenerator-runtime/runtime';
import * as React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mode } from '@/lib/constants';

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
import Microphone from '@/components/microphone';

const Dictaphone = () => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>({
    label: 'Hold-to-talk',
    value: 'hold',
  })
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const {
    transcript,
    listening,
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

  const handleHoldStart = () => {
    startListening();
  };

  const handleHoldEnd = () => {
    SpeechRecognition.stopListening();
  };

  const handleAutoClick = () => {
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }

  const handleManualClick = () => {
    if (!listening) {
      startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader>
        <SelectMode setSelectedMode={setSelectedMode}/>
      </CardHeader>
      <CardBody>
        <Microphone />
      </CardBody>
      <Divider/>
      <CardFooter>
      <div className='flex gap-2'>
          {selectedMode.value === "hold" && (
      <button
        onTouchStart={handleHoldStart}
        onMouseDown={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onMouseUp={handleHoldEnd}
      >Hold to talk</button>
          )}
          {selectedMode.value === "auto" && (
            <Button
              color='primary' size='sm' radius='full'
              onClick={handleAutoClick}
            >
              {listening ? 'Listening...' : 'Start Recording'}
            </Button>
          )}
          {selectedMode.value === "manual" && (
            <Button
              color='primary' size='sm' radius='full'
              onClick={handleManualClick}
            >
              {listening ? 'Stop' : 'Start Recording'}
            </Button>
          )}
            <Button
              color='primary' variant='light' size='sm' radius='full'
              onClick={() => resetTranscript()}
            >
              Clear
            </Button>
        </div>
        { transcript && (<Code color='primary' className='flex flex-wrap'>{transcript}</Code>)}
      </CardFooter>
    </Card>
  );
};
export default Dictaphone;
