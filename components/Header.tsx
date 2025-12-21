"use client";

import { BurgerIcon, Logo } from "@/assets/icons";
import { headerData } from "@/data/Header.data";
import { scrollToSection } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { href: string; sectionId?: string }
  ) => {
    if (item.sectionId) {
      e.preventDefault();
      // Remove # if present
      const sectionId = item.sectionId.startsWith("#")
        ? item.sectionId.slice(1)
        : item.sectionId;
      scrollToSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="top-0 z-50 fixed bg-black/80 py-5 w-full">
      <div className="relative mx-auto px-4 container">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Logo
              className="w-24 lg:w-32 h-12 lg:h-16"
              accentClassName="text-accent"
              showSubtitle={true}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-16 xl:gap-32">
            {headerData.navigationData.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="text-white hover:text-accent text-sm lg:text-lg xl:text-3xl transition-hover"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden z-50 relative p-2 text-white"
            aria-label="Toggle menu"
          >
            <BurgerIcon isOpen={isMobileMenuOpen} className="w-6 h-6" />
          </button>
        </nav>
        {isMobileMenuOpen && (
          <div className="lg:hidden top-0 z-40 fixed inset-0 bg-black/95 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-20 px-4 py-8 pt-24 h-full">
              {headerData.navigationData.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-white hover:text-accent text-xl transition-hover"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
