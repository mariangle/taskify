'use client';

import Typewriter from 'typewriter-effect';

export default function TypewriterEffect() {
  const words = ['Natural Language Processing'];

  return (
    <Typewriter
      options={{
        strings: words,
        autoStart: true,
        cursor: '',
        loop: true,
        delay: 50,
        deleteSpeed: 20,
      }}
    />
  );
}
