"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const timelineData = [
  {
    year: "2022",
    title: "The Beginning of Avasa",
    images: [
      "https://w0.peakpx.com/wallpaper/571/269/HD-wallpaper-a-silent-voice-anime-goals-koe-no-katachi-love-random.jpg",
      "https://w0.peakpx.com/wallpaper/513/42/HD-wallpaper-tenki-no-ko-anime-art-random-sky-waifu.jpg",
      "https://w0.peakpx.com/wallpaper/894/73/HD-wallpaper-tenki-no-ko-anime-art-goals-random-waifu.jpg",
    ],
    content:
      "Avasa was founded by Radha Priyanka in Hyderabad with a vision to support the underprivileged. The year saw heartfelt initiatives like clothes donation drives, online awareness sessions on self-confidence, interactions with orphanages, and food distribution for the needy — laying the foundation for a mission rooted in compassion.",
  },
  {
    year: "2023",
    title: " A New Chapter in Jaipur",
    images: [
      "https://w0.peakpx.com/wallpaper/894/73/HD-wallpaper-tenki-no-ko-anime-art-goals-random-waifu.jpg",
      "https://w0.peakpx.com/wallpaper/733/129/HD-wallpaper-kimetsu-no-yaiba-anime-art-demon-slayer-fantasy-random.jpg",
    ],
    content:
      "In 2023, Avasa was reborn in Jaipur with renewed energy. Radha, joined by her university friends and volunteers, expanded outreach through meaningful interactions with Naya Sawera Orphanage and Sarthak Old Age Home.The team conducted dance classes and bonding sessions with children at Matra Chaya Bal Gruh and connected deeply with residents of a nearby village, Chak, understanding their everyday struggles.Efforts included distributing food and warm clothes to those in need, and engaging with students at the government school in Chak, bringing care, creativity, and community to life through every initiative.",
  },
  {
    year: "2024",
    title: "A Year of Recognition & Formal Milestone",
    images: [
      "https://w0.peakpx.com/wallpaper/514/165/HD-wallpaper-a-silent-voice-anime-girl-goals-koe-no-katachi-love-random-waifu.jpg",
      "https://w0.peakpx.com/wallpaper/891/288/HD-wallpaper-silent-voice-anime-art-koe-no-katachi-love-random.jpg",
    ],
    content:
      "In 2024, Avasa Foundation was officially registered under the Telangana Societies Registration Act (Reg. No. 1108 of 2024), marking a major step in our organizational journey.We celebrated New Year’s with both an orphanage and an old age home, and were honored to be invited by the Chak Government School for their Republic Day and Annual Day celebrations, where we distributed stationery kits and continued regular student engagement.Our ongoing association with Sarthak Old Age Home strengthened, while our Beat the Heat drive distributed 1,000 buttermilk packets across underserved areas.Other initiatives included food donation with Naya Sawera NGO, period kits for women in Chak village, and medical kit distribution in Vaishali Nagar slums — reinforcing our commitment to community wellness and dignity.",
  },
  {
    year: "2025",
    title: "Innovation, Expansion & Continued Commitment",
    images: [
      "https://w0.peakpx.com/wallpaper/41/192/HD-wallpaper-silent-voice-anime-koe-no-kstschi-love-random.jpg",
      "https://w0.peakpx.com/wallpaper/1009/985/HD-wallpaper-chuunibyou-anime-art-beatiful-girl-random-waifu.jpg",
    ],
    content:
      "In 2025, Avasa Foundation continued its mission with renewed energy and innovation.We were honored once again to join the Republic Day celebrations at Chak Government School, where we strengthened our commitment to education by providing a projector, offering much-needed technical support to enhance classroom learning.Building on the success of the previous year, our summer Beat the Heat drive returned with greater scale — distributing over 1,500 buttermilk packets to individuals battling the harsh summer heat across underserved areas.With every initiative, Avasa continues to evolve — combining compassion, community, and sustainable support to uplift lives across generations.

",
  },
];

