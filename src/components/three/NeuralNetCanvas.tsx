"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export function NeuralNetCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Check Theme
    const getThemeGoldColor = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      return isDark ? 0x7C5CFC : 0x6847ED;
    };

    // Particles Data
    const particleCount = 65;
    const maxDistance = 65;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const bounds = { x: 260, y: 160, z: 120 };

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    // Points
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const pointMaterial = new THREE.PointsMaterial({
      color: getThemeGoldColor(),
      size: 3.5,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    });

    const pointCloud = new THREE.Points(particleGeometry, pointMaterial);
    scene.add(pointCloud);

    // Line Connections
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: getThemeGoldColor(),
      transparent: true,
      opacity: 0.25,
      blending: THREE.NormalBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Theme change observer
    const themeObserver = new MutationObserver(() => {
      const col = getThemeGoldColor();
      pointMaterial.color.setHex(col);
      lineMaterial.color.setHex(col);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      clock.getDelta();

      const posArray = particleGeometry.attributes.position.array as Float32Array;
      const linePosArray = lineGeometry.attributes.position.array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce at boundaries
        if (Math.abs(posArray[i * 3]) > bounds.x / 2) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > bounds.y / 2) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > bounds.z / 2) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update lines
      let lineIndex = 0;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      // Gentle rotation
      scene.rotation.y += 0.0008;
      scene.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) {
    // Battery-saving elegant SVG neural network placeholder
    return (
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2.5" fill="var(--color-brand)" opacity="0.6" />
              <circle cx="10" cy="20" r="1.5" fill="var(--color-brand)" opacity="0.4" />
              <circle cx="70" cy="60" r="1.5" fill="var(--color-brand)" opacity="0.4" />
              <path d="M10 20 L40 40 L70 60" stroke="var(--color-brand)" strokeWidth="0.8" opacity="0.25" fill="none" />
              <path d="M40 40 L80 10" stroke="var(--color-brand)" strokeWidth="0.8" opacity="0.2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

