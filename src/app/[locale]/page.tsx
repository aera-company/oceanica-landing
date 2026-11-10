import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Reveals } from "@/components/Reveals";
import { Film } from "@/components/film/Film";
import { Hero } from "@/components/film/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Company } from "@/components/sections/Company";
import { Closing } from "@/components/sections/Closing";
import { getDict, isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <a href="#company" className="skip mono">
        {t.a11y.skip}
      </a>
      <Film />
      <Header t={t} locale={locale} />
      <main>
        <Hero t={t.hero} a11y={t.a11y} shots={t.shots} />
        <Manifesto t={t.manifesto} />
        <Services t={t.services} a11y={t.a11y} />
        <Showcase t={t.showcase} a11y={t.a11y} />
        <Company t={t.company} a11y={t.a11y} />
      </main>
      <Closing t={t} />
      <Reveals />
    </>
  );
}
