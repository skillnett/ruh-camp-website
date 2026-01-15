import { InformationCard, TitleH2 } from "@/components/ui";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

function getItemsFromCard(card: Record<string, unknown> | undefined): string[] {
  const items: string[] = [];
  if (card?.items && Array.isArray(card.items)) {
    card.items.forEach((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      if (itemData.item) {
        items.push(itemData.item as string);
      }
    });
  }
  return items;
}

export function InformationCampSection({ section, id }: SectionProps) {
  const sportsCard = section.sportsCard as Record<string, unknown> | undefined;
  const skillsCard = section.skillsCard as Record<string, unknown> | undefined;

  const sportsItems = getItemsFromCard(sportsCard);
  const skillsItems = getItemsFromCard(skillsCard);

  return (
    <section id={id} className="section-bg-3 py-16 lg:py-24 h-fit">
      <div className="mx-auto px-4 text-left md:text-center container">
        {(section?.title as string) && (
          <TitleH2
            className="mb-5 lg:mb-12 text-accent xl:text-[86px] text-balance text-left md:text-center"
            color={section.titleColor as string}
          >
            {(section.title as string) || ""}
          </TitleH2>
        )}
        {(section?.description as string) && (
          <span className="block mb-5 lg:mb-11 text-xl lg:text-2xl text-balance text-white dark:text-white">
            {section.description as string}
          </span>
        )}
        {(section?.subtitle as string) && (
          <h4 className="mb-12 font-bold text-accent text-xl lg:text-2xl">
            {section.subtitle as string}
          </h4>
        )}
        <div className="flex sm:flex-row flex-col justify-center gap-6 lg:gap-20 2xl:gap-72">
          {sportsCard && (sportsCard.title as string) && (
            <InformationCard
              titlePrefix="STEP"
              title={sportsCard.title as string}
              items={sportsItems}
              defaultImage="/images/ball.webp"
            />
          )}
          {skillsCard && (skillsCard.title as string) && (
            <InformationCard
              titlePrefix="STEP"
              title={skillsCard.title as string}
              items={skillsItems}
              defaultImage="/images/settings.webp"
            />
          )}
        </div>
      </div>
    </section>
  );
}
