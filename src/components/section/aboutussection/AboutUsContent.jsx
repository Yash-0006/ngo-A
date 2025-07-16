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
      name: "V. Radha Priyanka",
      role: "Founder/ President",
      desc: "Visionary and compassionate, she leads Avasa with purpose, heart, and unwavering commitment to its mission.",
      img: "/team/vinathi.jpg",
    },
    {
      name: "V. Keerthi Sri",
      role: "Vice President",
      desc: "Provides strategic oversight, ensuring organizational alignment, operational excellence, and effective implementation of programs.",
      img: "/team/vinathi.jpg",
    },
    {
      name: "Ananya Pandey",
      role: "General Secretary",
      desc: "Manages administrative affairs, ensures clear communication, and upholds governance with integrity.",
      img: "/team/priyanka.jpg",
    },
    {
      name: "M.V. Nageswara Rao",
      role: "Joint Secretary",
      desc: "Supports administrative functions and streamlines coordination to ensure operational efficiency.",
      img: "/team/ajay.jpg",
    },
    {
      name: "V. Lakshmi Prasanna",
      role: "Treasurer",
      desc: "Manages financial operations, maintains transparent records, and ensures accountable use of funds.",
      img: "/team/priyanka.jpg",
    },
    {
      name: "K. Usha Bhargavi",
      role: "Executive member",
      desc: "Contributes to decision-making, supports program execution, and upholds the organization’s mission through active involvement.",
      img: "/team/ajay.jpg",
    },
    {
      name: "V. Sai Harini",
      role: "Executive member",
      desc: "Contributes in organizational activities, offering insights and assistance to drive impactful initiatives forward.",
      img: "/team/ajay.jpg",
    },
    {
      name: "Ch. Vinathi",
      role: "Head of Finance",
      desc: "Oversees financial planning, budgeting, and compliance to ensure fiscal responsibility and sustainability.",
      img: "/team/ajay.jpg",
    },
    {
      name: "R.V.R. Vamsi",
      role: "Head of Social Media",
      desc: "Leads the organization’s digital presence by strategizing, creating, and managing content to amplify outreach and engagement.",
      img: "/team/ajay.jpg",
    },
  ];

  return (
    <div
      className="px-4 py-12 mt-10 text-white bg-black space-y-20 sm:px-6 md:px-10 lg:px-16"
      style={minHeight ? { minHeight } : undefined}
    >
      {/* Section: Hero Banner Full Screen */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="overflow-hidden relative flex items-center justify-center mt-10"
      >
        {/* Centered Heading */}
        <div className="z-10 text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg sm:text-6xl">
            About Us
          </h1>
        </div>
      </motion.div>

      {/* Section: Who We Are */}
      <motion.section
        id="who-we-are"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex justify-around items-center bg-[#fb64b6]/10 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="flex-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#fb64b6] text-center sm:text-4xl">
              Who We Are
            </h2>
            <p className="mx-auto px-2 text-center leading-relaxed text-white text-lg sm:px-14">
              What began as a heartfelt initiative by{" "}
              <strong className="text-[#fb64b6]">V. Radha Priyanka</strong> and
              her close friends in 2022 has now grown into a registered movement
              of compassion and change. Rooted in Hyderabad, our journey started
              with simple acts—distributing clothes and food to those in need.
              <br />
              <br />
              As our vision expanded, so did our reach. We built a dedicated
              team and extended to Jaipur—taking our mission of care to more
              communities. From refreshment drives and medical kit distributions
              to visits to orphanages and old age homes, every effort is driven
              by the same purpose—to bring hope, dignity, and support.
              <br />
              <br />
              Founded in 2022 and officially incorporated as a{" "}
              <strong className="text-[#fb64b6]">
                registered NGO in November 2024
              </strong>
              , Avasa is registered under the Telangana Societies Registration
              Act, 2001 with registration number{" "}
              <strong className="text-[#fb64b6]">1108 of 2024</strong>. This
              recognition enables us to scale our initiatives and deepen our
              commitment to meaningful, community-driven change.
            </p>
          </div>
          <Image
            className="m-10 rounded-2xl"
            width={550}
            height={300}
            alt="image"
            src="/images/aboutus1.jpg"
          />
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
        className="relative min-h-[380vh] sm:min-h-[200vh] md:min-h-[130vh] lg:min-h-[140vh]"
      >
        <div className="mt-16 mx-20 sm:mt-20 md:mt-24 lg:mt-32">
          <h2 className="text-3xl font-bold text-[#fb64b6] text-center sm:text-4xl">
            Meet Our Board
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-8 px-2 mt-10 px-0 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-5 w-[85vw] w-[280px] text-center bg-[#fb64b6]/10 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg sm:p-6 md:w-[300px] lg:w-[320px]"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover mx-auto mb-4 w-24 h-24 w-28 rounded-full border-4 border-[#fb64b6] sm:h-28"
                />
                <h3 className="text-lg font-semibold text-[#fb64b6] sm:text-xl">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-white sm:text-base">
                  {member.role}
                </p>
                <p className="mt-2 text-xs text-white sm:text-sm">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
