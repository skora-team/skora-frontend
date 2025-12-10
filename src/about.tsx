import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram } from "react-icons/fa";

const About: React.FC = () => {
  const team = [
    {
      img: "/chish.png",
      name: "@Chish",
      role: "Founder & Backend",
      bio: "Founding member and Backend Engineer",
      github: "https://github.com/chishxd",
      insta: "https://www.instagram.com/chishxd/",
    },
    {
      img: "/Muinn.png",
      name: "@Muin",
      role: "Backend Engineer",
      bio: "Creates Quizzes and Training model.",
      github: "https://github.com/muin-15",
    },
    {
      img: "/omkarr.png",
      name: "@Omkarr",
      role: "Frontend Developer",
      bio: "Leader of Frontend and design.",
      github: "https://github.com/omkarshinde7613",
      insta: "https://www.instagram.com/shinde_omkar_7613/",
    },
    {
      img: "/Amannn.png",
      name: "@Aman",
      role: "Frontend Developer",
      bio: "Making the Face of the website.",
      github: "https://github.com/AmanBachche",
      insta: "https://www.instagram.com/aman__bachche77/",
    },
    {
      img: "/rihannn.png",
      name: "@rihan",
      role: "Community Manager",
      bio: "Helping gather and documentation.",
      github: "https://github.com/rihanjamadar",
      insta: "https://www.instagram.com/rihan.jamadar353/",
    },
    {
      img: "/virajjj.png",
      name: "@Viraj",
      role: "Assistant Community Manager",
      bio: "Likes Banging small things",
      insta: "https://www.instagram.com/viraj_patil9332/",
    },
    {
      img: "/tson.png",
      name: "@Tyson",
      role: "Team Mascot",
      bio: "The Greatest Dog of All Time",
    },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/bgabout.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "600px auto",
        backgroundAttachment: "fixed",
        backgroundColor: "#000",
      }}
    >
      {/* NAVBAR */}
      <nav className="w-full px-[7vw] py-3.5 flex items-center justify-between bg-black/60 backdrop-blur border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg">
            <img
              src="/coin.png"
              className="w-[32px] h-[45px] image-render transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]"
              alt="coin"
            />
            <img src="/logo.png" className="h-8" alt="logo" />
          </Link>

          {/* NAV LINKS */}
          <ul className="flex items-center gap-6 text-sm">
            <li className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-yellow-300">Learn ▾</span>
              <div className="absolute hidden group-hover:block mt-2 w-40 bg-black/90 rounded-lg border border-white/10 shadow-lg">
                <a className="block px-4 py-2.5 text-sm hover:bg-white/10">Python</a>
                <a className="block px-4 py-2.5 text-sm hover:bg-white/10">R Program</a>
                <a className="block px-4 py-2.5 text-sm hover:bg-white/10">SQL</a>
              </div>
            </li>

            <li className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-yellow-300">Practice ▾</span>
              <div className="absolute hidden group-hover:block mt-2 w-40 bg-black/90 rounded-lg border border-white/10 shadow-lg">
                <a className="block px-4 py-2.5 text-sm hover:bg-white/10">Quizzes</a>
                <a className="block px-4 py-2.5 text-sm hover:bg-white/10">Exercises</a>
              </div>
            </li>

            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* SIGN UP BUTTON */}
        <button
          className="
            relative
            bg-[#F9CF4F]
            text-black
            font-bold
            text-xs
            px-4
            py-2
            border-4
            border-[#786601]
            shadow-[0_3px_0_0_#000]
            active:shadow-[0_1px_0_0_#000]
            active:translate-y-[1px]
            hover:bg-[#ffefb5]
            rounded-none
            font-['Press_Start_2P']
          "
        >
          Sign Up
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-28">
        {/* HERO SECTION */}
        <section className="px-[7vw] py-20 grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">

          {/* IMAGE LEFT */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/devicebg.png"
              alt="device"
              className="w-[280px] md:w-[320px] drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)] pixelated"
            />
          </div>

          {/* TEXT RIGHT */}
          <div>
            <p className="inline-block bg-[#003b2d] text-[#8ef0c3] px-3 py-1 rounded-lg text-xs mb-3">
              v1.0 • Skora
            </p>

            <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl leading-relaxed mb-4">
              THE MOST FUN WAY TO <br /> LEARN TECH SKILLS
            </h1>

            <p className="text-gray-300 text-[15px] max-w-xl mb-2">
              Skora makes learning to code feel like a retro game — complete quests,
              earn XP, unlock regions, and collect badges.
            </p>

            <p className="text-gray-400 text-sm">
              (づ｡◕‿‿◕｡)づ ☆ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ☆ (ᵔ◡ᵔ)
            </p>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="px-[7vw] py-16 text-center">
          <h2 className="font-['Press_Start_2P'] text-xl mb-2">MEET THE TEAM</h2>
          <p className="text-gray-300 text-sm mb-10">
            The creators of Skora who love turning coding into an RPG.
          </p>

          {/* GRID — 4 PER ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {team.map((member, i) => (
              <div
                key={i}
                className="bg-black/40 border-2 border-white/10 rounded-2xl pb-5 backdrop-blur hover:-translate-y-2 hover:border-yellow-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition"
              >
                {/* Header */}
                <div className="flex gap-2 bg-black/70 px-4 py-2 rounded-t-2xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fdbc40]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>

                {/* Avatar */}
                <img
                  src={member.img}
                  className="mx-auto mt-3 mb-2 w-24 rounded-lg border-4 border-yellow-300"
                  alt={member.name}
                />

                <h3 className="font-semibold text-base">{member.name}</h3>
                <p className="text-yellow-300 text-xs mt-1">{member.role}</p>
                <p className="text-gray-200 text-xs px-4 mt-2">{member.bio}</p>

                {/* SOCIAL ICONS (Conditional Rendering) */}
                <div className="flex justify-center gap-4 mt-3 text-lg">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition"
                    >
                      <FaGithub />
                    </a>
                  )}

                  {member.insta && (
                    <a
                      href={member.insta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-pink-500 transition"
                    >
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-4 text-center text-gray-400 text-xs border-t border-white/20 bg-black/40">
        © 2025 Skora. Made with ❤️
      </footer>
    </div>
  );
};

export default About;
