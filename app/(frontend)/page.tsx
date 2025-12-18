import { getHomePage } from "@/lib/payload";
import { HomeSections } from "@/components/HomeSections";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return {
    title: homePage?.title || "RUH Camp",
    description: homePage?.metaDescription || "Ласкаво просимо до RUH Camp",
  };
}

export default async function Home() {
  const homePage = await getHomePage();
  console.log('homePage---',homePage);

  if (!homePage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ласкаво просимо!</h1>
          <p className="text-gray-600">
            Створіть домашню сторінку в адмін-панелі Payload CMS
          </p>
          <a
            href="/admin"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Перейти до адмін-панелі
          </a>
        </div>
      </div>
    );
  }

  return (
    <main>
      <HomeSections sections={homePage.sections || []} />
    </main>
  );
}
