import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";

const team = [
  { img: "/chish.png", name: "@Chish", role: "Founder & Backend", bio: "Founding member and Backend Engineer", github: "https://github.com/chishxd", insta: "https://www.instagram.com/chishxd/" },
  { img: "/Muinn.png", name: "@Muin", role: "Backend Engineer", bio: "Creates Quizzes and Training model.", github: "https://github.com/muin-15" },
  { img: "/omkarr.png", name: "@Omkarr", role: "Frontend Developer", bio: "Leader of Frontend and design.", github: "https://github.com/omkarshinde7613", insta: "https://www.instagram.com/shinde_omkar_7613/" },
  { img: "/Amannn.png", name: "@Aman", role: "Frontend Developer", bio: "Makes UI that hit hard!!.", github: "https://github.com/AmanBachche", insta: "https://www.instagram.com/aman__bachche77/" },
  { img: "/rihannn.png", name: "@rihan", role: "Community Manager", bio: "Helping gather and documentation.", github: "https://github.com/rihanjamadar", insta: "https://www.instagram.com/rihan.jamadar353/" },
  { img: "/virajjj.png", name: "@Viraj", role: "Assistant Community Manager", bio: "Likes Banging small things", insta: "https://www.instagram.com/viraj_patil9332/" },
  { img: "/tson.png", name: "@Tyson", role: "Team Mascot", bio: "The Greatest Dog of All Time" },
];

const About: React.FC = () => {
  // Shura reveal refs/state
  const shuraRef = useRef<HTMLDivElement | null>(null);
  const [shuraVisible, setShuraVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    const node = shuraRef.current;
    if (!node) return;

    // Trigger when element is near the center of viewport.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShuraVisible(true);
            obs.disconnect(); // reveal once
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -30% 0px", // trigger when element crosses center-ish area
        threshold: 0.35,
      }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

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
            <img src="/coin.png" className="w-[32px] h-[45px] image-render transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]" alt="coin" />
            <img src="/logo.png" className="h-8" alt="logo" />
          </Link>

          {/* NAV LINKS */}
          <ul className="flex items-center gap-6 text-sm">
            <li className="relative group cursor-pointer">
              <span className="text-gray-300 hover:text-yellow-300">Learn ▾</span>
              <div className="absolute hidden group-hover:block mt-2 w-40 bg-black/90 rounded-lg border border-white/10 shadow-lg">
                <Link to="/signup" className="block px-4 py-2.5 text-sm hover:bg-white/10">Python</Link>
                <Link to="/signup" className="block px-4 py-2.5 text-sm hover:bg-white/10">R Program</Link>
                <Link to="/signup" className="block px-4 py-2.5 text-sm hover:bg-white/10">SQL</Link>
              </div>
            </li>
            <li>
              <Link to="/" className="hover:text-yellow-300">Home</Link>
            </li>
          </ul>
        </div>

        {/* SIGN UP BUTTON */}
        <Link
          to="/signup"
          className="relative bg-[#F9CF4F] text-black font-bold text-xs px-4 py-2 border-4 border-[#786601] shadow-[0_3px_0_0_#000] active:shadow-[0_1px_0_0_#000] active:translate-y-[1px] hover:bg-[#ffefb5] rounded-none select-none transition-all font-['Press_Start_2P',cursive]"
        >
          Sign Up
        </Link>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-28">
        {/* HERO SECTION (device + text) */}
        <section className="px-[7vw] py-20 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* device */}
          <div className="flex justify-center md:justify-end">
            <img src="/devicebg.png" alt="device" className="w-[220px] md:w-[300px] drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)] image-render" />
          </div>

          {/* (empty center column to preserve balance on md) */}
          <div className="hidden md:block" />

          {/* text */}
          <div>
            <p className="inline-block bg-[#003b2d] text-[#8ef0c3] px-3 py-1 rounded-lg text-xs mb-3">v1.0 • Skora</p>

            <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl leading-relaxed mb-4">THE MOST FUN WAY TO <br /> LEARN TECH SKILLS</h1>

            <p className="text-gray-300 text-[15px] max-w-xl mb-2">
              Skora makes learning to code feel like a retro game — complete quests,
              earn XP, unlock regions, and collect badges.
            </p>

            <p className="text-gray-400 text-sm">(づ｡◕‿‿◕｡)づ ☆ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ☆ (ᵔ◡ᵔ)</p>
          </div>
        </section>

        {/* Spacer so page is not too short and to give room to scroll a bit */}
        <div className="h-24 md:h-28" />

        {/* SHURA REVEAL SECTION — appears when scrolled near center */}
        <section
          ref={shuraRef}
          className="relative min-h-[40vh] flex items-center justify-center px-[7vw] mb-12"
          aria-hidden={!shuraVisible}
        >
          {/* center container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* glowing radial behind (always present but fades together) */}
            <div
              className={`absolute rounded-full`}
              style={{
                width: shuraVisible ? 420 : 380,
                height: shuraVisible ? 420 : 380,
                background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.0) 60%)",
                filter: "blur(28px)",
                transition: "opacity 700ms ease, transform 700ms ease",
                opacity: shuraVisible ? 1 : 0,
                transform: shuraVisible ? "scale(1)" : "scale(0.96)",
                zIndex: 0,
              }}
            />

            <div className="flex items-center justify-center gap-6">
  {/* SHURA GIF — LEFT */}
  <img
    src="/bg_edited_gif_2e098945-88da-4e26-ad78-f4f48fc6136d_GIFSolo_20251213_113954.gif"
    alt="Shura singing"
    className={`relative z-10 w-44 md:w-56 transition-all duration-700 ease-out 
      ${shuraVisible ? "fade-up" : "opacity-0 translate-y-6"}
    `}
    style={{ imageRendering: "pixelated" }}
  />

  {/* SHURA IMAGE — RIGHT */}
  <img
    src="/shura.png"
    alt="Shura"
    className={`relative z-10 w-44 md:w-56 transition-all duration-700 ease-out 
      ${shuraVisible ? "fade-up" : "opacity-0 translate-y-6"}
    `}
    style={{ imageRendering: "pixelated" }}
  />
