"use client";

import { useState, useRef, useCallback } from "react";

interface MagneticOffset {
  x: number;
  y: number;
}

export function useMagnetic(strength = 0.35, activationRadius = 45) {
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < activationRadius + Math.max(rect.width, rect.height) / 2) {
        setOffset({
          x: deltaX * strength,
          y: deltaY * strength,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    [strength, activationRadius]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { elementRef, offset, handleMouseMove, handleMouseLeave };
}
