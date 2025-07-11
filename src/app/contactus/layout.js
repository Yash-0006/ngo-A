"use client";
import { Lenis as ReactLenis, useLenis } from "@studio-freight/react-lenis";
function ContactUsLayout({ children }) {
  return (
    <ReactLenis root>
      <main className="relative min-h-[100vh] w-screen overflow-x-hidden bg-black">
        {children}
      </main>
    </ReactLenis>
  );
}

export default ContactUsLayout;
