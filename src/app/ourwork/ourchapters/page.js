"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const chapters = [
  {
    id: "jaipur",
    name: "Jaipur",
    img: "/images/chapter-jaipur.jpg",
    volunteers: 120,
    contact: "jaipur@ngo-a.org",
    position: { top: "34%", left: "36%" },
  },
  {
    id: "hyd",
    name: "Hyderabad",
    img: "/images/chapter-hyd.jpg",
    volunteers: 220,
    contact: "hyd@ngo-a.org",
    position: { top: "62%", left: "44%" },
  },
];

const galleryContent = [
    {
        id: 'hyd',
        title: 'Hyderabad Chapter',
        description: 'Our Hyderabad chapter has been at the forefront of community engagement, organizing everything from educational drives to health camps. These moments capture the spirit of our volunteers and the vibrant communities we serve.',
        images: [
            { src: "/images/chapter-hyd1.jpg", alt: "Hyderabad event 1", title: "Street Smarts", description: "An awareness campaign in full swing." },
            { src: "/images/chapter-hyd2.jpg", alt: "Hyderabad event 2", title: "Health Drive", description: "Providing essential health services." },
            { src: "/images/chapter-hyd3.jpg", alt: "Hyderabad event 3", title: "Educational Outreach", description: "Supporting local schools." },
            { src: "/images/chapter-hyd4.jpg", alt: "Hyderabad event 4", title: "Community Joy", description: "Sharing moments of happiness." },
        ],
    },
    {
        id: 'jaipur',
        title: 'Jaipur Chapter',
        description: 'In the heart of the Pink City, our Jaipur chapter brings smiles and support to many. From local clean-up initiatives to celebrating festivals with underprivileged children, our volunteers create lasting bonds and beautiful memories.',
        images: [
            { src: "/images/chapter-jaipur.jpg", alt: "Jaipur event 1", title: "Shared Smiles", description: "Moments of connection and joy." },
            { src: "/images/chapter-jaipur.jpg", alt: "Jaipur event 2", title: "Art for a Cause", description: "Creative workshops for local youth." },
            { src: "/images/chapter-jaipur.jpg", alt: "Jaipur event 3", title: "Community Cleanup", description: "Working together for a cleaner city." },
            { src: "/images/chapter-jaipur.jpg", alt: "Jaipur event 4", title: "Festival Fun", description: "Celebrating with the community." },
        ],
    },
];


const ChapterCard = ({ chapter }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 250 }}
    className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-md hover:shadow-pink-600/20 transition-shadow duration-300 overflow-hidden"
  >
    <div className="relative h-44 sm:h-56 md:h-48 w-full">
      <Image src={chapter.img} alt={`View of ${chapter.name}`} fill className="object-cover" sizes="100vw" />
    </div>
    <div className="p-5 sm:p-6 flex flex-col h-full">
      <h3 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-2">{chapter.name}</h3>
      <p className="text-neutral-400 mb-4 text-sm sm:text-base">{chapter.volunteers}+ Active Volunteers</p>
      <Link href={`mailto:${chapter.contact}`}>
        <motion.button whileHover={{ scale: 1.05 }} className="w-full mt-auto bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300">
          Contact Chapter
        </motion.button>
      </Link>
    </div>
  </motion.div>
);

const ContentItem = ({ title, description, isFaq = false }) => (
  <motion.div variants={itemVariants} className="border-t border-neutral-800 py-5 sm:py-6">
    <h3 className={`font-semibold mb-2 ${isFaq ? "text-white" : "text-pink-400"} text-base sm:text-lg`}>{title}</h3>
    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{description}</p>
  </motion.div>
);

const GalleryCard = ({ image }) => (
    <motion.div variants={itemVariants} whileHover="hover" transition={{ type: "spring", stiffness: 250 }} className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-600/30 transition-shadow duration-300">
      <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 80vw, 300px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
        <motion.h3 initial={{ y: 10, opacity: 0 }} variants={{ hover: { y: 0, opacity: 1 } }} transition={{ delay: 0.1, ease: "easeOut" }} className="font-bold text-lg sm:text-xl">{image.title}</motion.h3>
        <motion.p initial={{ y: 10, opacity: 0 }} variants={{ hover: { y: 0, opacity: 1 } }} transition={{ delay: 0.15, ease: "easeOut" }} className="text-sm text-neutral-300">{image.description}</motion.p>
      </div>
    </motion.div>
);

const ChapterGallery = ({ title, description, images }) => (
    <motion.div variants={itemVariants} className="mb-16 last:mb-0">
        <div className="max-w-3xl mx-auto text-center mb-8 px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-3">{title}</h3>
            <p className="text-neutral-300 text-base sm:text-lg">{description}</p>
        </div>
        <div className="custom-scrollbar flex overflow-x-auto space-x-4 md:space-x-6 py-4 pl-4 pr-4 sm:pl-8 sm:pr-8">
            {images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-72 sm:w-80">
                    <GalleryCard image={image} />
                </div>
            ))}
        </div>
    </motion.div>
);

