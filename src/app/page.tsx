import Header from "@/components/Header/Header";
import Temporadas from "./(sections)/Temporadas/Temporadas";
import Hero from "./(sections)/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Temporadas />
    </div>
  );
}
