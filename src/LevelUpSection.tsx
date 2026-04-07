  import React from "react";
  import { useFadeInOnScroll } from "./hooks/useFadeInOnScroll";


  const LevelUpSection: React.FC = () => {
    // FIRST SECTION FADE HOOKS
    const img1 = useFadeInOnScroll<HTMLImageElement>();
    const title1 = useFadeInOnScroll<HTMLHeadingElement>();
    const para1 = useFadeInOnScroll<HTMLParagraphElement>();

    // SECOND SECTION FADE HOOKS
    const img2 = useFadeInOnScroll<HTMLImageElement>();
    const title2 = useFadeInOnScroll<HTMLHeadingElement>();
    const para2 = useFadeInOnScroll<HTMLParagraphElement>();

    // THIRD SECTION FADE HOOKS
    const img3 = useFadeInOnScroll<HTMLImageElement>();
    const title3 = useFadeInOnScroll<HTMLHeadingElement>();
    const para3 = useFadeInOnScroll<HTMLParagraphElement>();

    return (
      <>
        {/* FIRST SECTION (Image Left, Text Right) */}
        <section className="mt-40 py-24 px-6 text-black flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* LEFT IMAGE */}
            <div className="flex justify-center image-render md:justify-start">
              <img
                ref={img1.ref}
                src="segade.png"
                className={`${
                  img1.isVisible ? "fade-up " : "opacity-0 translate-y-5"
                } w-64 md:w-450`}
                alt="section visual"
              />
            </div>

            {/* RIGHT TEXT */}
            <div className="max-w-md text-right ml-auto">
              <h2
                ref={title1.ref}
                className={`text-3xl md:text-4xl font-['Press_Start_2P'] mb-4 leading-snug 
                ${
                  title1.isVisible
                    ? "fade-up "
                    : "opacity-0 translate-y-5"
                }`}
              >
                Level up your learning
              </h2>

              <p
                ref={para1.ref}
                className={`text-black-300 text-[20px] leading-relaxed 
                ${
                  para1.isVisible
                    ? "fade-up "
                    : "opacity-0 translate-y-5"
                }`}
              >
                Gain XP and collect badges as you complete bite-sized lessons in
                Aiml, Python, R Programming, and Sql. Our beginner-friendly
                curriculum makes learning to code as motivating as completing your
                next quest.
              </p>
            </div>
          </div>
        </section>

        {/* SECOND SECTION (Text Left, Image Right) */}
        <section className="mt-20 py-24 px-6 text-black flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* LEFT TEXT */}
            <div className="max-w-md text-left">
              <h2
                ref={title2.ref}
                className={`text-3xl md:text-4xl font-['Press_Start_2P'] mb-4 leading-snug 
                ${
                  title2.isVisible
                    ? "fade-up "
                    : "opacity-0 translate-y-5"
                }`}
              >
                Practice your coding chops
              </h2>

              <p
                ref={para2.ref}
                className={`text-black-300 text-[20px] leading-relaxed 
                ${
                  para2.isVisible
                    ? "fade-up "
                    : "opacity-0 translate-y-5"
                }`}
              >
                Take your skills further with code challenges and project
                tutorials designed to help you apply what you learned to
                real-world problems and examples.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end">
              <img
                ref={img2.ref}
                src="/pokemoncard.png"
                className={`${
                  img2.isVisible ? "fade-up " : "opacity-0 translate-y-5"
                } w-64 md:w-80`}
                alt="section visual"
              />
            </div>
          </div>
        </section>

        {/* THIRD SECTION (Image Left, Text Right) */}
  <section className="mt-40 py-24 px-6 text-black flex justify-center">
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">

      {/* LEFT IMAGE (BIGGER + CREDIT) */}
      <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
        <img
          ref={img3.ref}
          src="/chi.gif"
          className={`${
            img3.isVisible ? "fade-up" : "opacity-0 translate-y-5"
          } w-80 md:w-[800px]`}   // ← increased size
          alt="section visual"
        />

        {/* CREDIT */}
        <div
    className="
      mt-4 
      inline-block
      bg-[#F9CF4F]
      text-black 
      font-['Press_Start_2P']
      text-[8px]
      px-3 
      py-1.5
      border-2 
      border-black
      shadow-[0_3px_0_0_#000]
      rounded-none
      select-none
    "
  >
    Our Founder Website{"  "}
    <a
      href="https://falling-seasons.vercel.app/"
      target="_blank"
      className="underline hover:text-[#5a4a00]"
    >
      @chish
    </a>
  </div>
      </div>

      {/* RIGHT TEXT */}
      <div className="max-w-md text-right ml-auto">
        <h2
          ref={title3.ref}
          className={`text-3xl md:text-4xl font-['Press_Start_2P'] mb-4 leading-snug 
          ${title3.isVisible ? "fade-up " : "opacity-0 translate-y-5"}`}
        >
          Turn Knowledge Into Creations
        </h2>

        <p
          ref={para3.ref}
          className={`text-black-300 text-[20px] leading-relaxed 
          ${para3.isVisible ? "fade-up" : "opacity-0 translate-y-5"}`}
        >
          Every lesson becomes a mini-project you can show off—websites, games,
          tools, and fun experiments that prove what you’ve learned. The more
          you explore, the more you build. And the more you build, the more
          unstoppable you become.
        </p>
      </div>

    </div>
  </section>

      </>
    );
  };

  export default LevelUpSection;
