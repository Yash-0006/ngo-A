"use client";

import React, { useEffect, useRef } from "react";
import "@/app/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import BackgroundLines from "@/components/utils/background/background-lines"; // Adjust path as needed

const games = [
  {
    title: "Care Meal",
    image: "/main gallery/a.JPG",
    description: "Serving smiles and lunch at Nayasawera NGO, Jaipur.",
  },
  {
    title: "Elder Aid",
    image: "/main gallery/b.JPG",
    description:
      "Sharing love, one meal at a time with the golden hearts of the old age home.",
  },
  {
    title: "Hearts Aligned",
    image: "/main gallery/c.JPG",
    description:
      "  A day of shared smiles between the youngest dreams and the wisest hearts.",
  },
  {
    title: "Golden Bonds ",
    image: "/main gallery/d.JPG",
    description: "Sharing smiles and stories with the golden generation.",
  },
  {
    title: "Bright Beginnings",
    image: "/main gallery/e.JPG",
    description:
      "Igniting young minds with care, curiosity, and joyful connection.",
  },
  {
    title: "Joy in Every Smile",
    image: "/main gallery/f.JPG",
    description:
      "A day filled with laughter, play, and pure happiness with the little stars.",
  },
  {
    title: "Steps of Joy",
    image: "/main gallery/g.JPG",
    description:
      "Dancing beyond limits, spreading joy and confidence with every move.",
  },
  {
    title: "Learning Lights",
    image: "/main gallery/h.JPG",
    description:
      "Empowering young minds through knowledge, one lesson at a time.",
  },
  {
    title: "Cool Kindness",
    image: "/main gallery/i.JPG",
    description:
      "Cooling hearts and hands—serving buttermilk with care and compassion.",
  },
  {
    title: "Pride in Every Heart",
    image: "/main gallery/j.JPG",
    description:
      "Celebrating the spirit of the nation with young patriots and bright smiles.",
  },
  {
    title: "Cool for a Cause",
    image: "/main gallery/k.JPG",
    description:
      "Quenching thirst with kindness — a refreshing gesture on a warm day.",
  },
  {
    title: "Sip of Care",
    image: "/main gallery/l.JPG",
    description:
      "Serving smiles in every glass — spreading cool comfort on a sunny day.",
  },
  {
    title: "Beat the Heat Drive",
    image: "/main gallery/m.JPG",
    description:
      "Bringing cool relief to warm days — serving hydration with heart.",
  },
  {
    title: "Hope in Every Corner",
    image: "/main gallery/n.JPG",
    description:
      "Spreading warmth, listening hearts, and building bonds in the heart of the community.",
  },
  {
    title: "Refresh & Reach",
    image: "/main gallery/o.JPG",
    description:
      "Spreading smiles and energy—sharing refreshments with love and care.",
  },
  {
    title: "Hands of Hope",
    image: "/main gallery/p.jpg",
    description:
      "Extending compassion where it’s needed most—standing by those who need us.",
  },
  {
    title: "Tech for Tomorrow",
    image: "/main gallery/q.JPG",
    description:
      "Empowering young minds with tools for a brighter, smarter future.",
  },
  {
    title: "Quenching Thirst",
    image: "/main gallery/r.JPG",
    description:
      "A small sip, a big relief — serving cool comfort with care and compassion.",
  },
  {
    title: "Refreshment Drive",
    image: "/main gallery/s.JPG",
    description:
      "Serving smiles with every sip and bite — a small act of kindness to lift the day.",
  },
  {
    title: "Health in Hand",
    image: "/main gallery/t.JPG",
    description:
      "Distributing essential medical kits — a step towards safer, healthier lives.",
  },
  {
    title: "Gratitude Moments",
    image: "/main gallery/u.JPG",
    description:
      "Honored with heartfelt appreciation — a reminder that every small act creates lasting impact.",
  },
  {
    title: "Bonds Beyond Books",
    image: "/main gallery/v.JPG",
    description:
      "Laughs, learning, and love — creating joyful moments with curious young minds.",
  },
  {
    title: "Support in Service",
    image: "/main gallery/w.JPG",
    description:
      "Standing beside our traffic heroes — lending a hand to those who keep our roads safe.",
  },
  {
    title: "Helping Our Helpers",
    image: "/main gallery/x.JPG",
    description:
      "A gesture of gratitude for those who protect and serve us daily — because care goes both ways.",
  },
  {
    title: "Hygiene for Her",
    image: "/main gallery/y.JPG",
    description:
      "Empowering women with access to hygiene and self-care essentials.",
  },
  {
    title: "Threads of Kindness",
    image: "/main gallery/z.JPG",
    description:
      "From our hearts to their hands — a gesture of warmth and dignity.",
  },
  {
    title: "Joyful Gatherings",
    image: "/main gallery/a1.JPG",
    description:
      "Bringing communities together — sharing laughter, stories, and support.",
  },
  {
    title: "Seeds of Hope",
    image: "/main gallery/a2.JPG",
    description:
      "Planting the promise of a greener tomorrow, one sapling at a time.",
  },
];

