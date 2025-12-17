import React from "react";
import CourseCard from "./components/CourseCard";
import LevelUpSection from "./LevelUpSection";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 w-full h-20 bg-[#1c1a1a] flex items-center justify-between px-10 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/coin.png"
              className="w-[32px] h-[45px] image-render transition-transform duration-700 hover:-translate-y-1 hover:rotate-[360deg]"
              alt="coin"
            />
            <img src="/logo.png" className="h-9 image-render" alt="Skora Logo" />
          </div>

          <ul className="flex list-none gap-8">
            {/* LEARN DROPDOWN */}
            <li className="relative group">
              <a
                href="#"
                className="text-white text-base font-medium hover:text-yellow-400"
              >
                Learn ▾
              </a>
              <div className="absolute left-0 top-8 bg-gray-900 w-40 rounded-lg hidden group-hover:block z-10">
                <Link to="/signup" className="block px-4 py-2.5 text-white hover:bg-gray-700">
                  Python
                </Link>
                <Link to="/signup" className="block px-4 py-2.5 text-white hover:bg-gray-700">
                  R program
                </Link>
                <Link to="/signup" className="block px-4 py-2.5 text-white hover:bg-gray-700">
                  SQL
                </Link>
              </div>
            </li> 
          </ul>
        </div>

        {/* NAVBAR SIGN UP BUTTON */}
        <Link
  to="/signup"
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
    select-none
    transition-all
    font-['Press_Start_2P',cursive]
  "
>
  Sign Up
</Link>

      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-20">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative min-h-[80vh] overflow-hidden flex items-center justify-center px-5"
        >
          {/* Background GIF */}
          <img
            src="/bg1.gif"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero background"
          />

          {/* Beige gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#e6ccad]" />

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-2xl text-white flex flex-col items-center gap-4">
         <div className="flex flex-col items-center float-both">

  {/* START YOUR */}
  <h2 className="text-lg text-black font-['Press_Start_2P'] mb-12">
    START YOUR
  </h2>

  {/* CODING ADVENTURE TITLE */}
  <img
    src="/LandingPage_Text.gif"
    className="mx-auto scale-[2] md:scale-[2.5] origin-center image-render mb-7"
    alt="Coding Adventure"
  />

</div>

<p className="text-lg text-gray-100 mt-2">
    The most fun and beginner-friendly way to learn to code with Skora.
  </p>
            {/* GET STARTED BUTTON */}
            <Link
        to="/video"
        className="
        relative
        inline-block
        bg-[#F9CF4F]
        text-black
        px-5
        py-1
        border-3
        border-[#000000]
        shadow-[0_4px_0_0_#000]
        active:shadow-[0_2px_0_0_#000]
        active:translate-y-0.5
        hover:bg-[#ffefb5]
        rounded-none
        select-none
        transition-all
        font-['Press_Start_2P',cursive]
        delay 1000ms
        "
      >
        Get started
      </Link>

          </div>
        </section>

        {/* BELOW HERO SECTION */}
        <section className="bg-[#e6ccad] py-16 px-5">
          <div className="flex flex-col items-center justify-center text-center gap-5 mb-10">
            <p className="text-base">Learn and interact in a fun way!</p>

            <CourseCard
                          category="Course"
                          title="AIML"
                          description="Learn programming fundamentals such as variables, control flow, and loops with the…"
                          image="/beach.gif" level={""}            />
          </div>

          {/* LEVEL UP SECTIONS */}
          <LevelUpSection />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
