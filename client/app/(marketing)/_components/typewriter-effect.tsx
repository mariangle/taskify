"use client"

import Typewriter from 'typewriter-effect';

export default function TypewriterEffect() {
    const commands = [
        'Add doctor appointment at 10 on Tuesday to my schedule.',
        'Do I have any plans on Monday?',
        'Check for upcoming events this week.',
      ];

  return <Typewriter
            options={{
                strings: commands,
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 15
            }}
    />
};