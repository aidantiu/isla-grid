"use client";

import { Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/providers/language";

type LanguageOption = "en" | "tl";

const LABELS: Record<LanguageOption, string> = {
  en: "English",
  tl: "Tagalog",
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleSelect = (value: LanguageOption) => {
    setLanguage(value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-56 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          <p className="text-sm font-semibold text-gray-700">Choose language</p>
          <div className="mt-3 space-y-2">
            {(Object.keys(LABELS) as LanguageOption[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleSelect(value)}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                  language === value
                    ? "border-[#FC7019] bg-orange-50 text-[#FC7019]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#FC7019]/40 hover:bg-orange-50"
                }`}
              >
                <span>{LABELS[value]}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    language === value ? "bg-[#FC7019]" : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FC7019] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FC7019]/40"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="h-5 w-5" aria-hidden />
        <span className="sr-only">Toggle language selection</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
