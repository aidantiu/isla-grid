"use client";

import Image from "next/image";
import Link from "next/link";

const REGISTER_IMAGE =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-white via-[#FFF5EB] to-white px-4 py-10 text-gray-900">
      <div className="grid w-full max-w-5xl gap-10 rounded-3xl border border-[#F2D8C3] bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#FC7019]"
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </Link>
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FC7019]">
              IslaGrid
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Create your community account
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Join the IslaGrid network to design renewable energy proposals and
              unlock shared profit programs for your barangay.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Juan Dela Cruz"
                className="mt-2 w-full rounded-xl border border-[#F2D8C3] bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-[#FC7019] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@barangay.ph"
                className="mt-2 w-full rounded-xl border border-[#F2D8C3] bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-[#FC7019] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a secure password"
                className="mt-2 w-full rounded-xl border border-[#F2D8C3] bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-[#FC7019] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#FC7019] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#E8620F]"
            >
              Create account
            </button>

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#F2D8C3] bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FC7019] hover:text-[#FC7019]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden
                  focusable="false"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.8v3.6h5.05c-.22 1.2-.9 2.22-1.92 2.9l3.1 2.4c1.82-1.68 2.87-4.14 2.87-7.06 0-.68-.06-1.33-.17-1.94H12z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.54 14.32l-.85.64-2.48 1.93C4.83 19.61 8.17 21.6 12 21.6c2.7 0 4.96-.9 6.62-2.46l-3.1-2.4c-.86.58-1.97.93-3.52.93-2.71 0-5.01-1.78-5.82-4.25z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M3.21 7.71C2.44 9.26 2 10.98 2 12.8c0 1.82.44 3.54 1.21 5.09.81-2.47 3.11-4.25 5.82-4.25.85 0 1.64.15 2.34.43V9.6H7.38c-.96 0-1.79.34-2.44 1z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 4.8c1.47 0 2.8.51 3.84 1.52l2.88-2.88C16.96 1.98 14.7 1 12 1 8.17 1 4.83 3 3.21 6.09l3.17 2.46C7.99 6.58 9.29 4.8 12 4.8z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#FC7019] hover:text-[#D85505]"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="relative hidden overflow-hidden rounded-2xl md:block">
          <Image
            src={REGISTER_IMAGE}
            alt="Solar panels powering a community"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-black/40" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/80 p-4 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FC7019]">
              Community Snapshot
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Barangay San Miguel residents co-own their 250 kW solar hub and
              track profits via IslaGrid’s NFC wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
