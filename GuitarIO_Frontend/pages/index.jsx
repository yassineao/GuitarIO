import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Script from 'next/script';
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [userName, setUserName] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Retrieved token:", token);
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      console.log("Decoded name:", decoded);

      const name = decoded.user || decoded.sub || `User #${decoded.uid}`;

      console.log("Decoded name:", name);
      setUserName(name);
    } catch (err) {
      console.log("Invalid token", err);
    }
  }, []);





  useEffect(() => {
    // Check if user is logged in


    // Event listeners and ScrollReveal initialization
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const header = document.getElementById('header');
    const scrollUpElement = document.getElementById('scroll-up');
    const sections = document.querySelectorAll('section[id]');

    // Handle menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
      });
    }

    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    }

    // Remove menu on link click
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(n =>
      n.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      })
    );

    const scrollHandler = () => {
      if (window.scrollY >= 50) {
        header.classList.add('bg-header');
      } else {
        header.classList.remove('bg-header');
      }

      if (window.scrollY >= 350) {
        scrollUpElement.classList.add('show-scroll');
      } else {
        scrollUpElement.classList.remove('show-scroll');
      }

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector(
          `.nav__menu a[href*=${sectionId}]`
        );

        if (
          window.scrollY > sectionTop &&
          window.scrollY <= sectionTop + sectionHeight
        ) {
          sectionClass.classList.add('active-link');
        } else {
          sectionClass.classList.remove('active-link');
        }
      });
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);



  return (
    <div>

      <div >
        <section class="home section" id="home">


          <div class="shape__small"></div>
          <div class="shape__big"></div>
          <div id="guitar-title" className="home__container">
            <div className="header">
              <div className="title-wrapper">
                <span className="top-title">
                  {userName ? `👋 Welcome back ${userName}!` : "Learn Guitar"}
                </span>

                <h1 className="sweet-title">
                  <span data-text="GuitarIO">GuitarIO</span>
                  <span data-text="Platform">Platform</span>
                </h1>

                <span className="bottom-title">The Easy Way</span>

                <a href="/options" className="button">Explore Now!!</a>
              </div>
            </div>

          </div>
        </section>
        <section class="category section">

          <div class="shape__small"></div>
          <h1 class="home__title">
            choose your way of learning
          </h1>

          <div class="category__container container grid">
            <div class="category__card">
              <img src="/Spaceman.png" alt="category image" class="category__img" />
              <h3 class="category__title">Spaceman</h3>
              <p class="category__description">
                learn the basics of guitar playing from scratch
              </p>
              <img src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" class="category__star" />
            </div>
            <div class="category__card">
              <img src="/Kid.png" alt="category image" class="category__img" />
              <h3 class="category__title">Street Kid</h3>
              <p class="category__description">
                remember some notes
              </p>
              <img src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" class="category__star" />
            </div>
            <div class="category__card">
              <img src="/hacker.png" alt="category image" class="category__img" />
              <h3 class="category__title">Corpo</h3>
              <p class="category__description">
                Search for your favorite songs and learn to play them
              </p>
              <img src="https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png" alt="category image" class="category__star" />
            </div>
          </div>
        </section>

        <section class="party section" id="party">
          <div class="party__container container grid">
            <div class="party__data">
              <h2 class="section__title">
              </h2>
              <p class="party__description">
                your step-by-step guide to learning guitar!
                Whether you’re picking up a guitar for the very first time or looking to sharpen your skills, we’ve got you covered with easy lessons, song tutorials, practice tips, and tools to keep you motivated. Learn at your own pace and start playing the music you love today.
              </p>
              <button href="#" class="retro-pixel-button">
                Start learning
              </button>
            </div>
            <div class="party__images">
              <img src="/80.png" alt="party image" class="party__img" />
            </div>
          </div>
        </section>










        <a href="#" class="scrollup" id="scroll-up">
          <i class="gg-arrow-up-r"></i>
        </a>

      </div>
    </div>
  );
}
