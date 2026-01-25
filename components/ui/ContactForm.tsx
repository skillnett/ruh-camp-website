"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ContactFormProps {
  className?: string;
  privacyPolicyUrl?: string;
  thankYouPage?: string;
}

const THANK_YOU_PAGE = "/thanks";

export function ContactForm({
  className = "",
  privacyPolicyUrl = "/policy",
  thankYouPage,
}: ContactFormProps) {
  const redirectUrl = thankYouPage ?? THANK_YOU_PAGE;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    if (target.type === "checkbox") {
      setAgreePrivacy((target as HTMLInputElement).checked);
      return;
    }
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreePrivacy) {
      setSubmitStatus({
        type: "error",
        message: "Потрібно погодитися з політикою конфіденційності.",
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/form-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка відправки форми");
      }

      setFormData({ name: "", email: "", phone: "" });
      setAgreePrivacy(false);
      router.push(redirectUrl);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Сталася помилка. Спробуйте ще раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 lg:gap-6 px-4 pb-2 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-medium text-black text-sm lg:text-base"
        >
          Ім&apos;я *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-white/40 px-4 lg:px-6 py-3 lg:py-4 border border-white/20 focus:border-transparent rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black placeholder:text-black/50 transition-all"
          placeholder="Введіть ваше ім'я"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-medium text-black text-sm lg:text-base"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white/40 px-4 lg:px-6 py-3 lg:py-4 border border-white/20 focus:border-transparent rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black placeholder:text-black/50 transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="font-medium text-black text-sm lg:text-base"
        >
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-white/40 px-4 lg:px-6 py-3 lg:py-4 border border-white/20 focus:border-transparent rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black placeholder:text-black/50 transition-all"
          placeholder="+380 XX XXX XX XX"
        />
      </div>

      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-500/20 text-green-300 border border-green-500/50"
              : "bg-red-500/20 text-red-300 border border-red-500/50"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <label className="flex items-start gap-3 cursor-pointer group mx-auto w-fit">
        <input
          type="checkbox"
          name="agreePrivacy"
          checked={agreePrivacy}
          onChange={handleChange}
          className="mt-1 w-4 h-4 shrink-0 rounded border-white/30 bg-white/40 accent-accent focus:ring-accent focus:ring-offset-0"
        />
        <span className="text-black text-sm lg:text-base">
          Я погоджуюсь з{" "}
          <Link
            href={privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            політикою конфіденційності
          </Link>{" "}
        </span>
      </label>

      <Button
        type="submit"
        variant="primary"
        size="sm"
        className="mx-auto mt-4"
        disabled={!agreePrivacy || isSubmitting}
      >
        {isSubmitting ? "Відправка..." : "Відправити заявку"}
      </Button>
    </form>
  );
}
