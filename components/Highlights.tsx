"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import VideoCarousel from "./VideoCarousel";
import { watchImg, rightImg } from "@/utils";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 1,
    });
    gsap.to(".link", {
      opacity: 1,
      y: 1,
      delay: 0.6,
      duration: 1,
      stagger: 0.25
    });
  }, []);

  return (
    <section
      id='highlights'
      className='w-screen overflow-hidden common-padding h-full bg-zinc '
    >
      <div className='screen-max-width '>
        <div className='mb-12 w-full md:flex items-end justify-between'>
          <h2 id='title' className='section-heading'>
            Get the highlights.
          </h2>
          <div className='flex flex-wrap items-end gap-5'>
            <p className="link">Watch the film
            <Image  className="ml-2"src={watchImg} alt="Watch the film" width={16} height={16} />
            </p>
            <p className="link">Watch the event
            <Image  className="ml-2" src={rightImg} alt="Watch the event" width={7} height={7} />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
