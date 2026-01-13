import { Button } from "./Button";

interface PacketCardProps {
  title: string;
  variant?: "gold" | "silver";
  list?: Array<{ item: string; isBold?: boolean }> | string[];
  price: string | number;
  buttonText: string;
  onButtonClick?: () => void;
}

export function PacketCard({
  title,
  variant = "silver",
  list = [],
  price,
  buttonText,
  onButtonClick,
}: PacketCardProps) {
  const variantStyles = {
    gold: {
      background: "bg-gradient-to-r from-[#ffc000] to-[#fffa7a]",
      border: "border-2 border-yellow-400",
      text: "bg-gradient-to-r from-[#ffc000] to-[#fffa7a] bg-clip-text text-transparent",
      button:
        "bg-black hover:bg-gray-900 text-yellow-400 border-2 border-yellow-400",
    },
    silver: {
      background: "bg-gradient-to-r from-[#c1c1c1] to-white",
      border: "border-2 border-gray-400",
      text: "bg-gradient-to-r from-[#c1c1c1] to-white bg-clip-text text-transparent",
      button: "bg-black hover:bg-gray-900 text-white border-2 border-gray-400",
    },
  };

  const styles = variantStyles[variant];

  const formatPrice = (price: string | number) => {
    if (typeof price === "number") {
      return price.toLocaleString("uk-UA");
    }
    return price;
  };

  return (
    <div className="w-full lg:rounded-[52px] rounded-[42px] overflow-hidden bg-black  lg:p-10 p-7 max-w-[636px]">
      <h3
        className={`text-3xl lg:text-5xl font-bold mb-6 text-center  font-benzin  ${styles.text}`}
      >
        {title}
      </h3>
      <div
        className={`${styles.background} w-full lg:rounded-[42px] rounded-[32px] text-[16px] lg:text-[18px]`}
      >
        {list && list.length > 0 && (
          <ul className="space-y-2 lg:px-12 px-5 sm:px-9 lg:pt-7 pt-4 sm:pt-5 pb-7 sm:pb-9 lg:pb-12 text-black">
            {list.map((item, index) => {
              const itemText =
                typeof item === "string"
                  ? item
                  : (item as { item: string; isBold?: boolean })?.item;
              const isBold =
                typeof item === "object" &&
                (item as { isBold?: boolean })?.isBold;
              return itemText ? (
                <li
                  key={index}
                  className={`flex items-start  text-[clamp(0.875rem,1.5vw+0.5rem,1.25rem)]  leading-[1.3]`}
                >
                  <span className="mr-2">•</span>
                  <span className={isBold ? "font-bold" : ""}>{itemText}</span>
                </li>
              ) : null;
            })}
          </ul>
        )}

        <div className="flex items-center justify-center gap-2 w-full bg-black text-white text-[clamp(1.25rem,2vw+0.5rem,1.875rem)] font-benzin font-regular uppercase lg:py-5 py-3">
          <span>Ціна:</span>
          <span>{formatPrice(price)}</span>
          <span>грн</span>
        </div>

        <Button
          size="custom"
          variant="custom"
          className={`w-full text-[clamp(1.5rem,2.5vw+0.5rem,2.75rem)] py-4 lg:py-8 rounded-[20px] font-bold font-benzin uppercase  text-black leading-[0.8]`}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
