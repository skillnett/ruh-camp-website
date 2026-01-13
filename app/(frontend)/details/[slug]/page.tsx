"use client";

import { Logo } from "@/assets/icons";
import { Button, ContactForm, ModalWrapper, PacketCard } from "@/components/ui";
import { notFound } from "next/navigation";
import { use, useState } from "react";

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

export default function PackagePage({
  params,
  searchParams,
}: PackagePageProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const { slug } = use(params);
  const { v: variant } = use(searchParams);

  let color: ColorKey | null = (variant as ColorKey) || null;

  if (!color || !colorTheme[color]) {
    const normalizedSlug = slug.toLowerCase().replace(/-/g, "");
    color = (packageToColor[normalizedSlug] as ColorKey) || null;
  }

  if (!color || !colorTheme[color]) {
    notFound();
  }

  const theme = colorTheme[color];

  const renderComponent = (component: string) => {
    switch (component) {
      case "program-button":
        return (
          <Button
            variant="custom"
            size="custom"
            className={`${theme.text} text-[clamp(14px,1.5vw+0.5rem,1.5rem)] rounded-full p-4 xl:p-7 bg-black  leading-[0.8] xl:leading-[0.7] whitespace-nowrap h-[clamp(48px,2vw+24px,56px)] flex items-center justify-center`}
            href="/"
          >
            ПРОГРАМА ТАБОРУ
          </Button>
        );
      case "about-button":
        return (
          <Button
            variant="custom"
            size="custom"
            className={`text-black bg-white px-8 lg:px-12  py-4 lg:py-5 text-[clamp(20px,2vw+0.5rem,2.25rem)] whitespace-nowrap rounded-full leading-[0.8] h-[clamp(48px,2vw+24px,56px)] flex items-center justify-center`}
            href="/"
          >
            ПРО ТАБІР
          </Button>
        );
      case "video-section":
        return (
          <div className="w-full sm:max-w-[clamp(280px,50vw+50px,510px)] flex flex-col gap-[clamp(3.5rem,8vw+1rem,3.5rem)] items-end ">
            <div className="bg-black text-white px-[clamp(1.5rem,3vw+0.5rem,3rem)] py-[clamp(1rem,2vw+0.25rem,1rem)] rounded-[30px] text-[clamp(1.5rem,4vw+0.5rem,2.6875rem)] border border-white text-center w-full h-[clamp(180px,30vw+50px,292px)] flex items-center justify-center">
              ВІДЕО АНОНС
            </div>
          </div>
        );
      case "photo-section":
        return (
          <div className="w-full sm:max-w-[clamp(280px,50vw+50px,510px)] flex flex-col gap-[clamp(3.5rem,8vw+1rem,3.5rem)] items-end ">
            <div className="bg-black text-white px-[clamp(1.5rem,3vw+0.5rem,3rem)] py-[clamp(1rem,2vw+0.25rem,1rem)] rounded-[30px] text-[clamp(1.5rem,4vw+0.5rem,2.6875rem)] border border-white text-center w-full h-[clamp(180px,30vw+50px,292px)] flex items-center justify-center">
              ФОТО АНОНС
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme.gradient}`}>
      <div className="mx-auto px-4 py-16 lg:py-20 container">
        <div className="flex flex-col xl:flex-row xl:justify-between justify-center items-center lg:mb-8 mb-[20px] ">
          <div className="items-center gap-4 hidden xl:flex">
            {renderComponent("about-button")}
          </div>
          <h1 className="flex items-center xl:gap-5 lg:gap-4 gap-2 text-black text-[clamp(26px,3vw+1rem,5rem)] font-bold font-benzin leading-[0.8] ">
            STEP
            <div className="pt-2 pb-3 px-[clamp(4px,2vw+0.5rem,1.75rem)] bg-black xl:rounded-[28px] rounded-[20px] flex items-center justify-center">
              <Logo
                showSubtitle={false}
                className="w-[clamp(76px,2vw+4rem,6.5rem)] h-[clamp(32px,2vw+16px,48px)]"
                accentClassName={theme.text}
              />
            </div>
            CAMP
          </h1>
          <div className="items-center gap-4 hidden xl:flex">
            {renderComponent("program-button")}
          </div>
        </div>
        <h2 className="text-[clamp(1.5rem,2vw+0.5rem,2.8125rem)] font-bold mx-auto text-center xl:mb-8 mb-[16px] font-benzin leading-[0.97]">
          {theme.seasonName} ТАБІР
        </h2>
        <div className="text-white text-[clamp(1.125rem,2vw+0.5rem,2.625rem)] mx-auto text-center w-fit bg-black rounded-[20px] px-[18px] pt-[18px] pb-[10px] font-benzin leading-[0.97] xl:mb-[104px] mb-[18px]">
          14.03 — 21.03
        </div>
        <div className="items-center  flex xl:hidden justify-center gap-2 md:gap-[200px] mb-[30px]">
          {renderComponent("about-button")}
          {renderComponent("program-button")}
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between items-center gap-10 lg:gap-4 mb-20">
          <PacketCard
            title="ПАКЕТ SILVER"
            variant="silver"
            list={[
              "проживання у сучасному спортивному комплексі у Винниках ",
              "трьох разове збалансоване харчування + перекуси заняття спортом + басейн ",
              "нтерактивні лекції та знайомства від блогерів та профі у своїх сферах ",
              "Сертифікат про проходження",
            ]}
            price={12000}
            buttonText="ЗАБРОНЮВАТИ"
            onButtonClick={() => setIsContactFormOpen(true)}
          />
          <PacketCard
            title="ПАКЕТ GOLD"
            variant="gold"
            list={[
              "Проживання в комфортабельних кімнатах",
              "Повне харчування (3 рази на день)",
              "Навчальні матеріали",
              "Сертифікат про проходження",
              "Індивідуальні консультації",
              "Додаткові матеріали",
            ]}
            price={15000}
            buttonText="ЗАБРОНЮВАТИ"
            onButtonClick={() => setIsContactFormOpen(true)}
          />
        </div>

        <div className="flex justify-between  2xl:gap-52 xl:gap-20 gap-10 xl:mb-4 mb-[116px]">
          <div className="w-full text-black xl:max-w-[932px]  flex flex-col 2xl:gap-8 gap-4 text-[clamp(1rem,1.5vw+0.5rem,1.875rem)] leading-[1.2]">
            <div className="w-fit  bg-black text-white text-[clamp(1rem,2vw+0.5rem,2.25rem)] font-benzin  uppercase  px-[clamp(2rem,2vw+1rem,3.25rem)] pb-6 pt-8 leading-[0.5] rounded-full ">
              УМОВИ БРОНЮВАННЯ
            </div>
            <p className="text-balance">
              У формі ви (представник дитини) залишаєте імʼя та актуальний номер
              вашого телефону (з наявними месенджерами Telegram/Viber/WhatsApp)
            </p>
            <p>
              Після цього менеджер табору сконтактує з вами впродовж найближчих
              12 годин.
            </p>
            <p>Окрім пакету, ви також можете придбати ОКРЕМІ ПОСЛУГИ:</p>
            <ul className="font-bold list-disc pl-4">
              <li>Індивідуальна фотосесія — 2000 грн</li>
              <li>Ролик про дитину — 2500 грн</li>
              <li>Step-camp-box (бокс з мерчем) — 1500 грн</li>
            </ul>
          </div>
          <div className="w-full max-w-[510px] hidden xl:flex flex-col gap-14 items-end ">
            {renderComponent("video-section")}
            {renderComponent("photo-section")}
          </div>
        </div>
        <div className="flex lg:gap-4 gap-5 flex-col mb-20">
          <h4 className="text-[clamp(20px,2vw+0.5rem,2.125rem)] font-benzin uppercase  text-black">
            Маєш запитання? Телефонуй!
          </h4>
          <div className="flex 2xl:gap-28 gap-6 text-black text-[clamp(18px,1.5vw+0.5rem,1.625rem)] leading-[0.8] whitespace-nowrap">
            <div className="flex flex-col gap-2 ">
              <span className=" font-bold">+380964908010</span>
              <span className="text-[clamp(16px,1.5vw+0.5rem,1.375rem)]">
                Менеджер Ірина
              </span>
            </div>
            <div className="flex flex-col  gap-2">
              <span className=" font-bold">+380964908010</span>
              <span className="text-[clamp(16px,1.5vw+0.5rem,1.375rem)]">
                Менеджер Христина
              </span>
            </div>
          </div>
        </div>
        <div className="w-full  flex justify-center items-center xl:hidden flex-col gap-14  mb-[60px]">
          {renderComponent("video-section")}
          {renderComponent("photo-section")}
        </div>
        <div className="flex justify-center w-full">
          <Button
            variant="custom"
            size="custom"
            className="w-fit max-w-[clamp(600px,50vw+100px,1000px)] bg-black text-white text-[clamp(20px,3vw+0.5rem,4.125rem)] text-balance font-benzin uppercase border border-white rounded-[36px] px-12 py-4"
            onClick={() => setIsContactFormOpen(true)}
          >
            ЗАРЕЄСТРУВАТИ ДИТИНУ
          </Button>
        </div>
      </div>
      <ModalWrapper
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Записатись"
      >
        <ContactForm />
      </ModalWrapper>
    </div>
  );
}
