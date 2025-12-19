import { TitleH2 } from "@/components/ui";
import { getMediaUrl } from "@/lib/payload";
import Image from "next/image";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function AboutSection({ section, id }: SectionProps) {
  const aboutCards: Array<{ text: string; image: unknown }> = [];

  if (section.aboutCards && Array.isArray(section.aboutCards)) {
    section.aboutCards.forEach((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      if (itemData.text) {
        aboutCards.push({
          text: itemData.text as string,
          image: itemData.image,
        });
      }
    });
  }

  return (
    <section
      id={id}
      className="section-bg-1 py-8 sm:py-12 md:py-16 lg:py-24 h-fit"
    >
      <div
        className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-24 mx-auto px-4 container"
        id="about"
      >
        <TitleH2 className="2xl:text-[86px] xl:text-[56px] text-3xl lg:text-5xl">
          {(section.title as string) || ""}
        </TitleH2>
        <div className="items-center gap-4 sm:gap-6 md:gap-8 2xl:gap-x-[190px] xl:gap-x-[90px] xl:gap-y-[90px] grid grid-cols-1 md:grid-cols-2">
          {aboutCards.length > 0 &&
            aboutCards.map((card, index) => {
              const imageUrl = card.image ? getMediaUrl(card.image) : null;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 lg:pr-12 rounded-[32px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[58px] text-black gradient-pink"
                >
                  <span className="block w-full sm:w-[66%] xl:text-[40px] text-lg md:text-xl lg:text-2xl text-balance">
                    {card.text}
                  </span>
                  {imageUrl && (
                    <div className="relative w-24 sm:w-36 md:w-40 lg:w-48 h-24 sm:h-36 md:h-40 lg:h-48 shrink-0">
                      <Image
                        src={imageUrl}
                        alt={card.text}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
