import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import HomeHero from "@/components/home/HomeHero";
import LearningPaths from "@/components/home/LearningPaths";
import IntroSection from "@/components/home/IntroSection";
import PracticeRoadmap from "@/components/home/PracticeRoadmap";
import SongToolkit from "@/components/home/SongToolkit";
import ProgressArena from "@/components/home/ProgressArena";
import ScrollUpLink from "@/components/home/ScrollUpLink";
import useHomeScrollEffects from "@/components/home/useHomeScrollEffects";

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const name = decoded.user || decoded.sub || `User #${decoded.uid}`;
      setUserName(name);
    } catch (err) {
      // Keep the logged-out headline if the saved token cannot be decoded.
    }
  }, []);

  useHomeScrollEffects();

  return (
    <main className="home-page">
      <HomeHero userName={userName} />

      <PracticeRoadmap />
      <SongToolkit />
      <ProgressArena />

      <LearningPaths />
      <IntroSection />
      <ScrollUpLink />
    </main>
  );
}
