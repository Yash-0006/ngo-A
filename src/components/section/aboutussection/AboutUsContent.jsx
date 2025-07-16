"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AboutUsContent() {
  const team = [
    {
      name: "Vinathi",
      role: "Account Manager",
      desc: "Cheerful and enthusiastic, she handles financial expenses with positivity.",
      img: "/team/vinathi.jpg",
    },
    {
      name: "Radha Priyanka",
      role: "Founder",
      desc: "Visionary and compassionate, she leads Avasa with purpose and heart.",
      img: "/team/priyanka.jpg",
    },
    {
      name: "Ajay",
      role: "Outreach Lead",
      desc: "Manages drives and events with energy and dedication.",
      img: "/team/ajay.jpg",
    },
    {
      name: "Radha Priyanka",
      role: "Founder",
      desc: "Visionary and compassionate, she leads Avasa with purpose and heart.",
      img: "/team/priyanka.jpg",
    },
    {
      name: "Ajay",
      role: "Outreach Lead",
      desc: "Manages drives and events with energy and dedication.",
      img: "/team/ajay.jpg",
    },
  ];

  return (
    <div className="w-full h-full overflow-hidden bg-black text-white px-4 py-10 sm:px-6 md:px-10 lg:px-16 space-y-20 sm:space-y-24 md:space-y-28 pb-180 sm:pb-32">
      {/* About Us Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg mt-20">
          About Us
        </h1>
      </motion.div>

      {/* Who We Are */}
{/* Who We Are */}
<motion.section
  id="who-we-are"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
  variants={fadeIn}
>
  <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#fb64b6]/10 rounded-xl shadow-md overflow-hidden">
    {/* Text */}
    <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 space-y-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#fb64b6] text-center md:text-left">
        Who We Are
      </h2>
      <p className="text-lg leading-relaxed text-center md:text-left">
        What began as a heartfelt initiative by{" "}
        <strong className="text-[#fb64b6]">V. Radha Priyanka</strong> and her close friends in 2022 has now grown
        into a registered movement of compassion and change.
        Rooted in Hyderabad, our journey started with simple acts—distributing clothes and food to those in need.
        <br /><br />
        As our vision expanded, so did our reach. We built a dedicated team and extended to Jaipur—
        taking our mission of care to more communities.
        <br /><br />
        In November 2024, we officially registered as an NGO, allowing us to amplify our impact and reach.
      </p>
    </div>
    
    {/* ✅ Updated Image Wrapper */}
    <div className="w-full md:w-1/2 flex justify-center items-center p-6 sm:p-8">
      <div className="max-w-[400px] md:max-w-[600px] w-full">
        <Image
          className="w-full h-auto object-cover rounded-2xl border border-[#fb64b6]"
          width={400}
          height={300}
          alt="About us"
          src="/images/aboutus1.jpg"
        />
      </div>
    </div>
  </div>
</motion.section>

      {/* What We Do */}
      <motion.section
        id="what-we-do"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#fb64b6] text-center mb-10 mt-40">
          What We Do
        </h2>
        <div className="max-w-4xl mx-auto space-y-10">
          {[
            {
              title: "1. Love and Care",
              desc:
                "We believe compassion is the foundation of change. Through regular visits to orphanages and old age homes, our volunteers build emotional connections and support holistic well-being.",
            },
            {
              title: "2. Seasonal & Awareness Drives",
              desc: (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Winter:</strong> Sweaters, blankets, and warm clothing</li>
                  <li><strong>Summer:</strong> Refreshments, hydration kits, and cooling supplies</li>
                  <li><strong>Medical Kits:</strong> Especially in underserved areas</li>
                  <li><strong>Period Kits:</strong> Especially in underserved areas</li>
                </ul>
              ),
            },
            {
              title: "3. Development Support",
              desc: (
                <ul className="list-disc list-inside space-y-1">
                  <li>Educational aids: projectors, stationery, floor carpets</li>
                  <li>School infrastructure: basic classroom needs</li>
                  <li>Community upliftment for marginalized groups</li>
                </ul>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-[#fb64b6]/10 rounded-xl shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#fb64b6] mb-3">
                {item.title}
              </h3>
              <div className="text-base sm:text-lg">{item.desc}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Meet Our Team */}
      <motion.section
        id="meet-our-team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#fb64b6] text-center mb-10">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap sm:mx-30 justify-center gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-[#fb64b6]/10 p-5 rounded-xl w-full sm:w-[260px] md:w-[280px] lg:w-[300px] text-center shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="mx-auto mb-4 w-24 h-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-[#fb64b6]"
              />
              <h3 className="text-lg font-semibold text-[#fb64b6] sm:text-xl">{member.name}</h3>
              <p className="text-sm text-white">{member.role}</p>
              <p className="text-xs sm:text-sm mt-2 text-white">{member.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
