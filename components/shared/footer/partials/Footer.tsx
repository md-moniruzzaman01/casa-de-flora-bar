import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../../WaveDivider";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export default function Footer() {
  const { footer } = getContent();
  const { brand, contact, address, copyright, navLinks } = footer;
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
                {brand.title}
              </p>
              <p className=" text-gray text-2xl font-bold leading-tight max-w-74">
                {brand.subtitle}
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div className="flex flex-col">
              <span className="text-gray text-xs tracking-[0.2em] uppercase font-bold mb-2">
                {contact.heading}
              </span>
              <a
                href="tel:9736958381"
                className="text-gray text-xl font-bold mb-5 hover:opacity-70 transition-opacity"
              >
                {contact.phone}
              </a>
              <a
                href="mailto:events@casadeflorabar.com"
                className="text-gray text-3xl  font-semibold border-b border-primary-300 pb-1 hover:text-primary transition-colors"
              >
                {contact.email}
              </a>
              <a
                href={whatsappLink("Hi Casa de Flora Bar! I'd like to know more about your events and reservations.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-gray text-sm font-bold tracking-[0.18em] uppercase hover:text-primary transition-colors w-fit"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.46-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.13.18 1.91 2.92 4.63 4.09.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.66 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.13-.25-.2-.52-.34zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.66 0 1.88.49 3.71 1.43 5.32L5 27l5.86-1.54a10.62 10.62 0 0 0 5.16 1.32h.01c5.88 0 10.66-4.78 10.66-10.67 0-2.85-1.11-5.53-3.12-7.55a10.6 10.6 0 0 0-7.55-3.13zm0 19.55h-.01a8.86 8.86 0 0 1-4.51-1.24l-.32-.19-3.48.91.93-3.39-.21-.35a8.86 8.86 0 0 1-1.36-4.71c0-4.9 3.99-8.88 8.89-8.88 2.37 0 4.6.93 6.28 2.6a8.83 8.83 0 0 1 2.6 6.29c0 4.89-3.99 8.88-8.81 8.88z" />
                </svg>
                Message us on WhatsApp
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
                {address}
              </h2>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#f5e3e1] py-8 border-t border-black/10">
        <p className="text-center text-gray text-sm">
          {copyright}
        </p>
      </div>
    </footer>
  );
}