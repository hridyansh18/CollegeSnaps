import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Upload from "../components/Upload";
import Gallery from "../components/Gallery";
import Stats from "../components/Stats";
import Quotes from "../components/Quotes";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function Home() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 2500);

    return () =>
      clearTimeout(timer);

  }, []);

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      overflow-hidden
    ">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Upload Section */}
      <Upload />

      {/* Stats */}
      <Stats />

      {/* Gallery */}
      <Gallery />

      {/* Quotes */}
      <Quotes />

      {/* Footer */}
      <Footer />

    </div>

  );

}