</div>


            {/* optional caption (you can remove) */}
            <p className={`mt-4 text-sm text-gray-300 transition-opacity duration-700 ${shuraVisible ? "opacity-100" : "opacity-0"}`}>
             Sherma is a cheerful, optimistic pilgrim NPC in Hollow Knight: Silksong.
            </p>
          </div>
        </section>

        {/* small spacer */}
        <div className="h-10" />

        {/* TEAM SECTION */}
        <section className="px-[7vw] py-8 text-center">
          <h2 className="font-['Press_Start_2P'] text-xl mb-2">MEET THE TEAM</h2>
          <p className="text-gray-300 text-sm mb-8">The creators of Skora who love turning coding into an RPG.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-black/40 border-2 border-white/10 rounded-2xl pb-5 backdrop-blur hover:-translate-y-2 hover:border-yellow-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition">
                <div className="flex gap-2 bg-black/70 px-4 py-2 rounded-t-2xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fdbc40]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>

                <img src={member.img} className="mx-auto mt-3 mb-2 w-24 rounded-lg border-4 border-yellow-300" alt={member.name} />

                <h3 className="font-semibold text-base">{member.name}</h3>
                <p className="text-yellow-300 text-xs mt-1">{member.role}</p>
                <p className="text-gray-200 text-xs px-4 mt-2">{member.bio}</p>

                <div className="flex justify-center gap-4 mt-3 text-lg">
                  {member.github && <a href={member.github} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition"><FaGithub /></a>}
                  {member.insta && <a href={member.insta} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-pink-500 transition"><FaInstagram /></a>}
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
