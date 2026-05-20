import "@/styles/globals.css";
import "@/styles/button.css";
import "@/styles/note.css";
import "@/styles/glitchT.css";
import "@/styles/options.css";
import "@/styles/buttonG.css";
import "@/styles/cards.css";
import "@/styles/formi.css";
import "@/styles/cyber.css";
import "@/styles/guitarLesson.css";
import "@/styles/lesson.css";
import "@/styles/teaching.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "@/components/navbarr";
import Footer from "@/components/footer";
import { AuthProvider } from "./api/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>


      <AuthProvider>
        <header className="header" id="header">
          <Navbar />
        </header>

        <Component {...pageProps} />
        <Footer />




        <Analytics />
      </AuthProvider>
    </>
  );
}
