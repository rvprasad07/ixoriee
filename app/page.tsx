"use client";

import React from "react";
import { useLenis } from "@/hooks/useLenis";
import { useThemeShift } from "@/hooks/useThemeShift";
import { DrawerProvider, useDrawer } from "@/context/DrawerContext";
import { DynamicIslandNav } from "@/components/common/DynamicIslandNav";
import { HeroSection } from "@/components/home/HeroSection";
import { TransformationSlider } from "@/components/home/TransformationSlider";
import { ServicesExpandingMatrix } from "@/components/home/ServicesExpandingMatrix";
import { MethodologyGrid } from "@/components/home/MethodologyGrid";
import { SelectedWorksTable } from "@/components/home/SelectedWorksTable";
import { ConversionFooter } from "@/components/home/ConversionFooter";
import { InquiryDrawer } from "@/components/home/InquiryDrawer";

function MainContent() {
  // Initialize Lenis 60-120 FPS inertia scrolling
  useLenis();

  // Initialize GSAP dynamic background color shift on scroll into Selected Works
  useThemeShift();

  const { openDrawer } = useDrawer();

  return (
    <main className="relative min-h-screen transition-colors duration-700">
      {/* Floating Dynamic Island Capsule Navigation */}
      <DynamicIslandNav onOpenDrawer={() => openDrawer()} />

      {/* Section 01: Warm Editorial Hero Section with Masked Typography */}
      <HeroSection />

      {/* Section 02: Flagship Proof Transformation Split Slider */}
      <TransformationSlider />

      {/* Section 03: 4 Core Services Vertical Expanding Matrix */}
      <ServicesExpandingMatrix />

      {/* Section 04: Swiss 3-Step Methodology Grid */}
      <MethodologyGrid />

      {/* Section 05: Selected Works Table & Dual-Column Showcase Modal */}
      <SelectedWorksTable onOpenInquiryDrawer={() => openDrawer()} />

      {/* Section 06: Velocity Marquee & Dark Conversion Footer */}
      <ConversionFooter onOpenInquiryDrawer={() => openDrawer()} />

      {/* Dennis Snellenberg Elastic Slide-Over Inquiry Drawer */}
      <InquiryDrawer />
    </main>
  );
}

export default function Home() {
  return (
    <DrawerProvider>
      <MainContent />
    </DrawerProvider>
  );
}
