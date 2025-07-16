import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// You can add more images here if you want to make it a carousel
const images = ["/main1.jpg", "/maingallery/a.JPG"];

const dropInKeyframes = [
  { transform: "translateY(-200px)", opacity: 0 },
  { transform: "translateY(0)", opacity: 1 },
];

const dropInTiming = {
  duration: 900,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  fill: "forwards",
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 30,
  background: "rgba(0,0,0,0.4)",
  border: "none",
  color: "#fff",
  fontSize: "2.5rem",
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
  userSelect: "none",
};

const HomeOther = () => {
  const textRef = useRef(null);
  const marqueeRef = useRef(null);
  const bgRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Animate text drop-in
  useEffect(() => {
    if (textRef.current) {
      textRef.current.animate(dropInKeyframes, dropInTiming);
    }
  }, []);

  // Animate marquee
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

  // Handle click on background to go to next image
  const handleBgClick = (e) => {
    // Prevent click if clicking on arrow or marquee
    if (
      e.target.closest(".carousel-arrow") ||
      e.target.closest(".marquee-link")
    ) {
      return;
    }
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Handle swipe
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let startX = null;
    let startY = null;
    let isSwiping = false;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
      }
    };

    const onTouchMove = (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          // swipe right
          setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          );
        } else {
          // swipe left
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }
        isSwiping = false;
      }
    };

    const onTouchEnd = () => {
      isSwiping = false;
    };

    bg.addEventListener("touchstart", onTouchStart, { passive: true });
    bg.addEventListener("touchmove", onTouchMove, { passive: true });
    bg.addEventListener("touchend", onTouchEnd);

    return () => {
      bg.removeEventListener("touchstart", onTouchStart);
      bg.removeEventListener("touchmove", onTouchMove);
      bg.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Keyboard navigation (optional, for accessibility)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // --- Removed renderDots and its usage ---

  return (
    <div className="overflow-x-hidden relative h-dvh w-screen">
      <div
        ref={bgRef}
        className="flex items-center justify-center h-dvh w-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${images[currentIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          minHeight: "100dvh",
          cursor: "pointer",
          transition: "background-image 0.5s",
        }}
        onClick={handleBgClick}
        tabIndex={-1}
      >
        {/* Left Arrow */}
        <button
          className="left-4 carousel-arrow"
          style={{ ...arrowStyle, left: "1.5rem" }}
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            );
          }}
        >
          {/* Arrow symbol removed */}
        </button>
        {/* Right Arrow */}
        <button
          className="right-4 carousel-arrow"
          style={{ ...arrowStyle, right: "1.5rem" }}
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % images.length);
          }}
        >
          {/* Arrow symbol removed */}
        </button>
        {/* Invisible Dots removed */}

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
          className="select-none"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100vw",
            overflow: "hidden",
            zIndex: 20,
            height: "60px",
            background: "rgba(0,0,0,0.0)",
            pointerEvents: "auto", // allow pointer events
          }}
        >
          <Link
            href="/contactus/map"
            ref={marqueeRef}
            className="marquee-link"
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
              textDecoration: "none",
              cursor: "pointer",
              pointerEvents: "auto", // allow pointer events on link
            }}
            tabIndex={0}
            scroll={false}
          >
            Event updates coming soon &nbsp;•&nbsp; Stay tuned for upcoming
            events &nbsp;•&nbsp; Event updates coming soon &nbsp;•&nbsp; Stay
            tuned for upcoming events &nbsp;•&nbsp; Avasa Foundation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeOther;
