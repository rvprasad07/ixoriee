"use client";

import React, { useState, useEffect, useRef } from "react";
import { SELECTED_WORKS } from "@/lib/data";
import { ProjectRecord } from "@/types";
import { TextMaskReveal } from "../common/TextMaskReveal";
import { ProjectShowcaseModal } from "./ProjectShowcaseModal";
import { ArrowUpRight, Sparkles, Layers, Cpu, Code2 } from "lucide-react";

// Warm luxury vector preview mockups for floating Lerp modal
const ProjectFloatingThumbnail: React.FC<{ project: ProjectRecord }> = ({ project }) => {
  return (
    <div className="w-full h-full bg-[#1C1D20] p-5 flex flex-col justify-between border border-white/10 text-white select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider">
          {project.title}
        </span>
        <span className="font-mono text-[9px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded">
          {project.year}
        </span>
      </div>

      <div className="space-y-1.5 my-auto">
        <div className="font-sans text-xs font-semibold text-neutral-200 line-clamp-1">
          {project.discipline}
        </div>
        <div className="font-mono text-[10px] text-emerald-400 font-semibold">
          {project.metrics}
        </div>
      </div>

      <div className="font-mono text-[9px] text-neutral-500 flex justify-between pt-2 border-t border-white/5">
        <span>ARCHITECTURAL BUILD</span>
        <span className="text-white">DEPLOYED</span>
      </div>
    </div>
  );
};

interface SelectedWorksTableProps {
  onOpenInquiryDrawer?: () => void;
}

export const SelectedWorksTable: React.FC<SelectedWorksTableProps> = ({
  onOpenInquiryDrawer,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const previewPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const lerpPreview = () => {
      const lerp = 0.08;
      previewPos.current.x += (mousePos.current.x - previewPos.current.x) * lerp;
      previewPos.current.y += (mousePos.current.y - previewPos.current.y) * lerp;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${previewPos.current.x + 20}px, ${
          previewPos.current.y - 100
        }px, 0)`;
      }

      animationFrameId = requestAnimationFrame(lerpPreview);
    };

    animationFrameId = requestAnimationFrame(lerpPreview);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRowClick = (proj: ProjectRecord) => {
    setSelectedProject(proj);
    setIsModalOpen(true);
  };

  return (
    <section
      id="works"
      className="py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative"
    >
      {/* Dynamic Theme Shift Anchor */}
      <div id="dark-theme-trigger" className="w-full h-1 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
        <div>
          <TextMaskReveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>[ SELECTED WORKS &amp; SYSTEMS ]</span>
            </div>
          </TextMaskReveal>
          <TextMaskReveal delay={0.1}>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
              Engineered Deployments
            </h2>
          </TextMaskReveal>
        </div>
        <p className="font-sans text-neutral-400 text-sm md:text-base max-w-md leading-relaxed">
          Production digital platforms and autonomous systems engineered for speed, conversion, and zero operational waste.
        </p>
      </div>

      {/* Rezo Zero Data Table */}
      <div className="w-full">
        <div className="grid grid-cols-12 font-mono text-xs text-neutral-500 border-b border-white/10 pb-4 px-4 uppercase tracking-wider">
          <span className="col-span-6 md:col-span-4">Project / Client</span>
          <span className="hidden md:block md:col-span-5">Core Discipline</span>
          <span className="col-span-3 md:col-span-1">Year</span>
          <span className="col-span-3 md:col-span-2 text-right">Action</span>
        </div>

        <div className="divide-y divide-white/10 border-b border-white/10">
          {SELECTED_WORKS.map((work) => (
            <div
              key={work.id}
              onMouseEnter={() => setHoveredProject(work)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleRowClick(work)}
              className="grid grid-cols-12 items-center py-7 sm:py-8 px-4 group hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
            >
              {/* Col 1: Title */}
              <div className="col-span-6 md:col-span-4">
                <h3 className="font-sans text-lg sm:text-2xl font-semibold text-white group-hover:text-neutral-200 transition-colors">
                  {work.title}
                </h3>
                <span className="md:hidden font-mono text-[11px] text-neutral-400 block mt-1">
                  {work.discipline}
                </span>
              </div>

              {/* Col 2: Core Discipline */}
              <div className="hidden md:block md:col-span-5">
                <span className="font-sans text-sm text-neutral-300 group-hover:text-white transition-colors">
                  {work.discipline}
                </span>
                <span className="font-mono text-[11px] text-neutral-500 block mt-0.5">
                  {work.metrics}
                </span>
              </div>

              {/* Col 3: Year */}
              <div className="col-span-3 md:col-span-1">
                <span className="font-mono text-xs text-neutral-400 bg-white/5 px-2 py-1 rounded">
                  {work.year}
                </span>
              </div>

              {/* Col 4: Action Link */}
              <div className="col-span-3 md:col-span-2 text-right">
                <span className="inline-flex items-center gap-1 font-mono text-xs text-white group-hover:underline">
                  <span>[ View System ]</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Lerp Hover Thumbnail Window (Desktop) */}
      <div
        ref={previewRef}
        className={`fixed top-0 left-0 w-[340px] h-[200px] rounded-2xl overflow-hidden pointer-events-none shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 z-40 transition-opacity duration-300 hidden lg:block ${
          hoveredProject ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ willChange: "transform" }}
      >
        {hoveredProject && <ProjectFloatingThumbnail project={hoveredProject} />}
      </div>

      {/* Dual Column Showcase Modal */}
      <ProjectShowcaseModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenInquiry={() => {
          setIsModalOpen(false);
          if (onOpenInquiryDrawer) onOpenInquiryDrawer();
        }}
      />
    </section>
  );
};
