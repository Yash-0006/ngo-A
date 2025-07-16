import React, { useRef, useEffect } from "react";

const videos = [
  {
    src: "/vedios/1.mp4",
    type: "video/mp4",
    poster: "/vedios/1.jpg",
  },
  {
    src: "/vedios/02.mp4",
    type: "video/mp4",
    poster: "/vedios/2.jpg",
  },
  {
    src: "/vedios/03.mp4",
    type: "video/mp4",
    poster: "/vedios/3.jpg",
  },
  {
    src: "/vedios/04.mp4",
    type: "video/mp4",
    poster: "/vedios/4.jpg",
  },
  {
    src: "/vedios/5.mp4",
    type: "video/mp4",
    poster: "/vedios/5.jpg",
  },
  {
    src: "/vedios/06.mp4",
    type: "video/mp4",
    poster: "/vedios/6.jpg",
  },
  {
    src: "/vedios/07.mp4",
    type: "video/mp4",
    poster: "/vedios/7.jpg",
  },
  {
    src: "/vedios/08.mp4",
    type: "video/mp4",
    poster: "/vedios/8.jpg",
  },
];

const VIDEO_WIDTH = 400;
const VIDEO_HEIGHT = 320;
const GAP = 32;

const HomeGallery2 = () => {
  const scrollRef = useRef(null);

  const videoList = [...videos, ...videos, ...videos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let isHovered = false;
    let isUserScrolling = false;
    let scrollTimeout;
    let animationActive = true;

    if (scrollContainer) {
      scrollContainer.style.scrollbarWidth = "none";
      scrollContainer.style.msOverflowStyle = "none";
      scrollContainer.style.overflowX = "auto";
      scrollContainer.style.overflowY = "hidden";
      scrollContainer.classList.add("hide-scrollbar");
    }

    const singleSetWidth =
      videos.length * VIDEO_WIDTH + (videos.length - 1) * GAP;

    const velocity = 700;
    let lastTime = performance.now();

    if (scrollContainer) {
      scrollContainer.scrollLeft = singleSetWidth;
    }

    function animate() {
      if (!animationActive) return;
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      if (!isHovered && !isUserScrolling && scrollContainer) {
        let nextScrollLeft =
          scrollContainer.scrollLeft + velocity * (delta / 1000);

        if (nextScrollLeft >= singleSetWidth * 2) {
          nextScrollLeft -= singleSetWidth;
        }
        if (nextScrollLeft < 0) {
          nextScrollLeft += singleSetWidth;
        }

        scrollContainer.scrollLeft = nextScrollLeft;
      }

      requestAnimationFrame(animate);
    }

    animationActive = true;
    requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    const handleScroll = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 100);

      if (scrollContainer) {
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft -= singleSetWidth;
        }
        if (scrollContainer.scrollLeft < 0) {
          scrollContainer.scrollLeft += singleSetWidth;
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", handleMouseEnter);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      animationActive = false;
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.classList.remove("hide-scrollbar");
      }
    };
  }, []);

  const hideScrollbarStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div
      style={{
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        background: "#111",
        padding: "2.5rem 0",
        minHeight: `${VIDEO_HEIGHT + 64}px`,
        boxSizing: "border-box",
      }}
    >
      <style>{hideScrollbarStyle}</style>
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "auto",
          width: "100vw",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
          minHeight: `${VIDEO_HEIGHT}px`,
          alignItems: "center",
        }}
        className="homegallery2-scroll"
        tabIndex={0}
        aria-label="Scrollable video gallery"
      >
        {videoList.map((video, idx) => (
          <div
            key={idx}
            style={{
              minWidth: `${VIDEO_WIDTH}px`,
              maxWidth: `${VIDEO_WIDTH}px`,
              minHeight: `${VIDEO_HEIGHT}px`,
              maxHeight: `${VIDEO_HEIGHT}px`,
              flex: `0 0 ${VIDEO_WIDTH}px`,
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              background: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <video
              src={video.src}
              type={video.type}
              poster={video.poster}
              autoPlay
              loop
              muted
              playsInline
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                background: "#000",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "60px",
          height: "100%",
          background:
            "linear-gradient(to right, #111 80%, rgba(17,17,17,0) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "60px",
          height: "100%",
          background:
            "linear-gradient(to left, #111 80%, rgba(17,17,17,0) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default HomeGallery2;
