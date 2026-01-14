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
    <div className="flex flex-col bg-white  p-3 lg:px-5 lg:pt-5 pb-2 lg:rounded-4xl rounded-[25px] max-w-[320px] text-black text-center">
      {imageUrl && (
        <div className="relative lg:mb-[18px] mb-2 rounded-[18px] w-full h-[90px] lg:h-[185px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      )}
      <span className="block lg:mb-4 mb-1 px-1.5 font-bold text-[13px] lg:text-[26px] text-balance leading-[1.2] lg:leading-7">
        {name}
      </span>
      <span className="block mb-2 text-[10px] lg:text-base">{role}</span>
      {networkLink && networkLink.trim() && (
        <a
          href={networkLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/50 hover:text-accent transition-hover text-[10px] lg:text-base"
        >
          {linkText || "Link to profile"}
        </a>
      )}
    </div>
  );
}
