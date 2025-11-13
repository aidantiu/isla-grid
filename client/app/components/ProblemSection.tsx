"use client";

import { useLanguage } from "@/providers/language";

const copy = {
  en: {
    title: "The Problem",
    heading: "A Nation of Rich Resources, Sidelined.",
    description: "Despite the Philippines' rich renewable energy potential, most households still rely on expensive, non-renewable power. Many Filipinos struggle with high electricity bills, frequent outages, and limited access to clean energy solutions that truly fit their needs and budgets.",
    card1Title: "High Energy Costs",
    card1Text: "Everyday appliance use and rising electricity rates make monthly bills harder to manage for Filipino families.",
    card1Cta: "IslaGrid helps you find cleaner, cheaper power options designed for your home",
    card2Title: "Limited Access to Clean Energy",
    card2Text: "Current net-metering programs mostly benefit private property owners.",
    card2Cta: "Renters and small homeowners are often left out of renewable energy opportunities",
    card3Title: "Missed Home Potential",
    card3Text: "Your home's sunlight, space, or local environment could be producing power and savings.",
    card3Cta: "IslaGrid helps you unlock your property's renewable potential and turn it into real value.",
  },
  tl: {
    title: "Ang Problema",
    heading: "Isang Bansang Mayaman sa Likas na Yaman, Naiwan.",
    description: "Sa kabila ng mayamang renewable energy potential ng Pilipinas, karamihan ng sambahayan ay umaasa pa rin sa mahal at hindi renewable na kuryente. Maraming Pilipino ang nahihirapan sa mataas na singil sa kuryente, madalas na brownout, at limitadong access sa clean energy na angkop sa kanilang pangangailangan at badyet.",
    card1Title: "Mataas na Gastos sa Kuryente",
    card1Text: "Ang pang-araw-araw na paggamit ng mga appliances at tumataas na presyo ng kuryente ay nagiging mas mahirap para sa mga pamilyang Pilipino.",
    card1Cta: "Tumutulong ang IslaGrid na makahanap ng mas malinis at mas murang kuryente para sa iyong tahanan",
    card2Title: "Limitadong Access sa Clean Energy",
    card2Text: "Ang kasalukuyang net-metering programs ay higit na nakikinabang ang mga may-ari ng pribadong ari-arian.",
    card2Cta: "Ang mga nangungupahan at maliliit na may-ari ng bahay ay madalas na naiiwanan sa renewable energy opportunities",
    card3Title: "Hindi Nagagamit na Potensyal ng Tahanan",
    card3Text: "Ang sikat ng araw, espasyo, o kapaligiran ng iyong tahanan ay maaaring gumawa ng kuryente at ipon.",
    card3Cta: "Tumutulong ang IslaGrid na buksan ang renewable potential ng iyong ari-arian at gawing tunay na halaga.",
  },
} as const;

const ProblemSection = () => {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="problem" className="py-24 bg-[#FFFDFA]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold uppercase text-[#FC7019] tracking-widest">
            {t.title}
          </h2>
          <p className="mt-3 text-4xl md:text-5xl font-extrabold text-[#131B28]">
            {t.heading}
          </p>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            {t.description}
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center">
              {/* icon: bill / high cost */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2.5" y="5" width="19" height="14" rx="2" strokeWidth="2" />
                <path d="M7 9h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 15h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 8v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {t.card1Title}
            </h3>
            <p className="mt-2 text-gray-600">
              {t.card1Text} <br /> <br />
              {t.card1Cta}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-full flex items-center justify-center">
              {/* icon: sun / clean energy */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <path d="M12 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.93 4.93l1.41 1.41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.66 17.66l1.41 1.41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 12h2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.93 19.07l1.41-1.41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.66 6.34l1.41-1.41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {t.card2Title}
            </h3>
            <p className="mt-2 text-gray-600">
              {t.card2Text} <br /> <br /> {t.card2Cta}
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
              {/* icon: house / missed home potential */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 11.5L12 4l9 7.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11.5v6.5a1 1 0 001 1h8a1 1 0 001-1v-6.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21V14h6v7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {t.card3Title}
            </h3>
            <p className="mt-2 text-gray-600">
              {t.card3Text} <br/> <br/>
              {t.card3Cta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
