"use client"
import 'regenerator-runtime/runtime';
import React, { useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
      }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <>
    {domLoaded && (
            <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => SpeechRecognition.startListening()}>Start</button>
            <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
          </div>
    )}
    </>
  );
};
export default Dictaphone;