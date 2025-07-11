import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./loader";

const Computers = () => {
  const computer = useGLTF("./assets/gaming_desktop/scene.gltf");

  return (
    <mesh>
      <primitive
        object={computer.scene}
        // scale={0.75} // Keep scale normal for desktop
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  return (
    <section
      className="w-full h-screen relative md:block hidden bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/herobg.png')" }}
    >
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers />
        </Suspense>
        <Preload all />
      </Canvas>
    </section>
  );
};

export default ComputersCanvas;
