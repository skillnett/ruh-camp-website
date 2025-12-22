import { Footer } from "@/components/Footer";
import { HeaderWrapper } from "@/components/HeaderWrapper";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
