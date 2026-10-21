"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Knot() {
  const group = useRef<THREE.Group>(null);
  const torus = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += delta * 0.28;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.22 + 0.25;
      group.current.position.y = Math.sin(t * 0.9) * 0.08;
      // gentle pointer follow
      const targetX = state.pointer.x * 0.35;
      const targetY = state.pointer.y * 0.25;
      group.current.rotation.z += (targetX - group.current.rotation.z) * 0.04;
      group.current.position.x += (targetY * 0.4 - group.current.position.x) * 0.04;
    }
    if (torus.current) {
      torus.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={group} scale={1.05}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.78, 0.3, 160, 28, 2, 3]} />
        <meshStandardMaterial
          color="#EE0303"
          roughness={0.26}
          metalness={0.42}
          envMapIntensity={0.9}
        />
      </mesh>
      <mesh ref={torus} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[1.62, 0.014, 12, 160]} />
        <meshStandardMaterial color="#484848" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.6, 0.3]}>
        <torusGeometry args={[1.86, 0.006, 8, 160]} />
        <meshStandardMaterial color="#FF3B3B" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

function Fallback({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-red/25 blur-3xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        <defs>
          <linearGradient id="fk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EE0303" />
            <stop offset="60%" stopColor="#C40000" />
            <stop offset="100%" stopColor="#FF3B3B" />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round">
          <path
            d="M100 44c34-6 54 12 54 40s-24 52-54 46-46-24-46-52 20-30 46-34-6-38-30-26S32 88 44 122s44 46 74 32 34-52 14-72-52-14-58 12 14 44 40 40 34-26 22-42"
            stroke="url(#fk)"
            strokeWidth="13"
          />
        </g>
        <circle cx="100" cy="100" r="86" fill="none" stroke="#484848" strokeOpacity="0.4" strokeDasharray="2 8" />
      </svg>
    </div>
  );
}

export function HeroObject({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(true);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
    const lowPower =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;

    if (reduced || lowPower || smallScreen) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !holder.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(true);
        // Pause the render loop once the object scrolls away, so multiple
        // instances never cost GPU time at the same moment.
        setActive(entry.isIntersecting);
      },
      { rootMargin: "120px" },
    );
    observer.observe(holder.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={holder} className={className} aria-hidden>
      {enabled && visible ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5.2], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={active ? "always" : "never"}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 5]} intensity={2.1} color="#ffffff" />
          <directionalLight position={[-4, -2, 2]} intensity={1.1} color="#FF3B3B" />
          <pointLight position={[0, -3, 2]} intensity={1.2} color="#FF8A8A" />
          <Knot />
        </Canvas>
      ) : (
        <Fallback className="h-full w-full" />
      )}
    </div>
  );
}
