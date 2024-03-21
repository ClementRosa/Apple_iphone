'use client'
// https://discourse.threejs.org/t/how-to-get-orbitcontrols-methods-when-using-the-glfloader-react/31531
// https://stackoverflow.com/questions/72011613/three-react-fiber-orbitcontrols-ref-object-throws-error-in-typescript-at-build-p
import { Suspense, useRef, useEffect } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  View
} from "@react-three/drei";
// import { useThree } from '@react-three/fiber'
// import { OrbitControls } from 'three-stdlib'
// import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import Iphone from "./Iphone";

import { IModel } from "@/constants";

interface ModelViewProps {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: any;
  setRotationState: any;
  model: IModel;
  size: string;
}

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  model,
  size,
}) => {

  console.log('Rerender')
  console.log(controlRef)

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0 ,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            model={model}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
