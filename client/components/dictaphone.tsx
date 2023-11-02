"use client";

import 'regenerator-runtime/runtime';
import * as React from "react";
import { useSpeechRecognition } from 'react-speech-recognition';
import { Mode, modes, languageOptions, Language } from '@/lib/constants';
import { HandleCommand } from '@/lib/actions/handle-command';

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
import SelectLanguage from '@/components/select-language';
import DictaphoneButtons from '@/components/dictaphone-buttons';
import Microphone from '@/components/microphone';

const Dictaphone = () => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>(modes[0])
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(languageOptions[0]);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    finalTranscript
  } = useSpeechRecognition();

  React.useEffect(() => {
    if (!finalTranscript) return;
    try {
        HandleCommand(finalTranscript);
    } catch (error: any) {
        alert(error.message); 
    }
}, [finalTranscript]);

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
        { /* <SelectLanguage setSelectedLanguage={setSelectedLanguage}/> */}
      </CardHeader>
      <Divider />
      <CardBody>
        <Microphone />
        <div className='flex gap-2 w-full mt-4'>
          <div className='flex-1' />
          <DictaphoneButtons selectedMode={selectedMode} selectedLanguage={selectedLanguage}/>
          <div className='flex-1'>
            <Button
              color='primary' radius='full' variant='light' size='sm'
              onClick={resetTranscript}
            >
              Clear
            </Button>
            <button onClick={() => HandleCommand("")}>hey</button>
          </div>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter>
          <Code color='primary' className='whitespace-pre-wrap w-full'>
            {transcript ? transcript : 'Recording not started...'}
          </Code>
      </CardFooter>
    </Card>
  );
};
export default Dictaphone;
