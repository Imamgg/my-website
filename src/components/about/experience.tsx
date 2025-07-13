"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infiniteMovingCards";
import AboutHeader from "./aboutHeader";

export function Experience() {
  const experience = [
    {
      name: "WARGALAB TIF UTM",
      date: "Jul 2024 - Present",
      description:
        "Member of the Communication and Information Division of the UTM informatics engineering society WARGALAB TIF. Working on projects related to technology and informatics, handling digital communication strategies, and organizing tech-related events.",
    },
    {
      name: "Wargalab TIF UTM [Practicum assistant]",
      date: "Sep 2024 - Des 2024",
      description:
        "Practicum Assistant for Introduction to Information Technology. Assisted students in understanding the fundamental concepts of Information Technology and provided hands-on practice with weekly lecture materials.",
    },
    {
      name: "Wargalab TIF UTM [Practicum assistant]",
      date: "Mar 2025 - Jun 2025",
      description:
        "Practicum Assistant for Web Programming Fundamentals. Assisted students in understanding core web programming concepts, including HTML, CSS, JavaScript, Bootstrap, and jQuery. Provided hands-on guidance for weekly practical sessions and assignments.",
    },
    {
      name: "UKMFT-ITC [Staff Litbang]",
      date: "Feb 2025 - Aug 2025",
      description:
        "Responsible for enhancing the quality and competence of UKMFT-ITC members in technology through research and development initiatives. Organized training and workshops to prepare members for innovation and changes in the tech world.",
    },
    {
      name: "Wargalab TIF UTM [Admin Lab]",
      date: "2025 - Present",
      description:
        "Lab Admin who is responsible for the facilities in the lab and all administration about the lab.",
    },
  ];

  return (
    <div className="mb-20">
      <AboutHeader
        text="Experience"
        className="flex items-center justify-center pt-6"
      />
      <div className="rounded-md flex flex-col items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={experience}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}
