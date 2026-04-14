import Hero from "./Hero/Hero";
import LatestRelease from "./LatestRelease/LatestRelease";
import Trending from "./Trending/Trending";
import Footer from "../shared/Footer/Footer";
export default function Home() {
  return (
    <>
      <Hero />
      <LatestRelease />
      <Trending />
      <Footer />
    </>
  );
}
