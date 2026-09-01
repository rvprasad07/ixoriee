"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(0.85)`;
      }
    };

    const onMouseUp = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(1)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], [data-cursor-hover], input, textarea, select");
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text") || "";
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousemove", checkHoverTarget);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId: number;

    const render = () => {
      const lerp = 0.08;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.4;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.4;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", checkHoverTarget);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot (Mix-Blend Mode Difference for Editorial Inversion) */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-black dark:bg-white z-[9999] transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />

      {/* Atmospheric Lerp Ring */}
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 rounded-full border z-[9998] flex items-center justify-center transition-all duration-200 ${
          isHovered
            ? "-ml-6 -mt-6 w-12 h-12 bg-black/5 dark:bg-white/10 border-black/30 dark:border-white/30 backdrop-blur-[0.5px]"
            : "-ml-4 -mt-4 w-8 h-8 bg-transparent border-black/20 dark:border-white/20"
        }`}
        style={{ willChange: "transform" }}
      >
        {hoverText && (
          <span className="font-mono text-[9px] uppercase tracking-tighter text-black dark:text-white font-bold">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
};
