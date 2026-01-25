import {
  InstagramIcon,
  PhoneIcon,
  TelegramIcon,
  TikTokIcon,
} from "@/assets/icons";
import { getFooter } from "@/lib/getFooter";
import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";

export const metadata: Metadata = {
  title: "Дякуємо за заявку",
  description: "Ваша заявка прийнята. Ми зв'яжемося з вами протягом 3 днів.",
};

function resolveTelegramHref(value: string): string {
  return value.startsWith("http")
    ? value
    : `https://t.me/${value.replace("@", "")}`;
}

function resolveInstagramHref(value: string): string {
  return value.startsWith("http")
    ? value
    : `https://instagram.com/${value.replace("@", "")}`;
}

function resolveTiktokHref(value: string): string {
  return value.startsWith("http")
    ? value
    : `https://tiktok.com/@${value.replace("@", "")}`;
}

export default async function ThankYouPage() {
  const footerData = await getFooter();
  const contact = footerData?.contactInfo;

  const phones = [contact?.phone, contact?.phone2].filter((p): p is string =>
    Boolean(p && String(p).trim()),
  );

  const socials: {
    label: string;
    href: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [];
  if (contact?.telegram) {
    socials.push({
      label: "Telegram",
      href: resolveTelegramHref(contact.telegram),
      Icon: TelegramIcon,
    });
  }
  if (contact?.instagram) {
    socials.push({
      label: "Instagram",
      href: resolveInstagramHref(contact.instagram),
      Icon: InstagramIcon,
    });
  }
  if (contact?.tiktok) {
    socials.push({
      label: "TikTok",
      href: resolveTiktokHref(contact.tiktok),
      Icon: TikTokIcon,
    });
  }

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 lg:py-24 section-bg-3">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="font-benzin font-bold text-white text-2xl md:text-3xl lg:text-4xl mb-6 lg:mb-8">
            Дякуємо за вашу заявку
          </h1>
          <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10">
            Протягом 3-х днів з вами зв&apos;яжуться наші менеджери з
            підтвердженням.
          </p>
          <p className="text-white/80 text-base lg:text-lg mb-6">
            У разі питань:
          </p>
          {phones.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10 lg:mb-12">
              {phones.map((phone) => (
                <Link
                  key={phone}
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-white hover:text-accent transition-colors text-lg lg:text-xl"
                >
                  <PhoneIcon className="w-5 h-5 shrink-0" />
                  <span>{phone}</span>
                </Link>
              ))}
            </div>
          )}
          {socials.length > 0 && (
            <div className="flex items-center justify-center gap-6 lg:gap-10">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-10 h-10 lg:w-12 lg:h-12" />
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/"
            className="inline-block mt-12 px-8 py-4 rounded-full bg-accent text-black font-medium hover:opacity-90 transition-opacity"
          >
            На головну
          </Link>
        </div>
      </section>
    </>
  );
}
