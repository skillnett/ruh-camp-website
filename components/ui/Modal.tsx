"use client";

import { XIcon } from "@/assets/icons";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
}: ModalWrapperProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-100 fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="top-1/2 left-1/2 z-101 fixed shadow-2xl p-6 md:p-10 lg:p-12 border-4 border-black/60 rounded-[40px] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 gradient-pink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-between items-start mb-6">
              {title && (
                <h3 className="mx-auto font-benzin font-bold text-black text-2xl md:text-3xl lg:text-4xl text-center">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="-top-2 lg:-top-5 -right-2 lg:-right-5 absolute ml-4 p-2 text-white hover:text-black transition-colors"
                aria-label="Закрити модалку"
              >
                <XIcon className="w-6 md:w-8 h-6 md:h-8" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
