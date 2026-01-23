import { Footer } from "@/components/Footer";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { HomePage } from "@/fauters/Home";
import { getBaseUrl, getHomePage } from "@/lib/payload";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();
  const baseUrl = getBaseUrl();
  const siteUrl = `${baseUrl}`;
  
  const title = homePage?.title || "STEP CAMP — табір, що рухає дітей уперед";
  const description = homePage?.metaDescription || "Дитячий та підлітковий кемп, де кожен прокачує свій STEP LEVEL: спорт, скілли, характер, впевненість, навчання та емоції";

  return {
    title: {
      default: title,
      template: "%s | STEP CAMP — табір, що рухає дітей уперед",
    },
    description,
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: "STEP CAMP",
      title,
      description,
      locale: "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function Home() {
  const homePage = await getHomePage();

  if (!homePage) {
    notFound();
  }

  return (
    <>
      <HeaderWrapper />
      <HomePage
        heroSection={homePage.heroSection}
        aboutSection={homePage.aboutSection}
        aboutMentorSection={homePage.aboutMentorSection}
        guestsSection={homePage.guestsSection}
        servicesSection={homePage.servicesSection}
        advantagesSection={homePage.advantagesSection}
        informationCampSection={homePage.informationCampSection}
      />
      <Footer />
    </>
  );
}
