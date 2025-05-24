import Header from "@/components/Header/Header";
import Hero from "./(sections)/Hero/Hero";
import About from "./(sections)/About/About";
import Piltover from "./(sections)/Piltover/Piltover";
import Temporadas from "./(sections)/Temporadas/Temporadas";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Piltover />
      <Temporadas />
    </div>
  );
}
