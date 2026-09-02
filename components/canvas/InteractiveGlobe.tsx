"use client";

import React, { useRef, useEffect } from "react";

export const InteractiveGlobe: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };

    window.addEventListener("resize", handleResize);

    const rings = 20;
    const segments = 28;

    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    interface TriangleFace {
      p1: Point3D;
      p2: Point3D;
      p3: Point3D;
      normalZ: number;
      intensity: number;
    }

    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    const autoSpin = 0.003;

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (
        clientX >= 0 &&
        clientX <= rect.width &&
        clientY >= 0 &&
        clientY <= rect.height
      ) {
        isHovering = true;
        const normX = (clientX / rect.width - 0.5) * 2;
        const normY = (clientY / rect.height - 0.5) * 2;
        targetRotY = normX * 1.3;
        targetRotX = -normY * 0.8;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth damping (lerp)
      if (!isHovering) {
        targetRotY += autoSpin;
      }
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const cx = width / 2;
      const cy = height / 2;
      const currentRadius = Math.min(width, height) * 0.38;

      const faces: TriangleFace[] = [];

      for (let i = 0; i < rings; i++) {
        const phi1 = (i / rings) * Math.PI;
        const phi2 = ((i + 1) / rings) * Math.PI;

        for (let j = 0; j < segments; j++) {
          const theta1 = (j / segments) * 2 * Math.PI;
          const theta2 = ((j + 1) / segments) * 2 * Math.PI;

          const getVertex = (phi: number, theta: number): Point3D => {
            const x0 = Math.sin(phi) * Math.cos(theta);
            const y0 = Math.cos(phi);
            const z0 = Math.sin(phi) * Math.sin(theta);

            const x1 = x0 * cosY + z0 * sinY;
            const z1 = -x0 * sinY + z0 * cosY;

            const y2 = y0 * cosX - z1 * sinX;
            const z2 = y0 * sinX + z1 * cosX;

            return {
              x: cx + x1 * currentRadius,
              y: cy + y2 * currentRadius,
              z: z2,
            };
          };

          const p1 = getVertex(phi1, theta1);
          const p2 = getVertex(phi1, theta2);
          const p3 = getVertex(phi2, theta1);
          const p4 = getVertex(phi2, theta2);

          const avgZ1 = (p1.z + p2.z + p3.z) / 3;
          if (avgZ1 > 0) {
            faces.push({
              p1,
              p2,
              p3,
              normalZ: avgZ1,
              intensity: avgZ1,
            });
          }

          const avgZ2 = (p2.z + p4.z + p3.z) / 3;
          if (avgZ2 > 0) {
            faces.push({
              p1: p2,
              p2: p4,
              p3,
              normalZ: avgZ2,
              intensity: avgZ2,
            });
          }
        }
      }

      faces.sort((a, b) => a.normalZ - b.normalZ);

      for (const face of faces) {
        const factor = Math.max(0.08, face.intensity);
        const centerX = (face.p1.x + face.p2.x + face.p3.x) / 3;
        const centerY = (face.p1.y + face.p2.y + face.p3.y) / 3;

        const shrink = 0.58 * factor;
        const v1x = centerX + (face.p1.x - centerX) * shrink;
        const v1y = centerY + (face.p1.y - centerY) * shrink;
        const v2x = centerX + (face.p2.x - centerX) * shrink;
        const v2y = centerY + (face.p2.y - centerY) * shrink;
        const v3x = centerX + (face.p3.x - centerX) * shrink;
        const v3y = centerY + (face.p3.y - centerY) * shrink;

        ctx.beginPath();
        ctx.moveTo(v1x, v1y);
        ctx.lineTo(v2x, v2y);
        ctx.lineTo(v3x, v3y);
        ctx.closePath();

        const alpha = Math.min(1, Math.max(0.1, factor * 1.05));
        ctx.fillStyle = `rgba(28, 29, 32, ${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[400px] sm:max-h-[400px] md:max-w-[460px] md:max-h-[460px] object-contain select-none"
      />
    </div>
  );
};
