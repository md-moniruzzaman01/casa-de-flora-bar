import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WEDDING_FLORALS_CONTENT } from '../config/constant';



const IntroFairytaleSection: React.FC = () => {
    const { headline, body, cta, gallery } = WEDDING_FLORALS_CONTENT.intro_section;

    // Index-based slots — order in data is the contract, not gridSpan string
    const tallImage = gallery[0];
    const shortImages = gallery.slice(1, 3);

    return (
        <section className="bg-white text-[#1a1008] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">

                {/*
                 * Outer layout:
                 *   mobile  → single column (stacked)
                 *   desktop → two columns: text (38%) | image block (62%)
                 */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2">

                 
                    <div className="flex items-center order-1 lg:order-none py-14 md:py-20 lg:py-0 px-6 md:px-12 lg:pl-[72px] lg:pr-10">
                        <div className="flex flex-col items-start w-full max-w-[480px] mx-auto lg:mx-0">

                            <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[1.07] tracking-tight mb-6 md:mb-8">
                                {headline.line_1}
                                <br />
                                {headline.line_2}
                            </h2>

                            <div className="font-serif text-[15px] md:text-[16px] leading-[1.85] space-y-5 md:space-y-6 mb-10 md:mb-12">
                                {body.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <Link
                                href={cta.link}
                                className="inline-block bg-black text-white px-7 py-3.5 md:px-8 md:py-4 font-sans text-[11px] tracking-[0.18em] uppercase hover:bg-neutral-800 transition-colors whitespace-nowrap"
                            >
                                {cta.label}
                            </Link>
                        </div>
                    </div>

                  
                    <div className="order-2 lg:order-none flex flex-col md:grid md:grid-cols-[56fr_44fr] md:items-stretch">

                        {/* Tall image */}
                        {tallImage && (
                            <div className="relative w-full">
                               
                                <div className="relative aspect-3/4  md:aspect-3/5 w-full">
                                    <Image
                                        src={tallImage.src}
                                        alt={tallImage.alt}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 56vw, 35vw"
                                        priority
                                    />
                                </div>
                            </div>
                        )}

                        {/* Short images — stacked column */}
                        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2">
                            {shortImages.map((img) => (
                               
                                <div
                                    key={img.id}
                                    className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 44vw, 27vw"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
            

                </div>
            </div>
        </section>
    );
};

export default IntroFairytaleSection;