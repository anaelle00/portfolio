import { getLocale } from "next-intl/server";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  const locale = await getLocale();
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Journey locale={locale} />
      <Stack />
      <Contact />
    </main>
  );
}
