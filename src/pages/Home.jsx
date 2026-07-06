import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function Home() {

  useEffect(() => {

    document.title = "CollegeSnaps | Home";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, []);

  return (

    <main className="home-page">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Stats */}
      <Stats />

      {/* Gallery */}
      <Gallery />

      {/* Footer */}
      <Footer />

    </main>

  );

}