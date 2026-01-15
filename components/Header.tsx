"use client";

import { BurgerIcon, Logo, PhoneIcon } from "@/assets/icons";
import { scrollToSection } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface NavigationItem {
  label: string;
  href: string;
  anchor?: string;
}

interface HeaderProps {
  menuItems?: NavigationItem[];
  phone?: string;
}

export function Header({ menuItems = [], phone }: HeaderProps) {
  console.log("Header received phone:", phone);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [blurValue, setBlurValue] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setBlurValue(latest > 0 ? 8 : 0);
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavigationItem,
  ) => {
    if (item.anchor && !item.href.startsWith("http")) {
      e.preventDefault();
      const sectionId = item.anchor.startsWith("#")
        ? item.anchor.slice(1)
        : item.anchor;

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Wait for header to collapse before measuring offset
        window.setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`top-0 z-[70] fixed py-5 w-full transition-all duration-300 ${
        isMobileMenuOpen
          ? "lg:h-full h-screen bg-black/95 backdrop-blur-md"
          : "bg-black/80 backdrop-blur-sm"
      }`}
      style={{
        backdropFilter: isMobileMenuOpen
          ? "blur(12px)"
          : `blur(${blurValue}px)`,
      }}
    >
      <motion.div
        className="top-0 right-0 left-0 absolute bg-accent h-1 origin-left"
        style={{ scaleX }}
      />
      <div className="relative mx-auto px-4 h-full container">
        <nav className="flex justify-between items-center gap-5">
          <Link href="/">
            <Logo
              className="w-24 lg:w-32 h-12 lg:h-16"
              accentClassName="text-accent"
              showSubtitle={true}
            />
          </Link>
          {menuItems.length > 0 && (
            <div className="hidden lg:flex flex-wrap items-center gap-16 xl:gap-32">
              {menuItems.map((item) => (
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
          )}
          <div className="flex lg:hidden items-center gap-5 md:gap-12 z-90 relative">
            {phone && phone.trim() && (
              <Link
                href={`tel:${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent whitespace-nowrap transition-colors transition-hover text-base text-white dark:text-white"
              >
                <PhoneIcon className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>{phone}</span>
              </Link>
            )}
            {menuItems.length > 0 && (
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden z-[90] relative p-2 text-white "
                aria-label="Toggle menu"
              >
                <BurgerIcon
                  isOpen={isMobileMenuOpen}
                  className="w-12 h-12 text-accent"
                />
              </button>
            )}
          </div>
        </nav>
        {isMobileMenuOpen && menuItems.length > 0 && (
          <div className="lg:hidden flex flex-col justify-center items-center gap-20 px-4 pt-16 pb-8 overflow-y-auto">
            {menuItems.map((item) => (
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
        )}
      </div>
    </motion.header>
  );
}
