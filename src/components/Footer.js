/*
===============================================================
Component: Footer
 Purpose: Display application footer with branding, social links,
          navigation sections, and contact information.

 Implementation:
  1. Shows developer branding and portfolio link.
  2. Displays social media links with icons.
  3. Renders footer sections dynamically using mapped data.
  4. Keeps layout and styling consistent with original design.

 Returns: Footer UI with structured sections and links
=================================================================
*/

// ==============================
// Imports
// ==============================
import React from "react";
import logoImg from "../utils/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faDev,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

// ==============================
// Footer Component
// ==============================
const Footer = () => {
  // ==============================
  // Social Links Data
  // ==============================
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/amolsasane",
      icon: faLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://github.com/amolsasane",
      icon: faGithub,
      label: "Github",
    },
    {
      href: "https://dev.to/amolsasane_",
      icon: faDev,
      label: "DEV",
    },
    {
      href: "https://twitter.com/amolsasane_",
      icon: faXTwitter,
      label: "Twitter",
    },
  ];

  // ==============================
  // Footer Sections Data
  // ==============================
  const footerSections = [
    {
      title: "About",
      links: [
        {
          label: "Portfolio",
          href: "https://amolsasane.netlify.app/",
        },
        {
          label: "Resume",
          href: "https://www.linkedin.com/in/amolsasane/overlay/1741262159384/single-media-viewer/?profileId=ACoAAC5CvzcB1oXHxIlPZb02JT9UDziLWKqvFug",
        },
        {
          label: "About Me",
          href: "https://amolsasane.netlify.app/about",
        },
      ],
    },
    {
      title: "Projects",
      links: [
        {
          label: "Cineflix GPT",
          href: "https://cineflixgptmoviess.netlify.app",
        },
        {
          label: "Book Adviser",
          href: "https://bookwiseadvisor.netlify.app/",
        },
        {
          label: "Emojipedia",
          href: "https://emojipediainterpreter.netlify.app/",
        },
      ],
    },
    {
      title: "Blogs",
      links: [
        {
          label: "CSS Box Model",
          href: "https://dev.to/amolsasane_/understanding-css-box-model-1ap",
        },
        {
          label: "Color Psychology",
          href: "https://dev.to/amolsasane_/color-psychology-in-web-design-4cmf",
        },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          label: "+91 7249498769",
          href: "tel:+917249498769",
        },
        {
          label: "amolsasane001@gmail.com",
          href: "mailto:amolsasane001@gmail.com",
        },
      ],
    },
  ];

  // ==============================
  // Final Render
  // ==============================
  return (
    <footer className="bg-black text-gray-400 py-9">
      <div className="lg:px-10">
        <hr className="h-px my-6 lg:mx-auto bg-zinc-600 border-none" />

        <div className="flex flex-wrap lg:flex-nowrap">
          {/* ==============================
              Left Section - Branding (UNCHANGED)
          ============================== */}
          <div className="w-full lg:w-2/5 lg:pr-6 mb-6 lg:mb-0 text-center lg:text-left">
            <div className="pl-4 lg:pl-10">
              <img
                className="w-[10rem] mx-auto lg:mx-0"
                src={logoImg}
                alt="logo"
              />

              <h1 className="text-white">
                DEVELOPED BY{" "}
                <span className="inline-flex">
                  <a
                    href="https://amolsasane.netlify.app/"
                    className="block mt-2 text-sm hover:underline hover:font-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    AMOL SASANE
                  </a>
                </span>
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Connect with me and explore my work. Find me below!
              </p>

              <div className="flex justify-center lg:justify-start mt-3 -mx-2 text-white text-2xl">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="mx-2 hover:text-gray-400"
                    aria-label={link.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ==============================
              Right Section - Links (UNCHANGED UI)
          ============================== */}
          <div className="w-full lg:flex-1 lg:pt-5">
            <div className="grid grid-cols-1 gap-6 text-center md:ml-[7rem] sm:ml-[10rem] lg:ml-0 sm:text-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 lg:mt-0">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-white font-bold uppercase">
                    {section.title}
                  </h3>

                  {section.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="block mt-2 text-sm hover:text-white hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-zinc-600 border-none" />

        <div>
          <p className="text-center text-white text-sm lg:text-base">
            © Food Express 2024 - All rights reserved |{" "}
            <span className="inline-flex">
              <a
                href="https://amolsasane.netlify.app/"
                className="block mt-2 hover:underline hover:font-bold"
                target="_blank"
                rel="noreferrer"
              >
                Amol Sasane
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
