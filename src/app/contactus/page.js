import React from "react";
import ContactUsSection from "@/components/section/contactussection/ContactUsSection";
// import Image from "next/image"; // Remove next/image for external images

const ContactUsPage = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      <h1 className="text-white text-6xl font-bold text-center mt-[5.5rem]">
        Contact Us
      </h1>

      <div className="landing_page">
        <div className="responsive-container-block big-container relative">
          {/* Use a regular img tag for external background image to avoid next/image config error */}
          <img
            className="bg-img absolute w-full h-full object-cover z-0"
            src="https://media.gettyimages.com/id/1644207968/video/4k-video-neon-effect-rectangle-frame-backgraund.jpg?s=640x640&k=20&c=TqQXMt3UIV1GLHuYYDH-guBupN0SLvefYQWhIaXpvLw="
            alt="Background"
            style={{ objectFit: "cover", zIndex: 0 }}
            loading="eager"
          />

          <div className="responsive-container-block container relative z-10 flex flex-wrap">
            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one w-full md:w-1/2 p-6">
              <div className="content-box text-black">
                <p className="text-blk section-head text-3xl font-semibold mb-4">
                  Here for a Cause!
                </p>
                <p className="text-blk section-subhead mb-6 text-black">
                  Contact us to colloborate for a cause greater than all of us.
                  Our team will get back to you. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis volupta
                </p>
                <div className="icons-container flex space-x-4">
                  <a className="share-icon" href="#">
                    <img
                      className="img w-6 h-6"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                      alt="Twitter"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                  <a className="share-icon" href="#">
                    <img
                      className="img w-6 h-6"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                      alt="Facebook"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                  <a className="share-icon" href="#">
                    <img
                      className="img w-6 h-6"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                      alt="Google"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                  <a className="share-icon" href="#">
                    <img
                      className="img w-6 h-6"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one w-full md:w-1/2 p-6">
              <form className="form-box bg-white rounded-lg shadow-md p-6">
                <div className="container-block form-wrapper">
                  <p className="text-blk contactus-head text-2xl font-bold mb-2">
                    Get a quote
                  </p>
                  <p className="text-blk contactus-subhead mb-4 text-gray-600">
                    We will get back to you in 24 hours
                  </p>

                  <div className="responsive-container-block grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="input border border-gray-300 rounded p-2"
                      name="FirstName"
                      placeholder="First Name"
                    />
                    <input
                      className="input border border-gray-300 rounded p-2"
                      name="LastName"
                      placeholder="Last Name"
                    />
                    <input
                      className="input border border-gray-300 rounded p-2"
                      name="Email"
                      placeholder="Email"
                    />
                    <input
                      className="input border border-gray-300 rounded p-2"
                      name="PhoneNumber"
                      placeholder="Phone Number"
                    />
                    <textarea
                      className="textinput border border-gray-300 rounded p-2 col-span-1 md:col-span-2"
                      placeholder="Type message here"
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Get quote
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;
