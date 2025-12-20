import { TitleH2 } from "@/components/ui";
import { getMediaUrl } from "@/lib/payload";
import { applyHighlights, parseHighlightedText } from "@/lib/utils";
import Image from "next/image";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function AboutMentorSection({ section, id }: SectionProps) {
  const title = (section?.title as string) || "";
  const titleHighlight = (section?.titleHighlight as string) || "";
  const description = (section?.description as string) || "";
  const descriptionHighlights =
    (section?.descriptionHighlights as string) || "";
  const highlightText = (section?.highlightText as string) || "";
  const highlightTextHighlights =
    (section?.highlightTextHighlights as string) || "";
  const imageUrl =
    (section?.image && (getMediaUrl(section.image) as string)) || "";
  const titleParts = title.split(titleHighlight);
  const hasHighlight = titleHighlight && titleParts.length > 1;

  const highlightedDescription = applyHighlights(
    description,
    descriptionHighlights
  );
  const highlightedText = applyHighlights(
    highlightText,
    highlightTextHighlights
  );

  return (
    <section
      id={id}
      className="section-bg-4 py-8 sm:py-12 md:py-16 lg:py-24 h-fit"
    >
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mx-auto px-4 container">
        <TitleH2 className="text-black xl:text-[80px] text-3xl lg:text-5xl text-left text-balance">
          {hasHighlight ? (
            <>
              {titleParts[0]}
              <span className="text-white">{titleHighlight}</span>
              {titleParts[1]}
            </>
          ) : (
            title
          )}
        </TitleH2>
        <div className="justify-between items-center gap-6 md:gap-12 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-10 lg:gap-28 text-black text-balance">
            {highlightedDescription && (
              <span className="text-base lg:text-2xl">
                {parseHighlightedText(highlightedDescription)}
              </span>
            )}
            {highlightText && (
              <span className="text-2xl lg:text-4xl leading-12">
                {parseHighlightedText(highlightedText)}
              </span>
            )}
          </div>
          {imageUrl && (
            <div className="relative rounded-bl-[80px] lg:rounded-bl-[150px] w-full h-full min-h-[400px] lg:min-h-[700px] overflow-hidden">
              <Image
                src={imageUrl as string}
                alt={title || ""}
                fill
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
