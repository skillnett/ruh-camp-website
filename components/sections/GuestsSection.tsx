import { GuestCard, TitleH2 } from "@/components/ui";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function GuestsSection({ section, id }: SectionProps) {
  const title = (section?.title as string) || "";
  const guests: Array<{
    name: string;
    role: string;
    image?: unknown;
    networkLink?: string;
    linkText?: string;
  }> = [];

  if (section.guests && Array.isArray(section.guests)) {
    section.guests.forEach((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      if (itemData.name && itemData.role) {
        guests.push({
          name: itemData.name as string,
          role: itemData.role as string,
          image: itemData.image,
          networkLink: itemData.networkLink as string,
          linkText: itemData.linkText as string | undefined,
        });
      }
    });
  }

  return (
    <section
      id={id}
      className="section-bg-5 pt-16 lg:pt-32 pb-96 md:pb-64 lg:pb-76 h-fit"
    >
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-24 mx-auto px-4 container">
        {title && (
          <TitleH2
            className="2xl:text-[88px] xl:text-[56px] xl:leading-[96px]"
            color={section.titleColor as string}
          >
            {title}
          </TitleH2>
        )}
        {guests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-7 2xl:gap-40 xl:gap-16">
            {guests.map((guest, index) => (
              <GuestCard
                key={index}
                name={guest.name}
                role={guest.role}
                image={guest.image}
                networkLink={guest.networkLink}
                linkText={guest.linkText}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
