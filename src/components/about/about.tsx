"use client";

import ComputersCanvas from "./canvas/computers";
import AboutBackground from "./aboutBackground";
import AboutIntroduction from "./aboutIntroduction";
import { Experience } from "./experience";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <AboutBackground />
      <div className="mx-auto relative z-10 flex min-h-screen flex-col">
        <div>
          <AboutIntroduction />
          <Experience />
          <ComputersCanvas />
        </div>
      </div>
    </section>
  );
};

export default About;
