"use client";

import { Logo } from "@/assets/icons";
import { Button, ContactForm, ModalWrapper, PacketCard } from "@/components/ui";
import { getMediaUrl } from "@/lib/payload";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface DetailsPageClientProps {
  theme: {
    gradient: string;
    text: string;
    border: string;
    bg: string;
    seasonName: string;
  };
  season?: string;
  details: {
    dateRange?: string | null;
    buttons?: {
      aboutButtonText?: string | null;
      programButtonText?: string | null;
      registerButtonText?: string | null;
    } | null;
    announcements?: {
      photoAnnouncement?: Array<{ photo?: unknown }> | null;
      videoAnnouncement?: unknown;
      youtubeVideoUrl?: string | null;
    } | null;
    content?: {
      bookingConditionsTitle?: string | null;
      bookingConditionsParagraphs?: Array<{
        text: string;
      }> | null;
      additionalServicesTitle?: string | null;
      additionalServices?: Array<{
        serviceName: string;
        servicePrice: number;
      }> | null;
      contactTitle?: string | null;
      managers?: Array<{
        name: string;
        phone: string;
      }> | null;
    } | null;
    packages?: {
      silverPackage?: {
        title?: string | null;
        price?: number | null;
        buttonText?: string | null;
        features?: Array<{ feature: string; isBold?: boolean }> | null;
      } | null;
      goldPackage?: {
        title?: string | null;
        price?: number | null;
        buttonText?: string | null;
        features?: Array<{ feature: string; isBold?: boolean }> | null;
      } | null;
    } | null;
  } | null;
}

