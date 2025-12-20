import { TitleH2 } from "@/components/ui";
import { getMediaUrl } from "@/lib/payload";
import Image from "next/image";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function AdvantagesSection({ section, id }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

  return (
    <section
      id={id}
      className="section-bg-2 py-8 sm:py-12 md:py-16 lg:py-24 h-fit"
    >
      <div
        className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-24 mx-auto px-4 container"
        id="advantages"
      >
        {(section?.title as string) && (
          <TitleH2 className="text-black 2xl:text-[128px] xl:text-[86px] text-3xl lg:text-5xl text-balance">
            {(section.title as string) || ""}
          </TitleH2>
        )}
        {imageUrl && (
          <div className="">
            <div className="relative w-full">
              <Image
                src={imageUrl}
                alt={(section.title as string) || "WOW-фішки"}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
