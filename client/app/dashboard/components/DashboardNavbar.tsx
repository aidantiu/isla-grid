"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

import { useAuth } from "@/providers/authentication";

const DashboardNavbar = () => {
  const links = [
    { href: "/dashboard/ai", location: "AI" },
    { href: "/dashboard/nfc", location: "NFC Card" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      id="dashboard-navbar"
      className="fixed top-0 left-0 right-0 bg-[#FFFDFA]/90 backdrop-blur-md shadow-sm z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-nowrap justify-between items-center gap-4">
          <Link
            href="/dashboard"
            className="text-3xl font-extrabold text-[#131B28] whitespace-nowrap"
          >
            <span className="text-[#FC7019]">Isla</span>Grid
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex md:flex-nowrap items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#FC7019] font-medium whitespace-nowrap transition-colors"
                >
                  {link.location}
                </Link>
              ))}
            </div>

            {/* Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/dashboard/profile"
                aria-label="Profile"
                className="inline-flex items-center justify-center rounded-full p-2 text-[#FC7019] transition-colors hover:bg-[#FC7019]/10 hover:text-[#E25F17]"
              >
                <FaRegUserCircle className="h-5 w-5" />
              </Link>
              {state === "authenticated" && (
                <button
                  onClick={logout}
                  aria-label="Logout"
                  className="inline-flex items-center justify-center rounded-full p-2 text-[#FC7019] transition-colors hover:bg-[#FC7019]/10 hover:text-[#E25F17]"
                >
                  <LuLogOut className="h-5 w-5" />
                </button>
              )}
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
        </div>

        {/* Mobile Menu */}
        {/* --- ENHANCEMENT ---
          Changed max-h-112 to max-h-80 for a snappier transition,
          as the redundant profile block has been removed.
        */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-4">
            {/* --- ENHANCEMENT ---
              Removed the redundant profile block from the mobile menu
              to simplify the UI and remove the "2 profiles" issue.
            */}

            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-[#FC7019]/10 text-gray-700 hover:text-[#FC7019] font-medium transition-all shadow-sm"
                >
                  {link.location}
                </Link>
              ))}
            </div>

            {state === "authenticated" && (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                aria-label="Logout"
                className="px-4 py-3 flex rounded-xl bg-white hover:bg-[#FC7019]/10 text-gray-700 hover:text-[#FC7019] font-medium transition-all shadow-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
