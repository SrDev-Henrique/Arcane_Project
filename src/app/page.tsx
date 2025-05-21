import Header from "@/components/Header/Header";
import Temporadas from "./(sections)/Temporadas/Temporadas";
import Hero from "./(sections)/Hero/Hero";
import About from "./(sections)/About/About";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Temporadas />
    </div>
  );
}
