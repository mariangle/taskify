"use client"

import Typewriter from 'typewriter-effect';

const TypewriterEffect = () => {
    const commands = [
        'Plan doctor appointment at 10 on Tuesday.',
        'Do I have any plans on Monday?',
        'Check for upcoming events this week.',
      ];

  return (
        <Typewriter
        options={{
            strings: commands,
            autoStart: true,
            loop: true,
            delay: 40,
            deleteSpeed: 15
        }}
        />
  );
};

export default TypewriterEffect;
