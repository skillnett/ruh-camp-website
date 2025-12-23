"use client";

import { Button, ContactForm, ModalWrapper } from "@/components/ui";
import { scrollToSection } from "@/lib/utils";
import heroImage from "@/public/images/hero.webp";
import Image from "next/image";
import { useState } from "react";

interface HeroSectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function HeroSection({ section, id }: HeroSectionProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const buttonText =
    typeof section.buttonText === "string" ? section.buttonText : null;
  const buttonLink =
    typeof section.buttonLink === "string" ? section.buttonLink : null;
  const buttonAnchor =
    typeof section.buttonAnchor === "string" ? section.buttonAnchor : null;
  const button2Text =
    typeof section.button2Text === "string" ? section.button2Text : null;
  const titleColor =
    typeof section.titleColor === "string" && section.titleColor
      ? section.titleColor
      : undefined;

  const handleButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    link: string | null,
    anchor: string | null,
  ) => {
    if (anchor) {
      e.preventDefault();
      const sectionId = anchor.startsWith("#") ? anchor.slice(1) : anchor;
      scrollToSection(sectionId);
    }
  };

  const getButtonHref = (link: string | null, anchor: string | null) => {
    if (link) return link;
    if (anchor) return `#${anchor}`;
    return undefined;
  };

  return (
    <section
      id={id}
      className="relative flex justify-center items-center w-full"
    >
      <div className="z-0 absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt={(section.title as string) || ""}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      <div className="z-10 relative gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 mx-auto px-4 pt-54 md:pt-76 pb-24 container">
        <div className="flex flex-col justify-end items-center h-full">
          <h1
            className="mb-1 md:mb-4 font-benzin font-bold text-3xl lg:text-4xl xl:text-6xl text-center"
            style={titleColor ? { color: titleColor } : { color: "#ffffff" }}
          >
            {(section.title as string) || ""}
          </h1>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex flex-col items-center lg:items-stretch md:max-w-145">
            <span className="mb-5 md:mb-10 lg:mb-16 font-extrabold text-black text-xl md:text-3xl lg:text-5xl md:text-left text-center lg:leading-14 leading">
              {(section?.subtitle as string) || ""}
            </span>
            {buttonText && (
              <Button
                variant="secondary"
                size="sm"
                href={getButtonHref(buttonLink, buttonAnchor)}
                onClick={(e) => handleButtonClick(e, buttonLink, buttonAnchor)}
              >
                {buttonText}
              </Button>
            )}
            {button2Text && (
              <div className="flex flex-col items-center lg:items-end mt-7 lg:mt-20">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  {button2Text}
                </Button>
              </div>
            )}
          </div>
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
