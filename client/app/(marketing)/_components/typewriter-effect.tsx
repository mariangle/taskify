'use client';

import Typewriter from 'typewriter-effect';

export default function TypewriterEffect() {
  const words = [
    'efficiency',
    'productivity',
    'workflow',
    'performance',
    'proficiency',
  ];

  return (
    <Typewriter
      options={{
        strings: words,
        autoStart: true,
        cursor: '',
        loop: true,
        delay: 50,
        deleteSpeed: 100,
      }}
    />
  );
}