const transitionVariants = [
  {
    initial: (direction) => ({
      opacity: 0,
      scale: 0.92,
      rotate: direction > 0 ? -15 : 15,
      x: direction > 0 ? 80 : -80,
      y: 0,
      filter: "blur(0px)",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      zIndex: 40,
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.92,
      rotate: direction > 0 ? 15 : -15,
      x: direction > 0 ? -80 : 80,
      y: 0,
      filter: "blur(0px)",
    }),
    transition: { duration: 0.55, ease: "easeInOut" },
  },
  {
    initial: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90,
      scale: 0.95,
      x: 0,
      y: 0,
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      y: 0,
      zIndex: 40,
    },
    exit: (direction) => ({
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90,
      scale: 0.95,
      x: 0,
      y: 0,
    }),
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  {
    initial: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 60 : -60,
      scale: 0.9,
      filter: "blur(6px)",
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      zIndex: 40,
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -60 : 60,
      scale: 0.9,
      filter: "blur(6px)",
    }),
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  {
    initial: (direction) => ({
      opacity: 0,
      scale: 1.2,
      x: 0,
      y: 0,
      filter: "brightness(1.5) grayscale(0.5)",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: "brightness(1) grayscale(0)",
      zIndex: 40,
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.8,
      x: 0,
      y: 0,
      filter: "brightness(0.7) grayscale(0.7)",
    }),
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  {
    initial: (direction) => ({
      opacity: 0,
      rotateX: direction > 0 ? 90 : -90,
      scale: 0.95,
      x: 0,
      y: 0,
    }),
    animate: {
      opacity: 1,
      rotateX: 0,
      scale: 1,
      x: 0,
      y: 0,
      zIndex: 40,
    },
    exit: (direction) => ({
      opacity: 0,
      rotateX: direction > 0 ? -90 : 90,
      scale: 0.95,
      x: 0,
      y: 0,
    }),
    transition: { duration: 0.6, ease: "easeInOut" },
  },
];

function useRandomVariantIndex() {
  const [variantIndex, setVariantIndex] = useState(0);
  useEffect(() => {
    setVariantIndex(Math.floor(Math.random() * transitionVariants.length));
  }, []);
  return [variantIndex, setVariantIndex];
}

const AvasaLogoSVG = (props) => (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke="#a78bfa"
      strokeWidth="4"
      fill="#fff"
    />
    <path
      d="M32 14L44 50H20L32 14Z"
      fill="#6366f1"
      stroke="#a78bfa"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle
      cx="32"
      cy="32"
      r="6"
      fill="#fff"
      stroke="#6366f1"
      strokeWidth="2"
    />
  </svg>
);

