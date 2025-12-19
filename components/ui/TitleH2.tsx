import { ReactNode } from "react";

interface TitleH2Props {
  children: ReactNode;
  className?: string;
}

export function TitleH2({ children, className = "" }: TitleH2Props) {
  const baseStyles = "font-semibold uppercase font-benzin text-center";

  return (
    <h2 className={`${baseStyles} ${className ?? "xl:text-7xl text-5xl"} `}>
      {children}
    </h2>
  );
}
