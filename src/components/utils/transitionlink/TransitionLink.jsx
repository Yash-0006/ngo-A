"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addSlideUpOverlay() {
  if (typeof document === "undefined") return;
  const old = document.getElementById("page-transition-slide-up");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "page-transition-slide-up";
  overlay.className = "page-transition-slide-up";
  overlay.style.background = "#fff";
  overlay.style.animationDuration = "0.7s";
  overlay.style.animationTimingFunction = "cubic-bezier(0.77, 0, 0.175, 1)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.overflow = "hidden";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "9999";

  // SVG for a curved top edge (horizontal curve)
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "18vh");
  svg.setAttribute("viewBox", "0 0 100 18");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.width = "100%";
  svg.style.height = "18vh";
  svg.style.pointerEvents = "none";
  svg.style.zIndex = "10001";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // This path creates a curve on the top edge
  path.setAttribute("d", "M0,0 Q50,18 100,0 L100,0 L0,0 Z");
  path.setAttribute("fill", "#fff");
  svg.appendChild(path);

  overlay.appendChild(svg);

  const img = document.createElement("img");
  img.src = "/svg/AVASA.svg";
  img.alt = "Page Transition Symbol";
  img.style.width = "80px";
  img.style.height = "80px";
  img.style.objectFit = "contain";
  img.style.display = "block";
  img.style.zIndex = "10002";
  overlay.appendChild(img);

  document.body.appendChild(overlay);
}

function removeSlideUpOverlay() {
  if (typeof document === "undefined") return;
  const overlay = document.getElementById("page-transition-slide-up");
  if (overlay) overlay.remove();
}

function ensureTransitionStyle() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!document.getElementById("page-transition-slide-up-style")) {
    const style = document.createElement("style");
    style.id = "page-transition-slide-up-style";
    style.innerHTML = `
      .page-transition-slide-up {
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: slideInFromBottomCurved 0.7s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        overflow: hidden;
      }
      .page-transition-slide-up img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        display: block;
        z-index: 10002;
      }
      .page-transition-slide-up svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 18vh;
        z-index: 10001;
        pointer-events: none;
        display: block;
      }
      @keyframes slideInFromBottomCurved {
        0% {
          transform: translateY(100%);
          opacity: 1;
        }
        100% {
          transform: translateY(0%);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function getRewrittenHref(href) {
  // Special-case About Us anchor links: rewrite "/" to the correct anchor if possible
  // This is to support navLinks dialog links like "aboutus/#who-we-are" etc.
  // If the href is exactly "aboutus/#who-we-are", "aboutus/#what-we-do", or "aboutus/#meet-our-team", return as is.
  // If the href is "/" and props['data-aboutus-anchor'] is set, use that.
  // Otherwise, keep the original logic.
  if (href === "/ourwork") return "/";
  if (href === "/contactus/maplocation") return "/contactus/map";
  // If the href is one of the About Us anchor links, return as is
  if (
    href === "aboutus/#who-we-are" ||
    href === "aboutus/#what-we-do" ||
    href === "aboutus/#meet-our-team"
  ) {
    return href;
  }
  return href;
}

export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const lenis = useLenis();

  // Ensure the style is only injected on the client
  useEffect(() => {
    ensureTransitionStyle();
  }, []);

  // Patch: If the href is "/" and a data-aboutus-anchor prop is present, use that as the href
  let rewrittenHref = getRewrittenHref(href);
  if (
    href === "/" &&
    typeof props["data-aboutus-anchor"] === "string" &&
    (props["data-aboutus-anchor"] === "aboutus/#who-we-are" ||
      props["data-aboutus-anchor"] === "aboutus/#what-we-do" ||
      props["data-aboutus-anchor"] === "aboutus/#meet-our-team")
  ) {
    rewrittenHref = props["data-aboutus-anchor"];
  }

  const handleTransition = useCallback(
    async (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        e.shiftKey ||
        (typeof rewrittenHref === "string" &&
          (rewrittenHref.startsWith("http") ||
            rewrittenHref.startsWith("mailto:")))
      ) {
        return;
      }

      e.preventDefault();

      if (lenis) {
        await lenis.scrollTo(0, {
          duration: 0.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        await sleep(20);
      }

      addSlideUpOverlay();

      await sleep(650);

      router.push(rewrittenHref);

      setTimeout(removeSlideUpOverlay, 500);
    },
    [router, rewrittenHref, lenis]
  );

  // Only attach onClick on the client to avoid hydration mismatch
  // But Next.js expects the same props on server and client, so we use a stable function
  // Pass the rewrittenHref and remove the data-aboutus-anchor prop so it doesn't end up on the <a>
  const { ["data-aboutus-anchor"]: _anchor, ...restProps } = props;
  return (
    <Link {...restProps} href={rewrittenHref} onClick={handleTransition}>
      {children}
    </Link>
  );
};
