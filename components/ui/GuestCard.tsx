import { getMediaUrl } from "@/lib/payload";
import Image from "next/image";

interface GuestCardProps {
  name: string;
  role: string;
  image?: unknown;
  networkLink?: string;
  linkText?: string;
}

export function GuestCard({
  name,
  role,
  image,
  networkLink,
  linkText,
}: GuestCardProps) {
  const imageUrl = image ? getMediaUrl(image) : null;

  return (
    <div className="flex flex-col bg-white px-5 pt-5 pb-2 rounded-4xl max-w-[320px] text-black text-center">
      {imageUrl && (
        <div className="relative mb-[18px] rounded-[18px] w-full h-[185px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )}
      <span className="block mb-4 px-1.5 font-bold text-[20px] lg:text-[26px] text-balance leading-7">
        {name}
      </span>
      <span className="block mb-2">{role}</span>
      {networkLink && networkLink.trim() && (
        <a
          href={networkLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/50 hover:text-accent transition-hover"
        >
          {linkText || "Link to profile"}
        </a>
      )}
    </div>
  );
}
