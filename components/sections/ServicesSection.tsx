"use client";

import {
  ContactForm,
  ModalWrapper,
  ServiceCard,
  TitleH2,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function ServicesSection({ section, id }: SectionProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const router = useRouter();

  const createFirstButtonClickHandler = (
    title?: string,
    subtitle?: string,
    variant?: string,
  ) => {
    return () => {
      if (!title) return;
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      const subtitleParam = subtitle
        ? `&season=${encodeURIComponent(subtitle)}`
        : "";
      router.push(`/details/${slug}?v=${variant}${subtitleParam}`);
    };
  };
  const serviceCards: Array<{
    variant: string;
    title?: string;
    subtitle?: string;
    content?: Array<{ item: string }>;
    firstButtonText?: string;
    firstButtonLink?: string;
    secondButtonText?: string;
    disabled?: boolean;
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
        disabled: Boolean(itemData.disabled),
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
    <section id={id} className="bg-black py-16 lg:py-20">
      <div className="flex lg:flex-row flex-col justify-between gap-6 mx-auto px-4 container">
        <div className="flex justify-center items-center order-1 lg:order-2 mb-8 md:mb-12 lg:mb-0 lg:max-w-1/3">
          {(section?.title as string) && (
            <TitleH2
              className="text-[clamp(1.875rem,3vw+0.5rem,4.5rem)]"
              color={section.titleColor as string}
            >
              {(section?.number as string) && (
                <span className="block 2xl:text-[288px] xl:text-[188px] text-[288px]  lg:text-8xl leading-[0.8] xl:leading-44">
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
                onFirstButtonClick={createFirstButtonClickHandler(
                  card.title,
                  card.subtitle,
                  card.variant,
                )}
                secondButtonText={card.secondButtonText}
                onSecondButtonClick={() => setIsContactFormOpen(true)}
                disabled={card.disabled}
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
                onFirstButtonClick={createFirstButtonClickHandler(
                  card.title,
                  card.subtitle,
                  card.variant,
                )}
                secondButtonText={card.secondButtonText}
                onSecondButtonClick={() => setIsContactFormOpen(true)}
                disabled={card.disabled}
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
              onFirstButtonClick={createFirstButtonClickHandler(
                card.title,
                card.subtitle,
                card.variant,
              )}
              secondButtonText={card.secondButtonText}
              onSecondButtonClick={() => setIsContactFormOpen(true)}
              disabled={card.disabled}
            />
          ))}
        </div>
      </div>
      <ModalWrapper
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Записатись"
      >
        <ContactForm />
      </ModalWrapper>
    </section>
  );
}
