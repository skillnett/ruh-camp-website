import "@/assets/style/globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex justify-center items-center px-4 min-h-screen">
      <div className="z-10 relative mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <h1
            className="mb-4 font-bold text-9xl"
            style={{
              fontFamily: "var(--font-benzin)",
              background: "var(--gradient-pink)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>
          <h2
            className="mb-4 font-semibold text-3xl"
            style={{ fontFamily: "var(--font-benzin)" }}
          >
            Сторінку не знайдено
          </h2>
          <p className="mb-8 text-gray-300 text-lg">
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>
        </div>

        <div className="flex sm:flex-row flex-col justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-lg font-medium text-black transition-all"
            style={{
              background: "var(--gradient-pink)",
            }}
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}