const AnimatedImageGallery = ({ images, altTexts = [], imageSize }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [variantIndex, setVariantIndex] = useRandomVariantIndex();
  const [showFallbackLogo, setShowFallbackLogo] = useState(false);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div
        className={`relative ${imageSize}`}
        style={{
          aspectRatio: "1 / 1",
          background: "#fff",
          minWidth: "90px",
          minHeight: "90px",
          maxWidth: "220px",
          maxHeight: "220px",
          width: "100%",
          height: "auto",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={images[0]}
          alt={altTexts[0] || "Gallery image"}
          className={`object-cover object-center w-full h-full rounded-lg border-neutral-200 border dark:border-neutral-700 shadow`}
          style={{
            aspectRatio: "1 / 1",
            background: "#fff",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            objectFit: "cover",
            objectPosition: "center",
          }}
          draggable={false}
        />
      </div>
    );
  }

  const handleNext = () => {
    setDirection(1);
    setVariantIndex(Math.floor(Math.random() * transitionVariants.length));
    setActive((prev) => (prev + 1) % images.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setVariantIndex(Math.floor(Math.random() * transitionVariants.length));
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`
        relative flex items-center
        w-[90px] h-[90px] min-w-[90px] min-h-[90px]
        sm:w-[120px] sm:h-[120px] sm:min-w-[120px] sm:min-h-[120px]
        md:w-[160px] md:h-[160px] md:min-w-[160px] md:min-h-[160px]
        lg:w-[200px] lg:h-[200px] lg:min-w-[200px] lg:min-h-[200px]
        xl:w-[220px] xl:h-[220px] xl:min-w-[220px] xl:min-h-[220px]
        2xl:w-[320px] 2xl:h-[260px] 2xl:min-w-[320px] 2xl:min-h-[260px]
        aspect-square 2xl:aspect-[32/26]
      `}
      style={{
        maxWidth: "320px",
        maxHeight: "260px",
        width: "100%",
        height: "auto",
      }}
    >
      <span
        className="object-contain z-0 absolute inset-0 w-full h-full pointer-events-none"
        style={{
          filter: "blur(0px)",
          objectFit: "contain",
          objectPosition: "center",
          zIndex: 0,
          display: "block",
          opacity: 1,
        }}
        aria-hidden="true"
      >
        {!showFallbackLogo ? (
          <img
            src="/svg/AVASA.svg"
            alt="AVASA Logo"
            className="w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              opacity: 0.25,
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
            draggable={false}
            aria-hidden="true"
            onError={() => setShowFallbackLogo(true)}
          />
        ) : (
          <AvasaLogoSVG
            style={{
              width: "100%",
              height: "100%",
              opacity: 0.25,
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
            className="w-full h-full"
          />
        )}
      </span>
      <motion.div
        key={images[(active - 1 + images.length) % images.length] + "-back"}
        initial={{
          opacity: 0,
          scale: 0.8,
          x: 0,
          y: 60,
          filter: "blur(3px)",
        }}
        animate={{
          opacity: 0.3,
          scale: 0.8,
          x: 0,
          y: 40,
          filter: "blur(3px)",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          x: 0,
          y: 60,
          filter: "blur(3px)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none origin-bottom"
        style={{
          zIndex: 5,
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={images[(active - 1 + images.length) % images.length]}
          alt={
            altTexts[(active - 1 + images.length) % images.length] ||
            "Gallery image"
          }
          width={400}
          height={400}
          draggable={false}
          className={`object-cover object-center w-full h-full rounded-xl border-gray-200 shadow-md border dark:border-neutral-800`}
          style={{
            opacity: 0.3,
            filter: "blur(3px)",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </motion.div>
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={images[active] + "-" + variantIndex}
          custom={direction}
          initial={transitionVariants[variantIndex].initial(direction)}
          animate={transitionVariants[variantIndex].animate}
          exit={transitionVariants[variantIndex].exit(direction)}
          transition={transitionVariants[variantIndex].transition}
          className="absolute inset-0 origin-bottom"
          style={{
            zIndex: 40,
            height: "100%",
            width: "100%",
            perspective: 800,
            opacity: 1,
            filter: "blur(0px)",
            transform: "none",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[active]}
            alt={altTexts[active] || "Gallery image"}
            width={500}
            height={500}
            draggable={false}
            className={`
              object-cover object-center w-full h-full rounded-2xl border-gray-200 shadow-lg border dark:border-neutral-800
            `}
            style={{
              aspectRatio: "1 / 1",
              background: "#fff",
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="z-50 absolute left-0 top-1/2 -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full dark:bg-neutral-800 shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous image"
          type="button"
          style={{ opacity: 0.3 }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="z-50 absolute right-0 top-1/2 -translate-y-1/2">
        <button
          onClick={handleNext}
          className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full dark:bg-neutral-800 shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next image"
          type="button"
          style={{ opacity: 0.3 }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  let scrollYProgress = { get: () => 0 };
  let heightTransform = 0;
  let opacityTransform = 1;
  try {
    const scroll = useScroll({
      target: containerRef,
      offset: ["start 10%", "end 50%"],
    });
    scrollYProgress = scroll.scrollYProgress;
    heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  } catch (e) {
    heightTransform = 0;
    opacityTransform = 1;
  }

  const timelineItems =
    Array.isArray(data) && data.length > 0 ? data : timelineData;

  return (
    <div
      className="pt-16 w-full font-sans bg-white dark:bg-neutral-950 sm:pt-20 md:px-10"
      ref={containerRef}
    >
      <div className="relative mx-auto py-4 px-2 px-4 mt-6 max-w-7xl sm:py-8 md:px-8 lg:px-10">
        <h2 className="mb-1 max-w-4xl text-base text-black text-lg dark:text-white sm:mb-2 md:text-4xl">
          OUR JOURNEY
        </h2>
        <p className="max-w-sm text-neutral-700 text-xs dark:text-neutral-300 sm:text-sm md:text-base">
          THIS IS HOW IT STARTED
        </p>
      </div>
      <div ref={ref} className="relative top-0 mx-auto pb-20 max-w-7xl">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className={`
              flex flex-col md:flex-row justify-start pt-8 sm:pt-12 md:pt-12 md:gap-10
              transition-all
            `}
          >
            <div className="z-40 sticky top-24 relative flex flex-row flex-col items-center self-start mb-2 mb-0 max-w-full w-full max-w-xs sm:top-32 md:top-40 lg:max-w-sm">
              <div className="absolute left-2 flex items-center justify-center h-8 w-8 h-10 w-10 bg-white rounded-full dark:bg-black sm:left-3 md:left-3">
                <div className="p-1.5 h-3.5 w-3.5 h-4 w-4 bg-neutral-200 rounded-full border-neutral-300 dark:bg-neutral-800 border dark:border-neutral-700 sm:p-2" />
              </div>
              <div className="hidden flex-col items-start pl-12 pl-20 sm:pl-16 md:flex">
                <span className="mb-1 text-xl font-extrabold text-purple-600 dark:text-purple-400 sm:text-2xl md:text-3xl">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-neutral-500 text-5xl dark:text-neutral-500 sm:text-xl md:text-2xl">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="relative flex flex-col gap-3 pl-10 pr-2 pl-14 pr-4 w-full transition-all sm:gap-4 md:pl-4">
              <div className="block mb-1 sm:mb-2 md:hidden">
                <span className="text-lg font-extrabold text-purple-600 dark:text-purple-400 sm:text-2xl">
                  {item.year}
                </span>
              </div>
              <h3 className="block mb-2 text-lg text-left font-bold text-white text-2xl sm:mb-4 md:hidden">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-4">
                <AnimatedImageGallery
                  images={item.images || []}
                  altTexts={(item.images || []).map((img, i) =>
                    i === 0
                      ? `${item.title} icon`
                      : `${item.title} image ${i + 1}`
                  )}
                />
              </div>
              <div className="mt-1 text-white text-base sm:mt-2 md:text-md lg:text-lg">
                {item.content}{" "}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="overflow-hidden absolute left-4 top-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] dark:via-neutral-700 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] sm:left-6 md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Timeline;