export function DetailsPageClient({
  theme,
  season,
  details,
}: DetailsPageClientProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const renderComponent = (component: string) => {
    switch (component) {
      case "program-button":
        if (!details?.buttons?.programButtonText) return null;
        return (
          <Button
            variant="custom"
            size="custom"
            className={`${theme.text} text-[clamp(14px,1.5vw+0.5rem,1.5rem)] rounded-full p-4 xl:p-7 bg-black  leading-[0.8] xl:leading-[0.7] whitespace-nowrap h-[clamp(48px,2vw+24px,56px)] flex items-center justify-center`}
            href="/"
          >
            {details.buttons.programButtonText}
          </Button>
        );
      case "about-button":
        if (!details?.buttons?.aboutButtonText) return null;
        return (
          <Button
            variant="custom"
            size="custom"
            className={`text-black bg-white px-8 lg:px-12  py-4 lg:py-5 text-[clamp(20px,2vw+0.5rem,2.25rem)] whitespace-nowrap rounded-full leading-[0.8] h-[clamp(48px,2vw+24px,56px)] flex items-center justify-center`}
            href="/"
          >
            {details.buttons.aboutButtonText}
          </Button>
        );
      case "video-section":
        const videoUrl = details?.announcements?.videoAnnouncement
          ? getMediaUrl(details.announcements.videoAnnouncement)
          : null;
        const youtubeUrl = details?.announcements?.youtubeVideoUrl || null;

        // Extract YouTube video ID from various URL formats
        const getYouTubeVideoId = (url: string | null): string | null => {
          if (!url) return null;
          const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/,
          ];
          for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
          }
          return null;
        };

        const youtubeVideoId = youtubeUrl
          ? getYouTubeVideoId(youtubeUrl)
          : null;
        const embedUrl = youtubeVideoId
          ? `https://www.youtube.com/embed/${youtubeVideoId}`
          : null;

        return (
          <div className="w-full sm:max-w-[clamp(280px,50vw+50px,510px)] flex flex-col gap-[clamp(3.5rem,8vw+1rem,3.5rem)] items-center 2xl:items-end ">
            <div className="bg-black text-white rounded-[30px] border border-white text-center w-full sm:w-[430px] flex items-center justify-center overflow-hidden aspect-[9/16]">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-cover"
                >
                  Ваш браузер не підтримує відео.
                </video>
              ) : (
                "ВІДЕО АНОНС"
              )}
            </div>
          </div>
        );
      case "photo-section":
        const photos = details?.announcements?.photoAnnouncement || [];
        const photoUrls = photos
          .map((item) => (item?.photo ? getMediaUrl(item.photo) : null))
          .filter((url): url is string => url !== null);

        if (photoUrls.length === 0) {
          return (
            <div className="w-full sm:max-w-[clamp(280px,50vw+50px,510px)] flex flex-col gap-[clamp(3.5rem,8vw+1rem,3.5rem)] items-center 2xl:items-end">
              <div className="bg-black text-white px-[clamp(1.5rem,3vw+0.5rem,3rem)] py-[clamp(1rem,2vw+0.25rem,1rem)] rounded-[30px] text-[clamp(1.5rem,4vw+0.5rem,2.6875rem)] border border-white text-center w-full h-[clamp(180px,30vw+50px,292px)] flex items-center justify-center">
                ФОТО АНОНС
              </div>
            </div>
          );
        }

        return (
          <div className="w-full flex flex-col gap-[clamp(3.5rem,8vw+1rem,3.5rem)] items-center 2xl:items-end">
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination, FreeMode]}
                spaceBetween={16}
                slidesPerView={1.5}
                freeMode={true}
                loop={photoUrls.length > 1}
                navigation={{
                  enabled: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    navigation: {
                      enabled: true,
                    },
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                    navigation: {
                      enabled: true,
                    },
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                    navigation: {
                      enabled: true,
                    },
                  },
                }}
                className="w-full photo-swiper"
              >
                {photoUrls.map((photoUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-black rounded-[30px] border border-white overflow-hidden">
                      <div className="relative w-full aspect-4/3">
                        <Image
                          src={photoUrl}
                          alt={`Фото анонс ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const silverFeatures =
    details?.packages?.silverPackage?.features
      ?.filter((f) => f && f.feature)
      .map((f) => ({
        item: f.feature,
        isBold: f.isBold || false,
      })) || [];
  const goldFeatures =
    details?.packages?.goldPackage?.features
      ?.filter((f) => f && f.feature)
      .map((f) => ({
        item: f.feature,
        isBold: f.isBold || false,
      })) || [];

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
        {details?.dateRange && (
          <div className="text-white text-[clamp(1.125rem,2vw+0.5rem,2.625rem)] mx-auto text-center w-fit bg-black rounded-[20px] px-[18px] pt-[18px] pb-[10px] font-benzin leading-[0.97] xl:mb-[104px] mb-[18px]">
            {details.dateRange}
          </div>
        )}
        <div className="items-center  flex xl:hidden justify-center gap-2 md:gap-[200px] mb-[30px]">
          {renderComponent("about-button")}
          {renderComponent("program-button")}
        </div>
        {details?.packages &&
          ((details.packages.silverPackage?.price !== undefined &&
            details.packages.silverPackage?.price !== null) ||
            (details.packages.goldPackage?.price !== undefined &&
              details.packages.goldPackage?.price !== null)) && (
            <div className="flex flex-col xl:flex-row xl:justify-between items-start  gap-10 lg:gap-4 mb-20">
              {details.packages.silverPackage?.price !== undefined &&
                details.packages.silverPackage?.price !== null && (
                  <PacketCard
                    title={details?.packages?.silverPackage?.title || "ПАКЕТ"}
                    variant="silver"
                    list={silverFeatures}
                    price={details.packages.silverPackage.price}
                    buttonText={
                      details.packages.silverPackage.buttonText || "ЗАБРОНЮВАТИ"
                    }
                    onButtonClick={() => setIsContactFormOpen(true)}
                  />
                )}
              {details.packages.goldPackage?.price !== undefined &&
                details.packages.goldPackage?.price !== null && (
                  <PacketCard
                    title={details.packages.goldPackage.title || "ПАКЕТ GOLD"}
                    variant="gold"
                    list={goldFeatures}
                    price={details.packages.goldPackage.price}
                    buttonText={
                      details.packages.goldPackage.buttonText || "ЗАБРОНЮВАТИ"
                    }
                    onButtonClick={() => setIsContactFormOpen(true)}
                  />
                )}
            </div>
          )}

        {(details?.content?.bookingConditionsTitle ||
          (details?.content?.bookingConditionsParagraphs &&
            details.content.bookingConditionsParagraphs.length > 0) ||
          details?.content?.additionalServicesTitle ||
          (details?.content?.additionalServices &&
            details.content.additionalServices.length > 0)) && (
          <div className="flex justify-between  2xl:gap-52 xl:gap-20 gap-10 xl:mb-20 mb-[56px]">
            <div className="w-full text-black xl:max-w-[932px]  flex flex-col 2xl:gap-20 lg:gap-18 gap-10 text-[clamp(1rem,1.5vw+0.5rem,1.875rem)] leading-[1.2]">
              <div className="w-full">
                {details?.content?.additionalServicesTitle && (
                  <div className="w-fit  bg-black text-white text-[clamp(1rem,2vw+0.5rem,2.25rem)] font-benzin  uppercase  px-[clamp(2rem,2vw+1rem,3.25rem)] pb-6 pt-8 leading-[0.5] rounded-full mb-5 ">
                    {details.content.additionalServicesTitle}
                  </div>
                )}
                {details?.content?.additionalServices &&
                  details.content.additionalServices.length > 0 && (
                    <ul className="font-bold list-disc pl-6 md:pl-12 space-y-2">
                      {details.content.additionalServices.map(
                        (service, index) => (
                          <li key={index}>
                            {service.serviceName}
                            {service.servicePrice !== undefined &&
                              service.servicePrice !== null &&
                              ` — ${service.servicePrice} грн`}
                          </li>
                        ),
                      )}
                    </ul>
                  )}
              </div>
              <div className="w-full  flex justify-center items-center xl:hidden flex-col gap-14  mb-2 lg:mb-[60px]">
                {renderComponent("video-section")}
                {renderComponent("photo-section")}
              </div>
              <div className="w-full ">
                {details?.content?.bookingConditionsTitle && (
                  <div className="w-fit  bg-black text-white text-[clamp(1rem,2vw+0.5rem,2.25rem)] font-benzin  uppercase  px-[clamp(2rem,2vw+1rem,3.25rem)] pb-6 pt-8 leading-[0.5] rounded-full mb-4">
                    {details.content.bookingConditionsTitle}
                  </div>
                )}
                <div className="md:pl-8 pl-3 flex flex-col gap-5">
                  {details?.content?.bookingConditionsParagraphs &&
                    details.content.bookingConditionsParagraphs.length > 0 &&
                    details.content.bookingConditionsParagraphs
                      .filter((paragraph) => paragraph && paragraph.text)
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className={index === 0 ? "text-balance" : ""}
                        >
                          {paragraph.text}
                        </p>
                      ))}
                </div>
              </div>
            </div>
            <div className="w-full max-w-[430px] hidden xl:flex flex-col gap-14 items-center 2xl:items-end ">
              {renderComponent("video-section")}
            </div>
          </div>
        )}
        <div className="hidden justify-center w-full mb-20 xl:flex">
          {renderComponent("photo-section")}
        </div>
        {details?.content?.managers &&
          Array.isArray(details.content.managers) &&
          details.content.managers.length > 0 &&
          details.content.managers.some(
            (manager) => manager && manager.name && manager.phone,
          ) && (
            <div className="flex lg:gap-4 gap-5 flex-col mb-10 lg:mb-20 bg-white lg:p-10 p-5 rounded-4xl">
              <h4 className="text-[clamp(20px,2vw+0.5rem,2.125rem)] font-benzin uppercase  text-black">
                {details?.content?.contactTitle || "Маєш запитання? Телефонуй!"}
              </h4>
              <div className="flex 2xl:gap-28 gap-6 text-black text-[clamp(18px,1.5vw+0.5rem,1.625rem)] leading-[0.8] whitespace-nowrap">
                {details.content.managers
                  .filter((manager) => manager && manager.name && manager.phone)
                  .map((manager, index) => (
                    <div key={index} className="flex flex-col gap-2 ">
                      <span className=" font-bold">{manager.phone}</span>
                      <span className="text-[clamp(16px,1.5vw+0.5rem,1.375rem)]">
                        Менеджер {manager.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {details?.buttons?.registerButtonText && (
          <div className="flex justify-center w-full">
            <Button
              variant="custom"
              size="custom"
              className="w-fit max-w-[clamp(600px,50vw+100px,1000px)] bg-black text-white text-[clamp(20px,3vw+0.5rem,4.125rem)] text-balance font-benzin uppercase border border-white rounded-[36px] px-12 py-4"
              onClick={() => setIsContactFormOpen(true)}
            >
              {details.buttons.registerButtonText}
            </Button>
          </div>
        )}
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
