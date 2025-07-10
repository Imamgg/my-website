"use client";

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
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
            <AboutIntroduction />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
