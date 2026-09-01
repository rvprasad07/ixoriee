"use client";

import React, { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useThemeShift } from "@/hooks/useThemeShift";
import { DynamicIslandNav } from "@/components/common/DynamicIslandNav";
import { HeroSection } from "@/components/home/HeroSection";
import { TransformationSlider } from "@/components/home/TransformationSlider";
import { ServicesExpandingMatrix } from "@/components/home/ServicesExpandingMatrix";
import { MethodologyGrid } from "@/components/home/MethodologyGrid";
import { SelectedWorksTable } from "@/components/home/SelectedWorksTable";
import { ConversionFooter } from "@/components/home/ConversionFooter";
import { InquiryDrawer } from "@/components/home/InquiryDrawer";

export default function Home() {
  // Initialize Lenis 60-120 FPS inertia scrolling
  useLenis();

  // Initialize GSAP dynamic background color shift on scroll into Selected Works
  useThemeShift();

  // Inquiry drawer state & pre-filled scope
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerInitialScope, setDrawerInitialScope] = useState<string | undefined>(undefined);

  const handleOpenDrawer = (scope?: string) => {
    setDrawerInitialScope(scope);
    setIsDrawerOpen(true);
  };

  return (
    <main className="relative min-h-screen transition-colors duration-700">
      {/* Floating Dynamic Island Capsule Navigation */}
      <DynamicIslandNav onOpenDrawer={() => handleOpenDrawer()} />

      {/* Section 01: Warm Editorial Hero Section with Masked Typography */}
      <HeroSection />

      {/* Section 02: Flagship Proof Transformation Split Slider */}
      <TransformationSlider />

      {/* Section 03: 4 Core Services Vertical Expanding Matrix */}
      <ServicesExpandingMatrix onSelectScope={(scope) => handleOpenDrawer(scope)} />

      {/* Section 04: Swiss 3-Step Methodology Grid */}
      <MethodologyGrid />

      {/* Section 05: Selected Works Table & Dual-Column Showcase Modal */}
      <SelectedWorksTable onOpenInquiryDrawer={() => handleOpenDrawer()} />

      {/* Section 06: Velocity Marquee & Dark Conversion Footer */}
      <ConversionFooter onOpenInquiryDrawer={() => handleOpenDrawer()} />

      {/* Dennis Snellenberg Elastic Slide-Over Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialScope={drawerInitialScope}
      />
    </main>
  );
}
