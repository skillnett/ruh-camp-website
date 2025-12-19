interface TitleH2Props {
  text: string;
  className?: string;
}

export function TitleH2({ text, className = "" }: TitleH2Props) {
  const baseStyles = "font-semibold uppercase font-benzin text-center";

  return (
    <h2 className={`${baseStyles} ${className ?? "xl:text-7xl text-5xl"} `}>
      {text}
    </h2>
  );
}
