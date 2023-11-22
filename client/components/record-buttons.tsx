import React from "react";
import { Button } from './common';
  import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mode } from '@/helpers/constants';

interface DictaphoneButtonsProps {
  selectedMode: Mode,
}

const RecordButtons: React.FC<DictaphoneButtonsProps> = ({ selectedMode }) => {
  const { listening } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };
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
  };

  const handleManualClick = () => {
    if (!listening) {
      startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };
  

  return (
    <>
      {selectedMode.value === 'hold' && (
        <button
          onTouchStart={handleHoldStart}
          onMouseDown={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          onMouseUp={handleHoldEnd}
        >
           {listening ? 'Listening...' : 'Hold-to-talk'}
        </button>
      )}
      {selectedMode.value === 'auto' && (
        <Button
          color='danger'
          variant='flat'
          onClick={handleAutoClick}
        >
          {listening ? 'Listening...' : 'Start Recording'}
        </Button>
      )}
      {selectedMode.value === 'manual' && (
        <Button
          color='danger'
          variant='flat'
          onClick={handleManualClick}
        >
          {listening ? 'Stop Recording' : 'Start Recording'}
        </Button>
      )}
    </>
  );
};

export default RecordButtons;
