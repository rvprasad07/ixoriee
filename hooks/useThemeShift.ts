"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useThemeShift() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const darkSection = document.getElementById("dark-theme-trigger");
    if (!darkSection) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: darkSection,
        start: "top 60%",
        end: "bottom bottom",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: "#141416",
            color: "#F4F4F6",
            duration: 0.6,
            ease: "power2.out",
          });
          document.documentElement.classList.add("dark");
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: "#F4F4F0",
            color: "#1C1D20",
            duration: 0.6,
            ease: "power2.out",
          });
          document.documentElement.classList.remove("dark");
        },
      });
    });

    return () => ctx.revert();
  }, []);
}
