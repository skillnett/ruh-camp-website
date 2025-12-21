import { HomePage } from "@/fauters/Home";
import { getHomePage } from "@/lib/payload";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return {
    title: homePage?.title || "RUH Camp",
    description: homePage?.metaDescription || "Ласкаво просимо до RUH Camp",
  };
}

export default async function Home() {
  const homePage = await getHomePage();

  if (!homePage) {
    notFound();
  }

  return (
    <HomePage
      heroSection={homePage.heroSection}
      aboutSection={homePage.aboutSection}
      aboutMentorSection={homePage.aboutMentorSection}
      guestsSection={homePage.guestsSection}
      servicesSection={homePage.servicesSection}
      advantagesSection={homePage.advantagesSection}
      informationCampSection={homePage.informationCampSection}
      sections={homePage.sections || []}
    />
  );
}
