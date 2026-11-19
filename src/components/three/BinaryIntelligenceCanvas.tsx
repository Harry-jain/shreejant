"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

interface AiChipProps {
  className?: string;
}

export function BinaryIntelligenceCanvas({ className = "" }: AiChipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = Math.max(-1.0, Math.min(1.0, x));
      mouseRef.current.targetY = Math.max(-1.0, Math.min(1.0, y));
      mouseRef.current.isHovered =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;
    let isCleanedUp = false;

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 720;
    const aspect = width / height;

    // 1. Perspective Camera — Calibrated for isometric 3D floating chip with zero edge clipping
    const scene = new THREE.Scene();
    const baseZ = 8.2;
    const fitZ = aspect < 1.0 ? baseZ / Math.max(aspect, 0.72) : baseZ;

    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(0, 1.2, fitZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    // Electric Violet & Titanium Obsidian Colors (SickDevs Theme)
    const colorBronze = new THREE.Color("#5B3FD4");     // Deep electric violet
    const colorGold = new THREE.Color("#7C5CFC");       // Signature brand violet
    const colorGoldBright = new THREE.Color("#9D84FF"); // Radiant violet highlight
    const colorChampagne = new THREE.Color("#C4B5FD");  // Pale violet highlight
    const colorWhiteGold = new THREE.Color("#F5F3FF");  // Firing signal energy photon
    const colorSubstrate = new THREE.Color("#0A0D15");  // Deep titanium obsidian substrate
    const colorCyan = new THREE.Color("#38BDF8");       // Cyan high-velocity signal trace
    const colorSilver = new THREE.Color("#CBD5E1");     // Silicon chrome contact pins

    // Parent Pivot Group (Handles isometric tilt, floating levitation, and mouse parallax)
    const pivotGroup = new THREE.Group();
    pivotGroup.position.set(-0.1, 0.0, 0);
    scene.add(pivotGroup);

    // Child Chip Group (Performs continuous 360° showcase rotation around its center)
    const chipGroup = new THREE.Group();
    pivotGroup.add(chipGroup);

    // 2. Texture Generator: Glowing Energy Photon
    const createGlowTexture = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      const center = size / 2;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, center * 0.95);
      gradient.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
      gradient.addColorStop(0.2, "rgba(200, 185, 255, 0.95)");
      gradient.addColorStop(0.5, "rgba(124, 92, 252, 0.65)");
      gradient.addColorStop(0.8, "rgba(91, 63, 212, 0.2)");
      gradient.addColorStop(1.0, "rgba(91, 63, 212, 0.0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(center, center, center * 0.95, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 3. Central Silicon AI Die Texture: Luminous Tensor Matrix Core
    const createDieTexture = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      // Deep silicon wafer background with subtle violet gradient
      const bgGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
      bgGrad.addColorStop(0.0, "#1F1535");
      bgGrad.addColorStop(0.7, "#0F0B1E");
      bgGrad.addColorStop(1.0, "#080612");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, size, size);

      // Violet border trim
      ctx.strokeStyle = "#7C5CFC";
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, size - 24, size - 24);

      ctx.strokeStyle = "rgba(124, 92, 252, 0.4)";
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 24, size - 48, size - 48);

      // 4x4 Tensor Neural Processing Units (NPUs)
      const gridSize = 4;
      const cellSize = 68;
      const startOffset = (size - (gridSize * cellSize + (gridSize - 1) * 16)) / 2;

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const cx = startOffset + c * (cellSize + 16);
          const cy = startOffset + r * (cellSize + 16);

          ctx.fillStyle = "rgba(124, 92, 252, 0.15)";
          ctx.fillRect(cx, cy, cellSize, cellSize);

          ctx.strokeStyle = "rgba(157, 132, 255, 0.45)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cx, cy, cellSize, cellSize);

          // Inner sub-core dot
          ctx.fillStyle = (r + c) % 2 === 0 ? "#38BDF8" : "#9D84FF";
          ctx.beginPath();
          ctx.arc(cx + cellSize / 2, cy + cellSize / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Center Brand Etching: "SHREEJAN NPU"
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = "bold 24px 'Space Grotesk', -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SHREEJAN NPU", 256, 42);

      ctx.font = "600 13px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "rgba(157, 132, 255, 0.85)";
      ctx.fillText("TENSOR GEN-AI ENGINE", 256, size - 40);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    const dieTexture = createDieTexture();

    // 4. Physical Layer 1: Bottom Multi-Layer Substrate (PCB Package)
    const substrateWidth = 3.6;
    const substrateHeight = 0.14;
    const substrateDepth = 3.6;

    const substrateGeo = new THREE.BoxGeometry(substrateWidth, substrateHeight, substrateDepth);
    const substrateMat = new THREE.MeshBasicMaterial({
      color: colorSubstrate,
    });
    const substrateMesh = new THREE.Mesh(substrateGeo, substrateMat);
    substrateMesh.position.y = -0.07;
    chipGroup.add(substrateMesh);

    // Substrate Edge Wireframe Trim in Violet
    const substrateEdges = new THREE.EdgesGeometry(substrateGeo);
    const edgeMatGold = new THREE.LineBasicMaterial({
      color: colorGold,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5,
    });
    const substrateEdgesMesh = new THREE.LineSegments(substrateEdges, edgeMatGold);
    substrateMesh.add(substrateEdgesMesh);

    // 5. Physical Layer 2: Silver/Chrome Pins along Perimeter
    const pinGroup = new THREE.Group();
    chipGroup.add(pinGroup);

    const pinGeo = new THREE.BoxGeometry(0.08, 0.06, 0.14);
    const pinMat = new THREE.MeshBasicMaterial({
      color: colorSilver,
    });

    const pinsPerSide = 18;
    const pinSpacing = (substrateWidth - 0.4) / (pinsPerSide - 1);
    const pinOffset = substrateWidth * 0.5 + 0.04;

    for (let p = 0; p < pinsPerSide; p++) {
      const coord = -substrateWidth * 0.5 + 0.2 + p * pinSpacing;

      // North side
      const pinN = new THREE.Mesh(pinGeo, pinMat);
      pinN.position.set(coord, -0.04, -pinOffset);
      pinGroup.add(pinN);

      // South side
      const pinS = new THREE.Mesh(pinGeo, pinMat);
      pinS.position.set(coord, -0.04, pinOffset);
      pinGroup.add(pinS);

      // East side
      const pinE = new THREE.Mesh(pinGeo, pinMat);
      pinE.rotation.y = Math.PI / 2;
      pinE.position.set(pinOffset, -0.04, coord);
      pinGroup.add(pinE);

      // West side
      const pinW = new THREE.Mesh(pinGeo, pinMat);
      pinW.rotation.y = Math.PI / 2;
      pinW.position.set(-pinOffset, -0.04, coord);
      pinGroup.add(pinW);
    }

    // 6. Physical Layer 3: Raised Silicon Interposer & Central AI Die
    const interposerWidth = 2.4;
    const interposerDepth = 2.4;
    const interposerGeo = new THREE.BoxGeometry(interposerWidth, 0.08, interposerDepth);
    const interposerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0F0B1E"),
    });
    const interposerMesh = new THREE.Mesh(interposerGeo, interposerMat);
    interposerMesh.position.y = 0.04;
    chipGroup.add(interposerMesh);

    const interposerEdges = new THREE.EdgesGeometry(interposerGeo);
    const interposerEdgeLine = new THREE.LineSegments(interposerEdges, edgeMatGold);
    interposerMesh.add(interposerEdgeLine);

    // Central Monolithic Silicon Die
    const dieWidth = 1.6;
    const dieDepth = 1.6;
    const dieGeo = new THREE.PlaneGeometry(dieWidth, dieDepth);
    const dieMat = new THREE.MeshBasicMaterial({
      map: dieTexture,
      transparent: true,
      opacity: 0.95,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.rotation.x = -Math.PI / 2;
    dieMesh.position.y = 0.082;
    chipGroup.add(dieMesh);

    // Glowing Power Overlay for the Central Tensor Die
    const tensorGlowGeo = new THREE.PlaneGeometry(1.62, 1.62);
    const tensorGlowMat = new THREE.MeshBasicMaterial({
      map: dieTexture,
      color: colorGoldBright,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const tensorGlowMesh = new THREE.Mesh(tensorGlowGeo, tensorGlowMat);
    tensorGlowMesh.rotation.x = -Math.PI / 2;
    tensorGlowMesh.position.y = 0.084;
    chipGroup.add(tensorGlowMesh);

    // 7. Geometric Circuit Traces (Orthogonal & 45° Busways fanning into the Die)
    const traceCurves: THREE.CatmullRomCurve3[] = [];
    const tracesGroup = new THREE.Group();
    chipGroup.add(tracesGroup);

    const traceMatDormant = new THREE.LineBasicMaterial({
      color: colorBronze,
      transparent: true,
      opacity: 0.45,
      linewidth: 1.2,
    });
    const traceMatActive = new THREE.LineBasicMaterial({
      color: colorCyan,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.8,
    });

    // Generate incoming signal traces from outer pins to central die edge
    const traceCount = 36;
    for (let t = 0; t < traceCount; t++) {
      const side = t % 4; // 0: Top, 1: Right, 2: Bottom, 3: Left
      const frac = ((t % 9) + 1) / 10;
      const sign = (t % 2 === 0 ? 1 : -1);

      let pOuter: THREE.Vector3;
      let pCorner1: THREE.Vector3;
      let pCorner2: THREE.Vector3;
      let pInner: THREE.Vector3;

      const yLevel = 0.045;

      if (side === 0) {
        // North
        const xPos = -1.6 + frac * 3.2;
        pOuter = new THREE.Vector3(xPos, yLevel, -1.75);
        pCorner1 = new THREE.Vector3(xPos, yLevel, -1.35);
        pCorner2 = new THREE.Vector3(xPos * 0.55, yLevel, -1.05);
        pInner = new THREE.Vector3(xPos * 0.45, yLevel, -0.78);
      } else if (side === 1) {
        // East
        const zPos = -1.6 + frac * 3.2;
        pOuter = new THREE.Vector3(1.75, yLevel, zPos);
        pCorner1 = new THREE.Vector3(1.35, yLevel, zPos);
        pCorner2 = new THREE.Vector3(1.05, yLevel, zPos * 0.55);
        pInner = new THREE.Vector3(0.78, yLevel, zPos * 0.45);
      } else if (side === 2) {
        // South
        const xPos = -1.6 + frac * 3.2;
        pOuter = new THREE.Vector3(xPos, yLevel, 1.75);
        pCorner1 = new THREE.Vector3(xPos, yLevel, 1.35);
        pCorner2 = new THREE.Vector3(xPos * 0.55, yLevel, 1.05);
        pInner = new THREE.Vector3(xPos * 0.45, yLevel, 0.78);
      } else {
        // West
        const zPos = -1.6 + frac * 3.2;
        pOuter = new THREE.Vector3(-1.75, yLevel, zPos);
        pCorner1 = new THREE.Vector3(-1.35, yLevel, zPos);
        pCorner2 = new THREE.Vector3(-1.05, yLevel, zPos * 0.55);
        pInner = new THREE.Vector3(-0.78, yLevel, zPos * 0.45);
      }

      const points = [pOuter, pCorner1, pCorner2, pInner];
      const curve = new THREE.CatmullRomCurve3(points, false, "chordal", 0.1);
      traceCurves.push(curve);

      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const line = new THREE.Line(curveGeo, t % 3 === 0 ? traceMatActive : traceMatDormant);
      tracesGroup.add(line);
    }

    // 8. External Energy Signal Beams (Data Rays Converging From Outer Space into the Chip)
    const incomingSignalCurves: THREE.CatmullRomCurve3[] = [];
    const incomingBeamsGroup = new THREE.Group();
    chipGroup.add(incomingBeamsGroup);

    const beamCount = 28;
    for (let b = 0; b < beamCount; b++) {
      const angle = (b / beamCount) * Math.PI * 2;
      const dist = 3.8 + Math.random() * 2.2;
      const height = 0.8 + Math.random() * 1.8;

      // Outer origin point high up in space
      const pStart = new THREE.Vector3(
        Math.cos(angle) * dist,
        height,
        Math.sin(angle) * dist
      );

      // Mid arc waypoint
      const pMid = new THREE.Vector3(
        Math.cos(angle) * (dist * 0.55),
        height * 0.45,
        Math.sin(angle) * (dist * 0.55)
      );

      // Target pin on the chip edge
      const targetPinIdx = b % traceCount;
      const pTarget = traceCurves[targetPinIdx].getPoint(0.0);

      const beamCurve = new THREE.QuadraticBezierCurve3(pStart, pMid, pTarget);
      incomingSignalCurves.push(new THREE.CatmullRomCurve3(beamCurve.getPoints(16)));

      // Subtle incoming laser trajectory line
      const beamGeo = new THREE.BufferGeometry().setFromPoints(beamCurve.getPoints(24));
      const beamMat = new THREE.LineBasicMaterial({
        color: colorGold,
        transparent: true,
        opacity: 0.28,
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      incomingBeamsGroup.add(beamLine);
    }

    // 9. Active Traveling Energy Signals (Incoming Data Photons + In-Chip Photons)
    interface EnergySignal {
      type: "incoming" | "in_chip";
      curveIdx: number;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
    }

    const energySignals: EnergySignal[] = [];
    const photonGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const photonMat = new THREE.MeshBasicMaterial({
      color: colorWhiteGold,
      transparent: true,
      opacity: 0.98,
    });

    // 32 incoming high-speed signals racing from outside into the chip
    for (let i = 0; i < 32; i++) {
      const curveIdx = Math.floor(Math.random() * incomingSignalCurves.length);
      const mesh = new THREE.Mesh(photonGeo, photonMat);
      mesh.scale.setScalar(0.9 + Math.random() * 0.7);
      chipGroup.add(mesh);

      energySignals.push({
        type: "incoming",
        curveIdx,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.009, // Fast incoming velocity
        mesh,
      });
    }

    // 40 signals routing along circuit traces straight into the core die
    for (let c = 0; c < 40; c++) {
      const curveIdx = Math.floor(Math.random() * traceCurves.length);
      const mesh = new THREE.Mesh(photonGeo, photonMat);
      mesh.scale.setScalar(0.8 + Math.random() * 0.6);
      chipGroup.add(mesh);

      energySignals.push({
        type: "in_chip",
        curveIdx,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.007,
        mesh,
      });
    }

    // 10. Central Power-Up Energy Core & Luminous Shockwave Rings
    // Core light glow sprite
    const coreCanvas = document.createElement("canvas");
    coreCanvas.width = 128;
    coreCanvas.height = 128;
    const cctx = coreCanvas.getContext("2d");
    if (cctx) {
      const cGrad = cctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      cGrad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
      cGrad.addColorStop(0.2, "rgba(200, 185, 255, 0.95)");
      cGrad.addColorStop(0.5, "rgba(157, 132, 255, 0.6)");
      cGrad.addColorStop(0.8, "rgba(124, 92, 252, 0.2)");
      cGrad.addColorStop(1.0, "rgba(124, 92, 252, 0.0)");
      cctx.fillStyle = cGrad;
      cctx.fillRect(0, 0, 128, 128);
    }
    const coreTex = new THREE.CanvasTexture(coreCanvas);
    const coreSpriteMat = new THREE.SpriteMaterial({
      map: coreTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const coreGlowSprite = new THREE.Sprite(coreSpriteMat);
    coreGlowSprite.scale.set(3.8, 3.8, 1.0);
    coreGlowSprite.position.set(0, 0.18, 0);
    chipGroup.add(coreGlowSprite);

    // Expanding Power Shockwave Rings (radiating when powered up)
    const shockwaveCount = 3;
    const shockwaves: { mesh: THREE.Mesh; scale: number; opacity: number }[] = [];
    const ringGeo = new THREE.RingGeometry(0.2, 0.28, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorGoldBright,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    });

    for (let r = 0; r < shockwaveCount; r++) {
      const ringMesh = new THREE.Mesh(ringGeo, ringMat.clone());
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.09;
      chipGroup.add(ringMesh);
      shockwaves.push({
        mesh: ringMesh,
        scale: 1.0 + r * 1.2,
        opacity: 0.0,
      });
    }

    // 11. Floating Quantum Data Motes (Golden Ambient Particles Hovering Above Chip)
    const moteCount = 110;
    const motePositions = new Float32Array(moteCount * 3);
    const moteVelocities: THREE.Vector3[] = [];

    for (let m = 0; m < moteCount; m++) {
      motePositions[m * 3] = (Math.random() - 0.5) * 4.2;
      motePositions[m * 3 + 1] = 0.15 + Math.random() * 1.5;
      motePositions[m * 3 + 2] = (Math.random() - 0.5) * 4.2;

      moteVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          0.002 + Math.random() * 0.003, // Gently ascending
          (Math.random() - 0.5) * 0.003
        )
      );
    }

    const moteGeometry = new THREE.BufferGeometry();
    moteGeometry.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));

    const moteMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: glowTexture,
      color: colorChampagne,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const ambientMotes = new THREE.Points(moteGeometry, moteMaterial);
    chipGroup.add(ambientMotes);

    // 12. Intersection Observer (Pause when off-screen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 13. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 620;
      const newHeight = container.clientHeight || 680;
      const newAspect = newWidth / newHeight;

      camera.aspect = newAspect;
      const dynFitZ = newAspect < 1.0 ? baseZ / Math.max(newAspect, 0.72) : baseZ;
      camera.position.z = dynFitZ;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener("resize", handleResize);

    // 14. Animation Loop: Power-Up Cycles & Continuous Data Traffic
    const clock = new THREE.Clock();

    const animate = () => {
      if (isCleanedUp) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      const isMotionReduced = Boolean(prefersReducedMotion);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!isMotionReduced) {
        // Continuous smooth 360° showcase rotation around normal axis (~24s per full revolution)
        const spinSpeed = 0.26;
        chipGroup.rotation.y = elapsedTime * spinSpeed;

        // Slow majestic floating zero-gravity levitation
        const floatY = Math.sin(elapsedTime * 1.2) * 0.08;
        pivotGroup.position.y = floatY;

        // Cinematic isometric tilt with interactive mouse parallax
        const baseTiltX = 0.88 + Math.sin(elapsedTime * 0.4) * 0.025;
        const baseRotateZ = -0.38 + Math.cos(elapsedTime * 0.35) * 0.025;
        pivotGroup.rotation.x = baseTiltX - mouseRef.current.y * 0.22;
        pivotGroup.rotation.z = baseRotateZ + mouseRef.current.x * 0.22;

        // Power-Up Pulse Cycle (3.5 second loop):
        // 0s-2s: Incoming signals accelerate and charge the die
        // 2s: Full power surge / ignition shockwave!
        // 2s-3.5s: Intense glowing resonance
        const cyclePeriod = 3.6;
        const cycleProgress = (elapsedTime % cyclePeriod) / cyclePeriod;

        // Core light pulse & brightness
        const powerSurge = Math.pow(Math.sin(cycleProgress * Math.PI), 2.5);
        coreSpriteMat.opacity = 0.55 + powerSurge * 0.45;
        const coreScale = 3.2 + powerSurge * 1.4;
        coreGlowSprite.scale.set(coreScale, coreScale, 1.0);

        // Power-Up Die & Circuit Trace Lighting
        tensorGlowMat.opacity = powerSurge * 0.85;
        traceMatActive.opacity = 0.65 + powerSurge * 0.35;
        traceMatDormant.opacity = 0.3 + powerSurge * 0.3;

        // Advance Shockwave Expansion
        shockwaves.forEach((sw, idx) => {
          const swPhase = (cycleProgress + idx * 0.33) % 1.0;
          sw.scale = 0.8 + swPhase * 4.2;
          sw.mesh.scale.set(sw.scale, sw.scale, 1.0);
          const swMat = sw.mesh.material as THREE.MeshBasicMaterial;
          swMat.opacity = Math.sin(swPhase * Math.PI) * 0.55;
        });

        // Advance Energy Signals
        const speedBoost = mouseRef.current.isHovered ? 1.6 : 1.0;
        energySignals.forEach((sig) => {
          sig.progress += sig.speed * speedBoost;

          if (sig.progress >= 1.0) {
            sig.progress = 0.0;
            // When an incoming signal arrives at the chip edge, transition into chip trace
            if (sig.type === "incoming") {
              sig.curveIdx = Math.floor(Math.random() * incomingSignalCurves.length);
            } else {
              sig.curveIdx = Math.floor(Math.random() * traceCurves.length);
            }
          }

          const curve =
            sig.type === "incoming"
              ? incomingSignalCurves[sig.curveIdx]
              : traceCurves[sig.curveIdx];

          if (curve) {
            const pos = curve.getPoint(sig.progress);
            sig.mesh.position.copy(pos);
          }
        });

        // Drift Floating Quantum Motes
        const posAttr = moteGeometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let m = 0; m < moteCount; m++) {
          const vel = moteVelocities[m];
          arr[m * 3] += vel.x;
          arr[m * 3 + 1] += vel.y;
          arr[m * 3 + 2] += vel.z;

          // Wrap back to bottom if ascended too high
          if (arr[m * 3 + 1] > 1.8) {
            arr[m * 3 + 1] = 0.15;
            arr[m * 3] = (Math.random() - 0.5) * 3.8;
            arr[m * 3 + 2] = (Math.random() - 0.5) * 3.8;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      // Clean up Three.js resources
      glowTexture.dispose();
      dieTexture.dispose();
      coreTex.dispose();
      substrateGeo.dispose();
      substrateMat.dispose();
      substrateEdges.dispose();
      edgeMatGold.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      interposerGeo.dispose();
      interposerMat.dispose();
      interposerEdges.dispose();
      dieGeo.dispose();
      dieMat.dispose();
      tensorGlowGeo.dispose();
      tensorGlowMat.dispose();
      traceMatDormant.dispose();
      traceMatActive.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      ringGeo.dispose();
      coreSpriteMat.dispose();
      moteGeometry.dispose();
      moteMaterial.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[720px] xl:max-w-[760px] h-[520px] sm:h-[620px] lg:h-[680px] xl:h-[740px] flex items-center justify-center overflow-visible select-none pointer-events-auto ${className}`}
      style={{
        background: "transparent",
      }}
      aria-label="3D Interactive AI Chip — Shreejan AI Solutions"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing border-0 outline-none"
        style={{
          background: "transparent",
        }}
      />
    </div>
  );
}
