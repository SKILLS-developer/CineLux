import HeroImage from "../../assets/Hero.png";
export default function Hero() {
  return (
    <section className="hero">
      <Header />
      <img
        src={HeroImage}
        alt="The Batman"
        className="hero-image"
        fetchPriority="high"
        decoding="async"
      />
      
    </section>
  );
}
