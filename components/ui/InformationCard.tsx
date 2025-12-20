import Image from "next/image";

interface InformationCardProps {
  title: string;
  titlePrefix: string;
  items: string[];
  defaultImage?: string;
}

export function InformationCard({
  title,
  titlePrefix,
  items,
  defaultImage,
}: InformationCardProps) {
  return (
    <div className="relative bg-accent px-12 py-10 rounded-[40px] w-full lg:max-w-[456px] overflow-hidden text-left">
      <h5 className="z-10 relative mb-5 lg:mb-10 font-bold text-white text-3xl lg:text-5xl">
        <span className="text-black">{titlePrefix}</span> {title as string}
      </h5>
      {items.length > 0 && (
        <ul className="space-y-2 pl-6 text-black text-2xl lg:text-3xl list-disc list-outside">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {defaultImage && (
        <div className="top-0 -right-1/2 z-0 absolute w-full h-full">
          <Image
            src={defaultImage}
            alt={title}
            fill
            className="object-cover object-left"
            priority
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
