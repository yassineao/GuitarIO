// components/navbar.js
import React from "react";
import Link from "next/link";
import { useAuth } from  "../pages/api/AuthContext";
import { useRouter } from "next/router";


const Navbar = () => {
  const router = useRouter();
  const { connected, user, logout } = useAuth();

  const displayName = user?.user || user?.sub || "User";

  // Helper to check active routes
  const isActive = (path) => {
    return router.pathname === path ? "active-link" : "";
  };

  return (
    <div>
      <nav className="nav container">
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">

            <li className="nav__item">
              <Link href="/#home" className={isActive("/")}>
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link href="/options" className={isActive("/options")}>
                Learn
              </Link>
            </li>

            <li className="nav__item">
              <Link href="/notes" className={isActive("/notes")}>
                Search
              </Link>
            </li>

            <li className="nav__item">
              <Link href="/play-song" className={isActive("/play-song")}>
                Play
              </Link>
            </li>

            

            <li className="nav__item">
              {connected ? (
                <button onClick={logout}>
                  logout ({displayName})
                </button>
              ) : (
                <Link href="/login" className={isActive("/login")}>
                  login
                </Link>
              )}
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
