"use client";

import { useState } from "react";
import Link from "next/link";

const DashboardNavbar = () => {
  const links = [
    { href: "/dashboard", location: "Dashboard" },
    { href: "/dashboard/ai", location: "Dashboard AI" },
    { href: "/dashboard/nfc", location: "NFC Card" },
    { href: "/dashboard/profile", location: "Profile" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#FFFDFA]/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-nowrap justify-between items-center ">
          <Link
            href="/dashboard"
            className="text-3xl font-extrabold text-[#131B28] whitespace-nowrap"
          >
            <span className="text-[#FC7019]">Isla</span>Grid
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:flex-nowrap items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#FC7019] font-medium whitespace-nowrap"
              >
                {link.location}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-[#FC7019] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-gray-700 hover:text-[#FC7019] font-medium py-2"
              >
                {link.location}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
