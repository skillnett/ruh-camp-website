import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  href,
}: ButtonProps) {
  const baseStyles =
    "font-medium transition-all cursor-pointer transition-hover w-fit hover:opacity-80";
  const variantStyles = {
    primary: "bg-black text-accent",
    secondary: "bg-white text-accent",
    outline: "border-2 border-gray-300 text-gray-700",
  };

  const sizeStyles = {
    sm: "px-4 py-2 lg:px-7 lg:py-5 text-md lg:text-2xl rounded-full font-medium",
    md: "px-6 lg:px-11 py-4 lg:py-7 text-2xl lg:text-5xl rounded-[28px] lg:rounded-[40px] font-medium",
    lg: "px-8 py-4 text-lg rounded-full",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
