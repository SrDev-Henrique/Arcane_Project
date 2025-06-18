import Header from "@/components/Header/Header";
import Hero from "./(sections)/Hero/Hero";
import About from "./(sections)/About/About";
import Piltover from "./(sections)/Piltover/Piltover";
import Temporadas from "./(sections)/Temporadas/Temporadas";
import Zaun from "./(sections)/Zaun/Zaun";
import Extras from "./(sections)/Extras/Extras";
import Outro from "./(sections)/Outro/Outro";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Piltover />
      <Zaun />
      <Temporadas />
      <Extras />
      <Outro />
    </div>
  );
}
