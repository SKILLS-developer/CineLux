import { useEffect } from "react";
import Hero from "./Hero/Hero";
import LatestRelease from "./LatestRelease/LatestRelease";
import Trending from "./Trending/Trending";
import Footer from "../shared/Footer/Footer";
export default function Home() {
  useEffect(() => {
    document.title = "CineLux - Stream Movies & Shows";
  }, []);
  return (
    <>
      <Hero />
      <LatestRelease />
      <Trending />
      <Footer />
    </>
  );
}
