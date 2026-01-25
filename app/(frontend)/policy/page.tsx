import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Політика конфіденційності та обробки персональних даних STEP CAMP.",
};

export default function PolicyPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center px-4 py-16 lg:py-24 bg-black">
        <div className="container max-w-3xl mx-auto">
          <h1 className="font-benzin font-bold text-white text-2xl md:text-3xl lg:text-4xl mb-8 lg:mb-10 text-center">
            Політика конфіденційності
          </h1>
          <div className="text-white/90 text-base lg:text-lg leading-relaxed space-y-6">
            <p>
              STEP CAMP поважає вашу конфіденційність та зобов&apos;язується
              захищати ваші персональні дані. Ця політика пояснює, як ми
              збираємо, використовуємо та зберігаємо інформацію.
            </p>
            <p>
              Надаючи нам свої дані (ім&apos;я, email, телефон) через форму
              зворотного зв&apos;язку, ви погоджуєтесь на їх обробку з метою
              зв&apos;язку та надання послуг.
            </p>
            <p>
              Ми не передаємо ваші персональні дані третім особам без вашої
              згоди, за винятком випадків, передбачених законодавством.
            </p>
            <p>
              Якщо у вас виникли питання щодо обробки даних, зв&apos;яжіться з
              нами за контактами, вказаними на сайті.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 rounded-full bg-accent text-black font-medium hover:opacity-90 transition-opacity"
            >
              На головну
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