export default function OurChaptersPage() {
  const [hoveredChapterId, setHoveredChapterId] = useState(null);
  
  const chapterToShow = hoveredChapterId ? chapters.find((c) => c.id === hoveredChapterId) : null;

  return (
    <main className="bg-black text-white">
      <div className="overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-center justify-center px-4 min-h-[100vh] sm:min-h-[80vh] md:min-h-[100vh]">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-20 max-w-2xl w-full text-center md:text-left md:w-1/2 py-16 md:py-0">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">Our Roots, <span className="text-pink-500">Your Community</span></motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-neutral-300 mb-6 sm:mb-10">From bustling metros to local neighborhoods, our mission is powered by dedicated chapters across India. Find yours today.</motion.p>
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
              <Link href="#chapters">
                <motion.button whileHover={{ scale: 1.05 }} className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-white text-base sm:text-lg font-semibold transition">
                  Explore Our Chapters
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="relative w-full md:w-1/2 flex justify-center items-center h-[380px] sm:h-[480px] md:h-[620px] lg:h-[700px]">
            <div id="map" className="relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] border-2 border-pink-500 rounded-2xl overflow-hidden bg-neutral-900/90 shadow-2xl backdrop-blur-lg z-20">
              <Image src="/images/india-map.png" alt="Map of India" fill className="object-contain opacity-80 saturate-150" priority sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px" />
              {chapters.map((chapter) => (
                <div key={chapter.id} onMouseEnter={() => setHoveredChapterId(chapter.id)} onMouseLeave={() => setHoveredChapterId(null)} onTouchStart={() => setHoveredChapterId(chapter.id)} onTouchEnd={() => setTimeout(() => setHoveredChapterId(null), 800)} className="absolute z-30 cursor-pointer" style={{ left: chapter.position.left, top: chapter.position.top, transform: "translate(-50%, -50%)" }}>
                  <div className={`rounded-full border-2 sm:border-4 border-pink-500 bg-white flex items-center justify-center shadow-lg transition-all duration-300 ${hoveredChapterId === chapter.id ? "ring-2 sm:ring-4 ring-pink-300/60 scale-110" : ""} w-10 h-10 sm:w-12 sm:h-12`}>
                    <Image src="/svg/AVASA.svg" alt="AVASA Logo" width={32} height={32} className="rounded-full object-contain bg-white animate-blink-signal sm:w-10 sm:h-10 w-8 h-8" />
                  </div>
                </div>
              ))}
              <AnimatePresence>
                {chapterToShow && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-5 bg-black/80 backdrop-blur-lg rounded-xl border border-pink-500/30 text-left z-40">
                    <h3 className="text-pink-400 font-semibold text-base sm:text-lg md:text-xl">{chapterToShow.name}</h3>
                    <p className="text-neutral-200 text-xs sm:text-sm">{chapterToShow.volunteers}+ Volunteers</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Image src="/images/chapter-hero.jpg" alt="Volunteers" fill className="object-cover z-0 opacity-50 saturate-150 absolute inset-0 pointer-events-none" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
        </div>

        <div id="chapters" className="bg-black py-16 md:py-24 border-y border-neutral-800">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-pink-500 mb-8 sm:mb-12 text-center">Our Chapters</h2>
            <motion.div initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="w-full max-w-sm mx-auto">
                  <ChapterCard chapter={chapter} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="bg-black py-16 sm:py-24 border-b border-neutral-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-3">Moments That Define Us</h2>
                    <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto">A glimpse into the lifeblood of our mission—the events, drives, and smiles from our chapters nationwide.</p>
                </div>
                <motion.div initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.1 }}>
                    {galleryContent.map((chapter) => (
                        <ChapterGallery key={chapter.id} title={chapter.title} description={chapter.description} images={chapter.images} />
                    ))}
                </motion.div>
            </div>
        </div>

        <div className="bg-neutral-950 py-16 sm:py-24 border-b border-neutral-800">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-10 text-center">Starting a Chapter: FAQs</h2>
            <motion.div initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.1 }} className="space-y-5">
              <ContentItem title="What is the first step to starting a chapter?" description="Contact us through our contact page! We’ll provide a starter kit and help you build a local team." isFaq />
              <ContentItem title="How many people do I need to start a chapter?" description="Just 3–5 dedicated members can kickstart a chapter. Passion matters more than numbers!" isFaq />
              <ContentItem title="What support do I get?" description="Branding, mentorship, access to our tools, and step-by-step support from our leadership team." isFaq />
            </motion.div>
          </div>
        </div>

        <div className="py-16 sm:py-24 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-500 mb-4">Ready to Lead the Change?</h2>
            <p className="text-neutral-300 mb-8 text-base sm:text-lg">Be a pioneer in your community. We’ll support you every step of the way to launch your chapter.</p>
            <Link href="/contactus">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg transition">
                Start a Chapter
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}