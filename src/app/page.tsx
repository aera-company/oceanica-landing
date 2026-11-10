import { Header } from "@/components/Header";
import { Film } from "@/components/film/Film";
import { Hero } from "@/components/film/Hero";
import { Below } from "@/components/film/Below";

export default function Page() {
  return (
    <>
      <a href="#solutions" className="skip mono">
        Skip the film
      </a>
      <Film />
      <Header />
      <main id="top">
        <Hero />
        <Below />
      </main>
    </>
  );
}
