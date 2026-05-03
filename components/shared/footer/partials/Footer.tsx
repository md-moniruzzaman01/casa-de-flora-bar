import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../../WaveDivider";
import { footerContent, navLinks } from "../config/constants";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Wave divider at the top of the footer */}
      <WaveDivider />

      {/* Main Footer Container */}
      <div className="bg-primary-200 font-display px-4 lg:px-32 pt-24 pb-20">
        <div className="max-w-[1440px] mx-auto">

          {/* Top Section: Three Columns */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">

            {/* Column 1: Messaging */}
            <div className="flex flex-col gap-5 ">
              <p className="text-gray text-base leading-snug max-w-50">
                {footerContent.brand.title}
              </p>
              <p className=" text-gray text-2xl font-bold leading-tight max-w-74">
                {footerContent.brand.subtitle}
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div className="flex flex-col">
              <span className="text-gray text-xs tracking-[0.2em] uppercase font-bold mb-2">
                {footerContent.contact.heading}
              </span>
              <a
                href="tel:9736958381"
                className="text-gray text-xl font-bold mb-5 hover:opacity-70 transition-opacity"
              >
                {footerContent.contact.phone}
              </a>
              <a
                href="mailto:events@casadeflorabar.com"
                className="text-gray text-3xl  font-semibold border-b border-primary-300 pb-1 hover:text-primary transition-colors"
              >
                {footerContent.contact.email}
              </a>
            </div>

            {/* Column 3: Navigation */}
            <nav className="flex flex-col items-center md:items-start gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray text-xs font-bold tracking-[0.18em] uppercase hover:text-[#c97b7b] transition-colors flex items-center gap-1"
                >
                  {link.label}

                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom Section: Logo left, Large Address right */}
          <div className="flex flex-col md:flex-row items-center justify-between">

            {/* Logo */}
            <div className="w-74 h-74 relative flex-shrink-0 flex justify-center items-center">
              <Image
                src="/logo.png"
                alt="Casa de Flora Bar Logo"
                fill
                className="object-contain"
              />
            </div>

            {/* Large Address — right-aligned, large serif */}
            <div className="text-center md:text-right mt-8 md:mt-0">
              <h2 className="text-gray font-serif text-3xl md:text-6xl  font-semibold tracking-tight leading-[1.05] max-w-3xl">
                {footerContent.address}
              </h2>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#f5e3e1] py-8 border-t border-black/10">
        <p className="text-center text-gray text-sm">
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}