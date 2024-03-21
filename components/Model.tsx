"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import ModelView from "./ModelView";
import { models, sizes, IModel } from "@/constants";
import { animateWithGsapTimeline } from "@/utils/animations";
// import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
// type OrbitControlsType = typeof OrbitControlsImpl

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState<IModel>(models[0]);

  // camera control for the model view
  const cameraControlSmall = useRef<OrbitControlsImpl>();
  const cameraControlLarge = useRef<OrbitControlsImpl>();

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h2 id='heading' className='section-heading'>
          Take a closer look.
        </h2>
        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            {/* <OrbitControls autoRotate ref={cameraControlSmall} /> */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType='view1'
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              model={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType='view2'
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              model={model}
              size={size}
            />
            <Canvas
              className='w-full h-full'
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("app") as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className='mx-auto w-full'>
            <p className='text-sm font-light text-center mb-5'>{model.title}</p>

            <div className='flex-center'>
              <ul className='color-container'>
                {models.map((item, i) => (
                  <li
                    key={i}
                    className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className='size-btn-container'>
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className='size-btn'
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
