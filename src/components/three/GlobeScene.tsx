"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export function GlobeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const getThemeGold = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      return isDark ? 0x7C5CFC : 0x6847ED;
    };

    // Low-poly Icosahedron Geometry
    const geometry = new THREE.IcosahedronGeometry(1.9, 0);

    // Wireframe
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: getThemeGold(),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Inner glowing sphere/geometry
    const innerGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: getThemeGold(),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Vertices points
    const vertices = geometry.attributes.position.array;
    const vertexPointsGeom = new THREE.BufferGeometry();
    vertexPointsGeom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const vertexPointsMat = new THREE.PointsMaterial({
      color: getThemeGold(),
      size: 0.12,
      transparent: true,
      opacity: 0.95,
    });
    const pointsMesh = new THREE.Points(vertexPointsGeom, vertexPointsMat);
    scene.add(pointsMesh);

    // IntersectionObserver to avoid rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Theme change listener
    const themeObserver = new MutationObserver(() => {
      const col = getThemeGold();
      wireframeMaterial.color.setHex(col);
      innerMaterial.color.setHex(col);
      vertexPointsMat.color.setHex(col);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Animation
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      if (!prefersReducedMotion) {
        wireframe.rotation.x += 0.003;
        wireframe.rotation.y += 0.0045;

        innerMesh.rotation.x -= 0.002;
        innerMesh.rotation.y -= 0.003;

        pointsMesh.rotation.x += 0.003;
        pointsMesh.rotation.y += 0.0045;
      }

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
      geometry.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      vertexPointsGeom.dispose();
      vertexPointsMat.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center">
      {/* Subtle ambient violet radial halo */}
      <div
        className="absolute inset-4 rounded-full pointer-events-none filter blur-2xl opacity-20 bg-[#7C5CFC]"
        aria-hidden="true"
      />
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

