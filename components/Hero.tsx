"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { smallHeroVideo, heroVideo } from "@/utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const [isScreenAbove760, setIsScreenAbove760] = useState(false);
  const [durationCTA, setDurationCTA] = useState(2);
  const [delayHero, setDelayHero] = useState(1.5);

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760){
      setVideoSrc(smallHeroVideo)
      setDurationCTA(2)
      setDelayHero(1.5)
    }
    else{
      setVideoSrc(heroVideo)
      setDurationCTA(1)
      setDelayHero(0.8)
    }
  }

  const handleResize = () => {
    setIsScreenAbove760(window.innerWidth > 760);
  };

  useEffect(() => {
    handleVideoSrcSet();
    handleResize();

    window.addEventListener('resize', handleVideoSrcSet)
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
      window.removeEventListener('resize', handleResize);
    }
  })

  useGSAP(() => {

    gsap.fromTo('#above-760', {
      opacity: 0,
      delay: 10
    }, {
      opacity: 1,
      duration: 5,
    },)

    gsap.to("#hero", {
      opacity: 1,
      delay: delayHero,
      duration: 0.5,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: durationCTA
    })
  }, [isScreenAbove760]);

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        {" "}
        <h1 id='hero' className='hero-title md:pb-8'>
          iPhone 15 Pro
        </h1>
        <div  className='md:w-10/12 w-9/12'>
          <video
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            className='pointer-events-none'
            id={isScreenAbove760 ? 'above-760' : undefined}
          >
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
