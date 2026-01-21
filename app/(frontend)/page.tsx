import { Footer } from "@/components/Footer";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { HomePage } from "@/fauters/Home";
import { getHomePage } from "@/lib/payload";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return {
    title: {
      default: homePage?.title || "STEP CAMP — табір, що рухає дітей уперед",
      template: "%s | STEP CAMP — табір, що рухає дітей уперед",
    },
    description: homePage?.metaDescription || "Дитячий та підлітковий кемп, де кожен прокачує свій STEP LEVEL: спорт, скілли, характер, впевненість, навчання та емоції",
    openGraph: {
      title: homePage?.title || "STEP CAMP — табір, що рухає дітей уперед",
      description: homePage?.metaDescription || "Дитячий та підлітковий кемп, де кожен прокачує свій STEP LEVEL: спорт, скілли, характер, впевненість, навчання та емоції",
    },
    twitter: {
      card: "summary_large_image",
      title: homePage?.title || "STEP CAMP — табір, що рухає дітей уперед",
      description: homePage?.metaDescription || "Дитячий та підлітковий кемп, де кожен прокачує свій STEP LEVEL: спорт, скілли, характер, впевненість, навчання та емоції",
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
