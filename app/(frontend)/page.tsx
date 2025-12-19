import { HomePage } from "@/fauters/Home";
import { getHomePage } from "@/lib/payload";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Force dynamic rendering to always fetch fresh data
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
      sections={homePage.sections || []}
    />
  );
}