function AnimatedWord({ word }) {
  return (
    <span className="animated-word">
      {word.split("").map((char, idx) => (
        <span
          key={idx}
          className="animated-letter"
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function GameCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      const items = document.querySelectorAll(".custom-carousel .item");
      if (e.currentTarget.classList.contains("active")) {
        items.forEach((el) => el.classList.remove("active"));
      } else {
        items.forEach((el) => el.classList.remove("active"));
        e.currentTarget.classList.add("active");
      }
    };
    const items = document.querySelectorAll(".custom-carousel .item");
    items.forEach((el, idx) => {
      el.addEventListener("click", handleClick);
      if (idx === 0) el.classList.add("active");
    });
    return () => {
      items.forEach((el) => el.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <section
      className="game-section centered-section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Responsive background lines */}
      <div className="background-lines-wrapper">
        <BackgroundLines />
      </div>
      <h2
        className="line-title animated-title pink-text"
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          top: 0,
          transform: "none",
          fontSize: "2rem",
          zIndex: 20,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(2px)",
          textAlign: "center",
          transition:
            "transform 0.3s cubic-bezier(.4,2,.6,1), left 0.3s cubic-bezier(.4,2,.6,1)",
          display: "block",
          width: "fit-content",
        }}
      >
        <AnimatedWord word="GALLERY" />
      </h2>
      <div className="custom-carousel">
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
            scale: 0.85,
          }}
          spaceBetween={30}
          modules={[EffectCoverflow]}
          className="game-swiper"
        >
          {games.map((game, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "320px", height: "400px" }}
            >
              <div className={`item${index === 0 ? " active" : ""}`}>
                <div className="item-image-wrapper">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="item-image"
                    draggable={false}
                  />
                </div>
                <div className="item-float-bg" />
                <div className="item-desc pink-text">
                  <h3 className="item-title-animated pink-text">
                    {game.title}
                  </h3>
                  <p className="game-desc-white">{game.description}</p>
                </div>
                <div className="item-glow" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: "Roboto", sans-serif;
        }
        .background-lines-wrapper {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .centered-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 50px;
          position: relative;
          top: -15px;
        }
        .game-section {
          padding: 0;
        }
        .line-title {
          width: 400px;
          position: relative;
          margin-bottom: 48px;
          padding-bottom: 16px;
          font-size: 20px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .animated-title {
          animation: fadeInDown 1s cubic-bezier(0.4, 2, 0.6, 1);
        }
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        /* Animated word heading styles */
        .animated-word {
          display: inline-block;
        }
        .animated-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          animation: headingLetterFadeIn 0.5s cubic-bezier(0.4, 2, 0.6, 1)
            forwards;
        }
        @keyframes headingLetterFadeIn {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .custom-carousel {
          width: 100%;
        }
        .game-swiper {
        }
        .item {
          margin: 0 0px 60px;
          width: 320px;
          height: 400px;
          display: flex;
          align-items: flex-end;
          background: #343434;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 2, 0.6, 1);
          cursor: pointer;
        }
        .item-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .item-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
          display: block;
          background: #222;
        }
        .custom-carousel .swiper-slide {
          display: flex;
          justify-content: center;
        }
        .item {
          left: 50%;
          transform: translateX(-50%);
          position: relative;
        }
        .item.active {
          width: 500px !important;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 12px 40px 40px rgba(0, 0, 0, 0.25);
        }
        .item:after {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
          background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 60%,
              rgba(0, 0, 0, 0.7) 100%
            ),
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.18) 0%,
              rgba(0, 0, 0, 0) 20%,
              rgba(0, 0, 0, 0) 80%,
              rgba(0, 0, 0, 0.18) 100%
            );
          z-index: 1;
          pointer-events: none;
        }
        .item-float-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          background: none;
          border-radius: 16px;
          animation: floatBg 4s ease-in-out infinite alternate;
          opacity: 0.15;
          filter: blur(8px) brightness(1.2);
        }
        @keyframes floatBg {
          0% {
            transform: scale(1) translateY(0px);
          }
          100% {
            transform: scale(1.04) translateY(-10px);
          }
        }
        .item-glow {
          display: none;
        }
        .item.active .item-glow {
          display: block;
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 20px;
          pointer-events: none;
          z-index: 2;
          box-shadow: 0 0 32px 8px #e73700, 0 0 0 0 #fff;
          animation: glowPulse 1.2s infinite alternate;
        }
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 32px 8px #e73700, 0 0 0 0 #fff;
            opacity: 0.7;
          }
          100% {
            box-shadow: 0 0 48px 16px #e73700, 0 0 8px 2px #fff;
            opacity: 1;
          }
        }
        .item-title-animated {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 2, 0.6, 1);
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .item-desc {
          padding: 0 24px 12px;
          color: #fff;
          position: relative;
          z-index: 2;
          transform: translateY(calc(100% - 54px));
          transition: all 0.4s cubic-bezier(0.4, 2, 0.6, 1);
        }
        .item.active .item-desc {
          transform: none;
        }
        .item-desc p {
          opacity: 0;
          transform: translateY(32px);
          transition: all 0.4s cubic-bezier(0.4, 2, 0.6, 1) 0.2s;
        }
        .item.active .item-desc p {
          opacity: 1;
          transform: translateY(0);
        }
        .item.active .item-desc p {
          animation: fadeInText 0.6s 0.2s both;
        }
        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .game-desc-white {
          color: #fff !important;
        }
        .swiper-coverflow .swiper-slide {
          transform-origin: 50% 50% !important;
        }
        .swiper-coverflow .swiper-slide {
          transform: scale(0.85) !important;
        }
        .swiper-coverflow .swiper-slide-active {
          transform: scale(1) !important;
        }
        @media (max-width: 767px) {
          .background-lines-wrapper {
            width: 100vw;
            height: 100vh;
          }
          .centered-section {
            padding: 0 2vw;
            min-height: 100vh;
          }
          .line-title {
            width: 290px;
            margin-bottom: 28px;
            font-size: 22px;
          }
          .custom-carousel .swiper-slide {
            justify-content: center;
          }
          .item,
          .game-swiper .swiper-slide {
            width: 240px !important;
            height: 340px;
            margin: 0 0px 48px;
          }
          .item {
            left: 50%;
            transform: translateX(-50%);
            position: relative;
          }
          .item.active {
            width: 320px !important;
            left: 50%;
            transform: translateX(-50%);
          }
          .item-desc {
            padding: 0 18px 10px;
            transform: translateY(calc(100% - 54px));
          }
          .game-swiper {
            padding-bottom: 10px !important;
          }
          .swiper-pagination {
            display: none !important;
          }
          .swiper-coverflow .swiper-slide {
            transform: scale(0.85) !important;
          }
          .swiper-coverflow .swiper-slide-active {
            transform: scale(1) !important;
          }
          .item-float-bg {
            filter: blur(6px) brightness(1.1);
          }
          .item-image-wrapper {
            width: 100% !important;
            height: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            display: flex !important;
            align-items: stretch !important;
            justify-content: stretch !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
          .item-image {
            width: 100% !important;
            height: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 100% !important;
            max-height: 100% !important;
            display: block !important;
            object-fit: contain !important;
            object-position: center !important;
            background: #222 !important;
          }
        }
        @media (min-width: 768px) {
          .background-lines-wrapper {
            width: 100vw;
            height: 100vh;
          }
          .game-swiper {
            padding-bottom: 20px !important;
          }
          .swiper-pagination {
            display: none !important;
          }
        }
        .pink-text,
        .pink-text * {
          color: #ff69b4 !important;
        }
        .game-desc-white {
          color: #fff !important;
        }
      `}</style>
      <style jsx global>{`
        .swiper {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .swiper-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          transition-property: transform;
          box-sizing: content-box;
        }
        .swiper-slide {
          flex-shrink: 0;
          width: 320px;
          height: 400px;
          position: relative;
          transition-property: transform;
          display: block;
        }
        .swiper-slide-active {
          z-index: 2;
        }
        .swiper-slide-next,
        .swiper-slide-prev {
          z-index: 1;
        }
        .swiper-pagination,
        .swiper-pagination-bullet,
        .swiper-pagination-bullet-active {
          display: none !important;
        }
        .swiper-coverflow .swiper-wrapper {
          perspective: 1200px;
        }
        .swiper-coverflow .swiper-slide {
          transition: transform 0.4s cubic-bezier(0.4, 2, 0.6, 1),
            box-shadow 0.4s cubic-bezier(0.4, 2, 0.6, 1);
        }
        .swiper-coverflow .swiper-slide {
          transform: scale(0.85) !important;
        }
        .swiper-coverflow .swiper-slide-active {
          transform: scale(1) !important;
        }
        @media (max-width: 767px) {
          .swiper-slide {
            width: 240px !important;
            height: 340px !important;
          }
          .game-swiper {
            padding-bottom: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
