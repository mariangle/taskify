import * as React from 'react';
import { Button } from '@nextui-org/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mode } from '@/lib/constants';

const startListening = () => SpeechRecognition.startListening({ continuous: true });

const DictaphoneButtons: React.FC<{ selectedMode: Mode }> = ({ selectedMode }) => {
  const { listening } = useSpeechRecognition();

  const handleHoldStart = () => {
    startListening();
  };

  const handleHoldEnd = () => {
    SpeechRecognition.stopListening();
  };

  const handleAutoClick = () => {
    if (!listening) {
      startListening();
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
    <div className='flex-1'>
      {selectedMode.value === 'hold' && (
        <button
          onTouchStart={handleHoldStart}
          onMouseDown={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          onMouseUp={handleHoldEnd}
        >
          Hold to talk
        </button>
      )}
      {selectedMode.value === 'auto' && (
        <Button
          color='primary' size='sm' radius='full'
          onClick={handleAutoClick}
        >
          {listening ? 'Listening...' : 'Start Recording'}
        </Button>
      )}
      {selectedMode.value === 'manual' && (
        <Button
          color='primary' radius='full' size='sm'
          onClick={handleManualClick}
        >
          {listening ? 'Stop Recording' : 'Start Recording'}
        </Button>
      )}
    </div>
  );
};

export default DictaphoneButtons;
