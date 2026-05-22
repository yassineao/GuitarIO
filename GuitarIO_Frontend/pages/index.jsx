import HomeHero from "@/components/home/HomeHero";
import LearningPaths from "@/components/home/LearningPaths";
import IntroSection from "@/components/home/IntroSection";
import PracticeRoadmap from "@/components/home/PracticeRoadmap";
import SongToolkit from "@/components/home/SongToolkit";
import ProgressArena from "@/components/home/ProgressArena";
import ScrollUpLink from "@/components/home/ScrollUpLink";
import useHomeScrollEffects from "@/components/home/useHomeScrollEffects";
import { useAuth } from "./api/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const userName = user?.user || user?.email || (user?.uid ? `User #${user.uid}` : "");

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
