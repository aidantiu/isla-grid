"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const carouselImages = [
  { src: "/cc1.jpg", alt: "Engineers installing solar panels in a barangay" },
  { src: "/cc2.jpg", alt: "Community members collaborating on clean energy" },
  { src: "/c3.png", alt: "Solar array powering a coastal Philippine village" },
];

const SLIDE_INTERVAL = 6000;

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center opacity-80"
            />
          </div>
        ))}
      </div>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-b from-black/95 via-black/70 to-black/30 z-10" />
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-shadow leading-tight">
          Introducing <span className="text-[#FC7019]">IslaGrid</span>
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          In collaboration with Philippine SMEs
        </p>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-shadow font-light">
          A community-driven approach to harness the Philippines renewable
          energy, built by SparkPlug.
        </p>
        <a
          href="/ai"
          className="mt-10 inline-block bg-[#FC7019] text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-xl hover:brightness-95 transition-all transform hover:-translate-y-1"
        >
          Discover The Future of Energy
        </a>
      </div>
    </header>
  );
};

export default HeroSection;
