"use client";

import AboutBackground from "./aboutBackground";
import AboutIntroduction from "./aboutIntroduction";
import { Experience } from "./experience";

const About = () => {
  return (
    <section id="about" className="relative w-full overflow-x-hidden">
      <AboutBackground />
      <div className="mx-auto relative z-10 flex flex-col">
        <AboutIntroduction />
      </div>
      <Experience />
    </section>
  );
};

export default About;
