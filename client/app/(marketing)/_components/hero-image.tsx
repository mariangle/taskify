'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroImage() {
  const [currentImage, setCurrentImage] = useState('/hero-1.png');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === '/hero-1.png' ? '/hero-2.png' : '/hero-1.png',
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto w-full rounded-xl overflow-hidden border border-primary/50 shadow-2xl shadow-primary/50 mt-8 transition-all duration-500 ease-in-out">
      <Image src={currentImage} alt="awdwda" width={1920} height={1080} />
    </div>
  );
}
