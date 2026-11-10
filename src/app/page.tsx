import { Header } from "@/components/Header";
import { WaterColumn } from "@/components/depth/WaterColumn";
import { Hero } from "@/components/depth/Hero";
import { Below } from "@/components/depth/Below";

export default function Page() {
  return (
    <>
      <WaterColumn />
      <Header />
      <main id="top">
        <Hero />
        <Below />
      </main>
    </>
  );
}
