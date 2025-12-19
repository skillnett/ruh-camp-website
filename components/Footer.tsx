import {
  EmailIcon,
  InstagramIcon,
  Logo,
  PhoneIcon,
  TelegramIcon,
} from "@/assets/icons";
import { getFooter } from "@/lib/payload";
import Link from "next/link";

export async function Footer() {
  const footerData = await getFooter();

  if (!footerData) {
    return null;
  }

  const { contactInfo, additionalLinks } = footerData;

  return (
    <footer className="bg-black/80 py-4 lg:py-6 text-white">
      <div className="mx-auto px-4 container">
        <div className="flex lg:flex-row flex-col justify-between items-center gap-4 lg:gap-8">
          <Link href="/" className="flex flex-col items-center gap-1 lg:gap-2">
            <Logo
              className="w-16 lg:w-20 h-fit"
              accentClassName="text-accent"
              subtitleClassName="text-[6px] lg:text-[8px]"
            />
          </Link>
          <div className="flex md:flex-row flex-col items-center gap-3 lg:gap-8 xl:gap-16 text-xs lg:text-base 2xl:text-2xl">
            {contactInfo?.phone && (
              <Link
                href={`tel:${contactInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent whitespace-nowrap transition-colors"
              >
                <PhoneIcon className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>{contactInfo.phone}</span>
              </Link>
            )}
            {contactInfo?.email && (
              <Link
                href={`mailto:${contactInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent lg:text-left text-center break-all lg:break-normal transition-colors"
              >
                <EmailIcon className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>{contactInfo.email}</span>
              </Link>
            )}
            {additionalLinks &&
              additionalLinks.length > 0 &&
              additionalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
          </div>
          <div className="flex gap-4 xl:gap-11 text-lg lg:text-2xl">
            {contactInfo?.telegram && (
              <Link
                href={
                  contactInfo.telegram.startsWith("http")
                    ? contactInfo.telegram
                    : `https://t.me/${contactInfo.telegram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors cursor-pointer"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-6 xl:w-11 h-6 xl:h-11" />
              </Link>
            )}
            {contactInfo?.instagram && (
              <Link
                href={
                  contactInfo.instagram.startsWith("http")
                    ? contactInfo.instagram
                    : `https://instagram.com/${contactInfo.instagram.replace(
                        "@",
                        ""
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 xl:w-11 h-6 xl:h-11" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
