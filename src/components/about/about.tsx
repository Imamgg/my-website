"use client";

import AboutBackground from "./aboutBackground";
import AboutIntroduction from "./aboutIntroduction";
import { Experience } from "./experience";

const About = () => {
  return (
    <section id="about" className="relative w-full overflow-hidden">
      <AboutBackground />
      <div className="mx-auto relative z-10 flex flex-col">
        <AboutIntroduction />
        <Experience />
      </div>
    </section>
  );
};

export default About;
