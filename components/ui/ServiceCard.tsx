import { Logo } from "@/assets/icons";
import { Button } from "./Button";

interface ServiceCardProps {
  variant?: "green" | "yellow" | "orange" | "blue" | string;
  title?: string;
  subtitle?: string;
  content?: Array<{ item: string }> | string[];
  firstButtonText?: string;
  onFirstButtonClick?: () => void;
  secondButtonText?: string;
  secondButtonLink?: string;
  onSecondButtonClick?: () => void;
}

export function ServiceCard({
  variant = "green",
  title = "Next Camp",
  subtitle = "subtitle",
  content,
  firstButtonText = "Details",
  onFirstButtonClick,
  secondButtonText = "Sign up",
  secondButtonLink,
  onSecondButtonClick,
}: ServiceCardProps) {
  const variantCard = {
    green: {
      background: "gradient-green",
      text: "text-green",
      firstButton: "border-2 border-green text-green rounded-b-[20px]",
      secondButton:
        "bg-green border-2 border-green text-black rounded-b-[20px]",
    },
    yellow: {
      background: "gradient-yellow",
      text: "text-yellow ",
      firstButton: "border-2 border-yellow text-yellow rounded-b-[20px]",
      secondButton:
        "bg-yellow border-2 border-yellow text-black rounded-b-[20px]",
    },
    orange: {
      background: "gradient-orange",
      text: "text-orange ",
      firstButton: "border-2 border-orange text-orange rounded-b-[20px]",
      secondButton:
        "bg-orange border-2 border-orange text-white rounded-b-[20px]",
    },
    blue: {
      background: "gradient-blue",
      text: "text-blue",
      firstButton: "border-2 border-blue text-blue rounded-b-[20px]",
      secondButton: "bg-blue border-2 border-blue text-white rounded-b-[20px]",
    },
  };

  const variantStyles =
    variantCard[variant as keyof typeof variantCard] || variantCard.green;

  return (
    <div className="w-full md:max-w-131">
      <div
        className={`${variantStyles.background} py-7 pr-6 pl-10 rounded-t-[40px] mb-4`}
      >
        <div className="flex justify-between items-center mb-9">
          <div className="w-full">
            <h3 className="font-bold text-2xl leading-tight">{title}</h3>
            {subtitle && (
              <span className={`${variantStyles.text} text-base text-white`}>
                {subtitle}
              </span>
            )}
          </div>
          <Logo
            className="w-24 lg:w-28 h-12 lg:h-14"
            accentClassName={variantStyles.text}
            showSubtitle={false}
          />
        </div>
        <div className="h-full text-white">
          {content && Array.isArray(content) && content.length > 0 && (
            <ul className="space-y-1">
              {content.map((item, index) => {
                const itemText =
                  typeof item === "string"
                    ? item
                    : (item as { item: string })?.item;
                return itemText ? (
                  <li key={index} className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>{itemText}</span>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        {firstButtonText && (
          <Button
            variant="custom"
            className={variantStyles.firstButton}
            onClick={onFirstButtonClick}
          >
            {firstButtonText}
          </Button>
        )}
        {secondButtonText && (
          <Button
            variant="custom"
            className={variantStyles.secondButton}
            href={onSecondButtonClick ? undefined : secondButtonLink}
            onClick={onSecondButtonClick}
          >
            {secondButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
