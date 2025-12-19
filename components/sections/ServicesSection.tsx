import { TitleH2 } from "../ui";
import { ServiceCard } from "../ui/ServiceCard";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function ServicesSection({ section, id }: SectionProps) {
  const serviceCards: Array<{
    variant: string;
    title?: string;
    subtitle?: string;
    content?: Array<{ item: string }>;
    firstButtonText?: string;
    firstButtonLink?: string;
    secondButtonText?: string;
    secondButtonLink?: string;
  }> = [];

  if (section.serviceCards && Array.isArray(section.serviceCards)) {
    section.serviceCards.forEach((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      serviceCards.push({
        variant: (itemData.variant as string) || "green",
        title: itemData.title as string | undefined,
        subtitle: itemData.subtitle as string | undefined,
        content: itemData.content as Array<{ item: string }> | undefined,
        firstButtonText: itemData.firstButtonText as string | undefined,
        firstButtonLink: itemData.firstButtonLink as string | undefined,
        secondButtonText: itemData.secondButtonText as string | undefined,
        secondButtonLink: itemData.secondButtonLink as string | undefined,
      });
    });
  }

  const variantOrder: Record<string, number> = {
    green: 1,
    yellow: 2,
    orange: 3,
    blue: 4,
  };

  const sortedCardsForMobile = [...serviceCards].sort((a, b) => {
    const orderA = variantOrder[a.variant] || 999;
    const orderB = variantOrder[b.variant] || 999;
    return orderA - orderB;
  });

  const leftCards = serviceCards.slice(0, 2);
  const rightCards = serviceCards.slice(2, 4);

  return (
    <section id={id} className="bg-black py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="flex lg:flex-row flex-col justify-between gap-6 lg:gap-6 mx-auto px-4 container">
        <div className="flex justify-center items-center order-1 lg:order-2 mb-8 md:mb-12 lg:mb-0 lg:max-w-1/3">
          {(section?.title as string) && (
            <TitleH2 className="text-4xl xl:text-5xl 2xl:text-7xl text-center">
              {(section?.number as string) && (
                <span className="block xl:text-[188px] 2xl:text-[288px] text-6xl sm:text-7xl md:text-8xl leading-tight lg:leading-20 xl:leading-44">
                  {section.number as string}
                </span>
              )}
              {(section?.title as string) || ""}
            </TitleH2>
          )}
        </div>
        <div className="flex lg:flex flex-col lg:flex-col gap-10 sm:gap-8 md:gap-12 lg:gap-24 order-2 lg:order-1 md:grid md:grid-cols-2">
          {sortedCardsForMobile.map((card, index) => (
            <div key={index} className="lg:hidden">
              <ServiceCard
                variant={card.variant}
                title={card.title}
                subtitle={card.subtitle}
                content={card.content}
                firstButtonText={card.firstButtonText}
                firstButtonLink={card.firstButtonLink}
                secondButtonText={card.secondButtonText}
                secondButtonLink={card.secondButtonLink}
              />
            </div>
          ))}
          {leftCards.map((card, index) => (
            <div key={`desktop-${index}`} className="hidden lg:block">
              <ServiceCard
                variant={card.variant}
                title={card.title}
                subtitle={card.subtitle}
                content={card.content}
                firstButtonText={card.firstButtonText}
                firstButtonLink={card.firstButtonLink}
                secondButtonText={card.secondButtonText}
                secondButtonLink={card.secondButtonLink}
              />
            </div>
          ))}
        </div>
        <div className="hidden lg:flex flex-col items-end gap-24 order-3">
          {rightCards.map((card, index) => (
            <ServiceCard
              key={index}
              variant={card.variant}
              title={card.title}
              subtitle={card.subtitle}
              content={card.content}
              firstButtonText={card.firstButtonText}
              firstButtonLink={card.firstButtonLink}
              secondButtonText={card.secondButtonText}
              secondButtonLink={card.secondButtonLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
