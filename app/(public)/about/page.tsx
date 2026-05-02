
import Image from "next/image";


function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-primary-100" />
      <div className="w-1.5 h-1.5 rotate-45 bg-primary-100" />
      <div className="h-px flex-1 bg-primary-100" />
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className=" min-h-screen " >

      {/* ── SECTION 1: Portrait + Story ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-6 items-start">

          {/* Portrait — 5 cols */}
          <div className="md:col-span-5 md:sticky md:top-24 self-start">
            <div className="corner-frame">
              <div className="relative img-cinematic hover-zoom" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/about us/owner.jpg"
                  alt="Maritza — Founder of Casa de Flora Bar"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width:768px) 100vw, 42vw"
                />
              </div>
            </div>

            <div className="mt-8 pl-1">
              <GoldRule className="max-w-[140px] mb-3" />
              <p className="font-display text-primary text-xl" >
                Maritza, Founder
              </p>
              <p className=" text-xs tracking-widest uppercase mt-1 " >
                Casa de Flora Bar
              </p>
            </div>
          </div>

          {/* Story text — 7 cols */}
          <div className="md:col-span-7 md:pl-12 space-y-10">
            <div >
              <h2
                className=" font-serif text-4xl md:text-5xl lg:text-6xl "
              >
                Through the fire,<br />
                <em className=" text-primary italic" >
                  pandemic and flood
                </em>
              </h2>
            </div>

            <div>
              <p className=" text-sm leading-8" >
                A Brooklyn Native Born to Win through triumph and Tragedy. Dealing with tragedy is nothing
                new to Maritza. From Birth to now she is no stranger to Loss. Losing her Mother, who was 17
                at the time of her death, to a car accident at 3 months old and all Parental figures through
                her entire life including Father, Grand Parents, Great Grandparents, Aunt and sibling, she
                continues to LIVE life without fear. Making every triumph her victory.
              </p>
            </div>

            {/* Pull quote 1 */}
            <div>
              <blockquote
                className="font-serif text-xl  md:text-3xl border-l-2 border-l-primary-100 leading-snug pl-6 py-1"
              >
                &ldquo;Every Loss took a piece of me<br />and changed me as a person.&rdquo;
              </blockquote>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                Her Original Business — Next Door &ldquo;Ritz-Walton Wedding Collection&rdquo; suffered a
                3 alarm fire after being open for 1 year ½. She somehow managed to stand and make great
                strides into the Wedding Floral industry that then had to withstand the Pandemic. Prior to
                the Pandemic, Maritza decided to begin re-construction on her original store to re-open,
                however the universe had other plans and delayed that process due to Covid.
              </p>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                Isolated to her home for 3 months and staying clear of Covid due to her battle with
                Pulmonary Fibrosis, Maritza logged back into the corporate world of Mortgage Finance.
                &ldquo;I took on 3 jobs working from home in order to keep my business alive and to also
                work on new plans.&rdquo;
              </p>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                Maritza decided to take the store next to hers with the idea of opening a retail flower shop
                and Coffee Bar. Something that was missing in the community after the stapled flower shop
                ROXY&apos;s burned down a few months after her shop&apos;s fire. &ldquo;I had no idea how
                it was going to be, but I knew I had an idea that was going to be cool.&rdquo; She began
                offering Sip &amp; Clips in the summer for outdoor parties. &ldquo;The Sip &amp; Clip
                Concept went over so well and was enjoyed by both Men and Women.&rdquo;
              </p>
            </div>

            {/* Gallery strip */}
            <div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  "/about us/img_1.jpg",
                  "/about us/img_2.jpg",
                  "/about us/img_3.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative img-cinematic hover-zoom gold-bar-hover"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 20vw" // Add this!
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <GoldRule />
      </div>

      {/* ── SECTION 2: Build Story + Venue Image ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-6 items-start">

          {/* Venue image — left this time (visual rhythm flip) */}
          <div className="md:col-span-6 md:sticky md:top-24 self-start">
            <div className="corner-frame">
              <div
                className="relative img-cinematic hover-zoom"
                style={{ aspectRatio: "2/3" }}
              >
                <Image
                  src="/about us/img_4.jpg"
                  alt="Casa De Flora Bar interior"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                {/* Overlay tag */}
                <div
                  className="absolute bottom-6 left-6 z-10 px-4 py-3"
                  style={{ background: "rgba(30,18,12,0.65)", backdropFilter: "blur(6px)", borderLeft: "2px solid #c9a96e" }}
                >
                  <p className="f-display text-white italic text-lg leading-tight">Casa De Flora Bar</p>
                  <p className="f-body text-xs tracking-widest mt-1" >Grand Opening · June 24, 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Build story text — right */}
          <div className="md:col-span-6 md:pl-14 space-y-9">
            <div>
              <p className="f-body text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: "#c9a96e" }}>
                The Build
              </p>
              <h3
                className=" font-serif font-light leading-tight text-4xl md:text-6xl"
              >
                Built on savings,<br />
                <em className=" text-primary italic" >rebuilt on will</em>
              </h3>
            </div>

            <div>
              <p className=" text-sm leading-8">
                The Build out Began in 2021 after hiring a designer, Architect and Contractor. This dream
                was built with my savings from working three jobs, no loans, no access to capital, just
                savings. &ldquo;We ran into a lot of delays, but never expected to encounter
                &lsquo;IDA&rsquo;. We were 90% complete in September of 2021 and then IDA came in and
                took us all the way OUT!
              </p>
            </div>

            {/* Pull quote 2 */}
            <div>
              <blockquote
                className=" border-l-2 border-primary text-xl  md:text-3xl italic leading-snug pl-6 py-1"

              >
                &ldquo;Devastated and defeated was<br />an understatement. I was done.&rdquo;
              </blockquote>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                I was working out of a space in Paramus prepping for a wedding when I received the call that
                the store was filled with 5 ft of water. Mold had made its way under the boards of the floor
                and growing up the walls. To see the inventory and all of the hard work totally destroyed left
                me speechless. The contractor bailed out on me during the clean-up. Continuing to work hard
                and deposit her personal checks into her business accounts labeling them
                &ldquo;building my dream&rdquo; as Lisa Nichols advised.
              </p>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                Maritza was able to see her Vision come to life at the Grand Opening of Casa De Flora Bar on{" "}
                <strong className="font-medium" style={{ color: "#2a1f1a" }}>June 24th, 2022</strong>,
                surrounded by Family, friends and the community. Casa De Flora has become a trending
                sensation on TikTok and Instagram with customers visiting from all over, including other
                states and countries.
              </p>
            </div>

            <div>
              <p className="f-body text-sm leading-8" style={{ color: "#7a6258" }}>
                &ldquo;God has truly been Amazing. We appreciate all the Love and continued
                Support.&rdquo; We are still seeking an investor to take this to the level it could be
                with proper financing. We are also working on another grand idea coming Soon.
              </p>
            </div>

            <div>
              <div>
                <GoldRule className="max-w-[100px] mb-4" />
                <p className="f-display italic text-2xl" style={{ color: "#2a1f1a" }}>— Maritza</p>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
