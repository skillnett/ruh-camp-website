import { DetailsPageClient } from "@/components/DetailsPageClient";
import { getDetailsBySeason } from "@/lib/getDetailsBySeason";
import { notFound } from "next/navigation";

interface PackagePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    v?: string;
    season?: string;
  }>;
}

const packageToColor: Record<string, string> = {
  весна: "green",
  літо: "yellow",
  осінь: "orange",
  зима: "blue",
};

const colorTheme = {
  green: {
    gradient: "bg-green-season",
    text: "text-green",
    border: "border-green",
    bg: "bg-green",
    seasonName: "ВЕСНЯНИЙ",
  },
  yellow: {
    gradient: "bg-yellow",
    text: "text-yellow",
    border: "border-yellow",
    bg: "bg-yellow",
    seasonName: "ЛІТНІЙ",
  },
  orange: {
    gradient: "bg-orange",
    text: "text-orange",
    border: "border-orange",
    bg: "bg-orange",
    seasonName: "ОСІННІЙ",
  },
  blue: {
    gradient: "bg-blue",
    text: "text-blue",
    border: "border-blue",
    bg: "bg-blue",
    seasonName: "ЗИМОВИЙ",
  },
} as const;

type ColorKey = keyof typeof colorTheme;

function getSeasonFromSlug(slug: string, variant?: string): string | null {
  if (variant) {
    const variantToSeason: Record<string, string> = {
      green: "весна",
      yellow: "літо",
      orange: "осінь",
      blue: "зима",
    };
    if (variantToSeason[variant]) {
      return variantToSeason[variant];
    }
  }

  const normalizedSlug = slug.toLowerCase().replace(/-/g, "");

  if (packageToColor[normalizedSlug]) {
    return normalizedSlug;
  }

  return null;
}

export default async function PackagePage({
  params,
  searchParams,
}: PackagePageProps) {
  const { slug } = await params;
  const { v: variant, season: seasonParam } = await searchParams;

  const seasonFromSlug = getSeasonFromSlug(slug, variant);
  const rawSeason = seasonParam || seasonFromSlug;
  const season = rawSeason ? rawSeason.toLowerCase().trim() : null;

  if (!season) {
    notFound();
  }

  let color: ColorKey | null = (variant as ColorKey) || null;

  if (!color || !colorTheme[color]) {
    const normalizedSlug = slug.toLowerCase().replace(/-/g, "");
    color = (packageToColor[normalizedSlug] as ColorKey) || null;
  }

  if (!color || !colorTheme[color]) {
    notFound();
  }

  const theme = colorTheme[color];
  const details = await getDetailsBySeason(season);

  return <DetailsPageClient theme={theme} season={season} details={details} />;
}
