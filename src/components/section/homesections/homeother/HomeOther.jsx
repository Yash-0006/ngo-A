import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const dropInKeyframes = [
  { transform: "translateY(-200px)", opacity: 0 },
  { transform: "translateY(0)", opacity: 1 },
];

const dropInTiming = {
  duration: 900,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  fill: "forwards",
};

const HomeOther = () => {
  const textRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.animate(dropInKeyframes, dropInTiming);
    }
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      const textWidth = marquee.scrollWidth;
      const containerWidth = marquee.parentElement.offsetWidth;

      const tween = gsap.fromTo(
        marquee,
        { x: -textWidth },
        {
          x: containerWidth,
          duration: 10,
          ease: "linear",
          repeat: -1,
        }
      );
      return () => {
        tween.kill();
      };
    }
  }, []);

  return (
    <div className="overflow-x-hidden relative h-dvh w-screen">
      <div
        className="flex items-center justify-center h-dvh w-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/main1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          minHeight: "100dvh",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="z-50 relative mb-10">
            <p
              ref={textRef}
              className="px-4 text-white text-5xl font-semibold text-center md:text-7xl"
              style={{
                opacity: 0,
                transform: "translateY(-200px)",
                willChange: "transform, opacity",
              }}
            >
              "Here for a Cause"
            </p>
          </div>
        </div>
        <div
          className="pointer-events-none select-none"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100vw",
            overflow: "hidden",
            zIndex: 20,
            height: "60px",
            background: "rgba(0,0,0,0.0)",
          }}
        >
          <div
            ref={marqueeRef}
            style={{
              whiteSpace: "nowrap",
              fontWeight: 100,
              fontSize: "1.5rem",
              color: "#f9a8d4", // light pink (Tailwind pink-300)
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              letterSpacing: "0.1em",
              display: "inline-block",
              willChange: "transform",
              padding: "1rem",
              userSelect: "none",
            }}
          >
            Avasa Foundation &nbsp;•&nbsp; Avasa Foundation &nbsp;•&nbsp; Avasa
            Foundation &nbsp;•&nbsp; Avasa Foundation &nbsp;•&nbsp; Avasa
            Foundation &nbsp;•&nbsp; Avasa Foundation
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOther;
