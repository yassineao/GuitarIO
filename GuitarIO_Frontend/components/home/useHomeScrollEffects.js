import { useEffect } from "react";

export default function useHomeScrollEffects() {
  useEffect(() => {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const header = document.getElementById("header");
    const scrollUpElement = document.getElementById("scroll-up");
    const sections = document.querySelectorAll("section[id]");

    const openMenu = () => navMenu?.classList.add("show-menu");
    const closeMenu = () => navMenu?.classList.remove("show-menu");

    navToggle?.addEventListener("click", openMenu);
    navClose?.addEventListener("click", closeMenu);

    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const scrollHandler = () => {
      header?.classList.toggle("bg-header", window.scrollY >= 50);
      scrollUpElement?.classList.toggle("show-scroll", window.scrollY >= 350);

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute("id");
        const sectionClass = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
        const active = window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight;

        sectionClass?.classList.toggle("active-link", active);
      });
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      navToggle?.removeEventListener("click", openMenu);
      navClose?.removeEventListener("click", closeMenu);
      navLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
}
