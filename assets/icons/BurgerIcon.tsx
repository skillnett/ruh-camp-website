interface BurgerIconProps {
  isOpen: boolean;
  className?: string;
}

export function BurgerIcon({ isOpen, className }: BurgerIconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-hover origin-[12px_6px] ${isOpen ? "rotate-45 translate-y-[6px]" : ""}`}
      />
      <path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-hover ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <path
        d="M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-hover origin-[12px_18px] ${isOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
      />
    </svg>
  );
}

