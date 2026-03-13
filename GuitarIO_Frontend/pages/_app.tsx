import "@/styles/globals.css";
import "@/styles/button.css";
import "@/styles/note.css";
import "@/styles/glitchT.css";
import "@/styles/leftb.css";
import "@/styles/retro.css";
import "@/styles/options.css";
import "@/styles/buttonG.css";
import "@/styles/cards.css";
import "@/styles/formi.css";
import "@/styles/cyber.css";
import "@/styles/guitarLesson.css";
import "@/styles/search.css";
import "@/styles/lesson.css";
import "@/styles/loader.css";

import type { AppProps } from "next/app";
import Script from "next/script";

import Navbar from "@/components/navbarr";
import Footer from "@/components/footer";
import { AuthProvider } from "./api/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
   

      <AuthProvider>
        <div className="main-layout">
          <header className="header" id="header">
            <Navbar />
          </header>

            <Component {...pageProps} />
       

        
        </div>
        <footer className="footer" id="footer">
  <Footer />
</footer>
      </AuthProvider>
    </>
  );
}