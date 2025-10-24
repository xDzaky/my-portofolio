"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

import { Band } from "./band";

type LanyardCanvasProps = {
  className?: string;
  origin?: [number, number, number];
  cameraPosition?: [number, number, number];
};

export function LanyardCanvas({
  className,
  origin,
  cameraPosition = [0.5, 0.4, 13],
}: LanyardCanvasProps) {
  return (
    <div className={className}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: cameraPosition, fov: 25 }}
          className="h-full w-full"
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            debug={false}
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
            <Band origin={origin} />
          </Physics>
          <Environment background blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}
