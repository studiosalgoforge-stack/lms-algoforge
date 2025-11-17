// components/Footer.tsx
"use client";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";

const socialLinks = [
  { href: "https://x.com/AlgoforgeS?t=AphWpoAjEl2ty6AIkCZh1w&s=09", icon: <FiTwitter />, label: "Twitter" },
  { href: "https://www.linkedin.com/company/algoforge-studios/", icon: <FiLinkedin />, label: "LinkedIn" },
  { href: "https://www.instagram.com/algoforgestudio?igsh=MWJkOWNhd3NoenB5bw==", icon: <FiInstagram />, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-purple-400 text-white py-6 bottom-0"> {/* Darker background for contrast */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Algoforge Studios. All Rights Reserved.
          </div>
          
          {/* Social Media Links & Email */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="flex space-x-3 text-lg"> {/* Increased icon size */}
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white  transition-colors" // Purple hover matches your brand
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Email Link */}
            <span className="text-gray-600">|</span> {/* Separator */}
            <a
              href="mailto:studiosalgoforge@gmail.com"
              className="flex items-center gap-1 text-white transition-colors"
            >
              <FiMail className="text-lg" />
              <span className="text-sm">studiosalgoforge@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;