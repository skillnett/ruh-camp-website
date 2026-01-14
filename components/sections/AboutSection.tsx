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
    <section id={id} className="section-bg-1 py-12 md:py-16 lg:py-24 h-fit">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-24 mx-auto px-4 container">
        <TitleH2
          className="2xl:text-[86px] xl:text-[56px]"
          color={section.titleColor as string}
        >
          {(section.title as string) || ""}
        </TitleH2>
        <div className="items-center gap-5 sm:gap-x-10 sm:gap-y-6 2xl:gap-x-47.5 xl:gap-x-22.5 xl:gap-y-22.5 grid grid-cols-1 sm:grid-cols-2">
          {aboutCards.length > 0 &&
            aboutCards.map((card, index) => {
              const imageUrl = card.image ? getMediaUrl(card.image) : null;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center sm:items-center gap-3 sm:gap-4 px-5  md:px-8 lg:px-10 py-5 md:py-10 lg:py-12 lg:pr-12 rounded-4xl sm:rounded-[40px] md:rounded-[48px] lg:rounded-[58px] text-black gradient-pink"
                >
                  <span className="block w-full sm:w-[66%] xl:text-[40px] text-base md:text-xl lg:text-2xl text-balance leading-[1.2]">
                    {card.text}
                  </span>
                  {imageUrl && (
                    <div className="relative w-[68px] xl:w-48 h-[68px] xl:h-48 shrink-0">
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
