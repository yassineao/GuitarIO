"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../pages/api/AuthContext";

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

const Navbar = () => {
  const router = useRouter();
  const { connected, user, logout } = useAuth();

  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = user?.user || user?.sub || "User";

  // Active link helper (keeps your original behavior)
  const isActive = (path) => (router.pathname === path ? "md:text-fg-brand text-fg-brand" : "");

  // Dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  // Start with system preference
  useEffect(() => {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    if (prefersDark) setIsDark(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#home", activeMatch: "/" }, // matches your old isActive("/")
    { label: "Learn", href: "/options", activeMatch: "/options" },
    { label: "Search", href: "/notes", activeMatch: "/notes" },
    { label: "Play", href: "/play-song", activeMatch: "/play-song" },
  ];

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Brand */}
          <Link href="/#home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">GuitarIO</span>
          </Link>

          {/* Right side actions */}
          <div className="flex md:order-2 items-center gap-2 rtl:space-x-reverse">
            {connected ? (
              <button
                type="button"
                onClick={logout}
                className="text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                logout ({displayName})
              </button>
            ) : (
              <Link
                href="/login"
                className={[
                  "text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none",
                  isActive("/login"),
                ].join(" ")}
              >
                login
              </Link>
            )}

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark((v) => !v)}
              className="inline-flex items-center justify-center p-2 w-10 h-10 text-body rounded-base hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
              type="button"
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
              aria-controls="navbar-sticky"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0",
                      isActive(item.activeMatch),
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile menu (React-controlled) */}
        <div
          className={[
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="max-w-screen-xl mx-auto px-4 pb-4">
            <div className="rounded-base border border-default bg-neutral-secondary-soft p-4 space-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "block py-2 px-3 rounded hover:bg-neutral-tertiary text-heading",
                    isActive(item.activeMatch),
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}

              {!connected ? (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                >
                  login
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                >
                  logout ({displayName})
                </button>
              )}

              <button
                onClick={() => setIsDark((v) => !v)}
                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-neutral-tertiary text-heading"
                type="button"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;