import { ReactNode } from "react";

interface TitleH2Props {
  children: ReactNode;
  className?: string;
}

export function TitleH2({ children, className = "" }: TitleH2Props) {
  const baseStyles =
    "font-semibold uppercase font-benzin text-3xl lg:text-5xl text-center text-balance";

  return <h2 className={`${baseStyles} ${className}`}>{children}</h2>;
}
