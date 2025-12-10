import React from "react";

const About: React.FC = () => {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/bgabout.jpg')",
        backgroundColor: "#000",
        backgroundRepeat: "repeat",
        backgroundSize: "600px auto",
        backgroundAttachment: "fixed",
      }}
    >
      {/* NAVBAR */}
      <nav className="w-full px-[7vw] py-3.5 flex items-center justify-between bg-black/55 backdrop-blur border-b border-white/15">
        {/* left side */}
        <div className="flex items-center gap-10">
          {/* logo */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <img
              src="/coin.png"
              alt="coin"
              className="w-10 h-10 logo-coin transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]"
            />
            <img src="/logo.png" alt="Skora Logo" className="h-8" />
          </div>

          {/* nav links */}
          <ul className="flex items-center gap-6 text-sm">
            {/* Learn dropdown */}
            <li className="relative group">
              <button className="text-gray-200 border-b-2 border-transparent group-hover:text-yellow-300 group-hover:border-yellow-300">
                Learn ▾
              </button>
              <div className="absolute left-0 mt-2 hidden w-40 rounded-lg bg-black/90 border border-white/10 shadow-lg group-hover:block">
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                >
                  Python
                </a>
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                >
                  R program
                </a>
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                >
                  SQL
                </a>
              </div>
            </li>

            {/* Practice dropdown */}
            <li className="relative group">
              <button className="text-gray-200 border-b-2 border-transparent group-hover:text-yellow-300 group-hover:border-yellow-300">
                Practice ▾
              </button>
              <div className="absolute left-0 mt-2 hidden w-40 rounded-lg bg-black/90 border border-white/10 shadow-lg group-hover:block">
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                >
                  Quizzes
                </a>
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                >
                  Exercises
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* right side */}
        <button className="bg-yellow-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors">
          Sign up
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main>
        {/* HERO SECTION */}
        <section className="px-[7vw] py-20 grid gap-12 items-center md:grid-cols-[1fr,1.2fr]">
          <div className="flex justify-center md:justify-start">
            <img
              src="/devicebg.png"
              alt="device"
              className="w-[280px] md:w-[320px] drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
            />
          </div>

          <div>
            <p className="inline-block rounded-xl bg-[#003b2d] px-3 py-1 text-xs text-[#8ef0c3] mb-3">
              v1.0 • Skora
            </p>

            <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl leading-relaxed mb-4">
              THE MOST FUN WAY TO <br /> LEARN TECH SKILLS
            </h1>

            <p className="max-w-xl text-[15px] text-gray-300 mb-2">
              Skora makes learning to code feel like a retro game. Complete
              quests, earn XP, unlock regions, and collect badges.
            </p>

            <p className="text-sm text-gray-400">
              (づ｡◕‿‿◕｡)づ ☆ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ☆ (ᵔ◡ᵔ)
            </p>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="px-[7vw] py-16 text-center">
          <h2 className="font-['Press_Start_2P'] text-xl mb-3">
            MEET THE TEAM
          </h2>
          <p className="text-sm text-gray-300 mb-8">
            The creators of Skora who love turning coding into an RPG.
          </p>

          <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {/* CARD 1 */}
            <div className="rounded-2xl border-2 border-white/10 bg-black/40 backdrop-blur-md pb-5 transition-transform duration-200 hover:-translate-y-1.5 hover:border-yellow-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex gap-1.5 bg-black/70 px-4 py-2 rounded-t-2xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fdbc40]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <img
                src="/bg.png"
                alt="@Chish"
                className="mx-auto mt-3 mb-2 w-20 rounded-xl border-4 border-yellow-300"
              />
              <h3 className="text-base font-semibold">@Chish</h3>
              <p className="text-xs text-yellow-300 mt-1">
                Founder &amp; Backend
              </p>
              <p className="px-3 mt-2 text-xs text-gray-200">
                Founding member and Backend Engineer
              </p>
            </div>

            {/* CARD 2 */}
            <div className="rounded-2xl border-2 border-white/10 bg-black/40 backdrop-blur-md pb-5 transition-transform duration-200 hover:-translate-y-1.5 hover:border-yellow-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex gap-1.5 bg-black/70 px-4 py-2 rounded-t-2xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fdbc40]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <img
                src="/images/member1.png"
                alt="@dev1"
                className="mx-auto mt-3 mb-2 w-20 rounded-xl border-4 border-yellow-300"
              />
              <h3 className="text-base font-semibold">@dev1</h3>
              <p className="text-xs text-yellow-300 mt-1">Backend Engineer</p>
              <p className="px-3 mt-2 text-xs text-gray-200">
                Creates XP system &amp; quest engine.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="rounded-2xl border-2 border-white/10 bg-black/40 backdrop-blur-md pb-5 transition-transform duration-200 hover:-translate-y-1.5 hover:border-yellow-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex gap-1.5 bg-black/70 px-4 py-2 rounded-t-2xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fdbc40]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <img
                src="/images/member2.png"
                alt="@dev2"
                className="mx-auto mt-3 mb-2 w-20 rounded-xl border-4 border-yellow-300"
              />
              <h3 className="text-base font-semibold">@dev2</h3>
              <p className="text-xs text-yellow-300 mt-1">
                Artist / Pixel Designer
              </p>
              <p className="px-3 mt-2 text-xs text-gray-200">
                Draws Skora characters and worlds.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-6 border-t border-white/20 bg-black/40 py-4 text-center text-xs text-gray-400">
        © 2025 Skora. Made with ❤️
      </footer>
    </div>
  );
};

export default About;
