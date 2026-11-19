'use client';

import React from 'react';
import Image from 'next/image';
import { JewelArt } from './JewelArt';

export interface JewelleryImageProps {
  art: 'necklace' | 'ring' | 'kada';
  image?: null | { src: string; width: number; height: number; alt: string };
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function JewelleryImage({
  art,
  image,
  alt = 'Handcrafted luxury heritage jewellery',
  className = '',
  priority = false,
}: JewelleryImageProps) {
  return (
    <div
      className={`relative w-full aspect-[4/5] overflow-hidden rounded-[12px] bg-[var(--demo-velvet-1,#0A1628)] ${className}`}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt || alt}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <JewelArt art={art} priority={priority} />
      )}
    </div>
  );
}
