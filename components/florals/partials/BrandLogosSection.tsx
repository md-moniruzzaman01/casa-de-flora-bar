

import ScallopBorder from "@/components/shared/ScallopBorder";
import Image from "next/image";


const brandLogos = [
  {
    src: "/florals/brand/manuluchi-bride.png",
    alt: "MunaLuchi Bride",
    width: 140,
    height: 60,
  },
  {
    src: "/florals/brand/bella-niaja.png",
    alt: "BellaNaija",
    width: 155,
    height: 50,
  },
  {
    src: "/florals/brand/ahouse-bridal.png",
    alt: "Ahoufe Bridal",
    width: 80,
    height: 70,
  },
  {
    src: "/florals/brand/our-wedding.png",
    alt: "Sacramento Our Wedding",
    width: 150,
    height: 60,
  },
  {
    src: "/florals/brand/the-black-bridal.png",
    alt: "The Black Bridal Experience",
    width: 155,
    height: 55,
  },
];

export default function BrandLogosSection() {
  return (
    <section className="w-full bg-white flex justify-center my-20 md:my-32 lg:my-40">
      <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-[72px]">
        <ScallopBorder id="brand-logos">
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-between px-8 md:px-16 lg:px-24 py-10 md:py-14">
            {brandLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="w-auto object-contain"
                  style={{ maxHeight: "62px" }}
                />
              </div>
            ))}
          </div>
        </ScallopBorder>
      </div>
    </section>
  );
}