"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export const TextMaskReveal: React.FC<TextMaskRevealProps> = ({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Component className={`overflow-hidden block ${className}`}>
      <motion.div
        ref={ref}
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "0%", opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </Component>
  );
};
