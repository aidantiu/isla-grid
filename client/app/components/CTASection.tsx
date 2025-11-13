"use client";

import { useLanguage } from "@/providers/language";

const copy = {
  en: {
    heading: "Ready to power your community?",
    description: "Take the first step toward clean, affordable, and independent energy. IslaGrid Home helps you generate, save, and even earn from your own power. Join thousands of Filipino families building a brighter, more sustainable future — one household at a time.",
    cta: "Contact SparkPlug Today",
  },
  tl: {
    heading: "Handa nang magbigay ng kuryente sa inyong komunidad?",
    description: "Gawin ang unang hakbang tungo sa malinis, abot-kaya, at independenteng enerhiya. Tumutulong ang IslaGrid Home na bumuo, mag-impok, at kumita pa mula sa inyong sariling kuryente. Sumali sa libu-libong pamilyang Pilipino na bumubuo ng mas maliwanag at mas sustainable na kinabukasan — isang sambahayan sa isang pagkakataon.",
    cta: "Makipag-ugnayan sa SparkPlug Ngayon",
  },
} as const;

const CTASection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="contact" className="bg-[#131B28] text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          {t.heading}
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          {t.description}
        </p>
        <a
          href="#"
          className="mt-10 inline-block bg-[#FC7019] text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-xl hover:brightness-95 transition-all transform hover:-translate-y-1"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
};

export default CTASection;
