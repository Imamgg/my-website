"use client";

import ComputersCanvas from "./canvas/computers";
import AboutBackground from "./aboutBackground";
import AboutHeader from "./aboutHeader";
import AboutIntroduction from "./aboutIntroduction";

const About = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <AboutBackground />
      <div className="mx-auto relative z-10 flex min-h-screen flex-col">
        <div>
          <AboutHeader />
          <AboutIntroduction />
          <ComputersCanvas />
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Test Page</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
