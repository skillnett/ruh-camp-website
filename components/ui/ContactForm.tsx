"use client";

import { Button } from "./Button";
import { useState } from "react";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      setSubmitStatus({
        type: "success",
        message: "Дякуємо! Ваша заявка успішно відправлена.",
      });
      setFormData({ name: "", email: "", phone: "" });
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
      className={`flex flex-col gap-4 lg:gap-6 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm lg:text-base font-medium text-white"
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
          className="px-4 py-3 lg:px-6 lg:py-4 rounded-lg lg:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="Введіть ваше ім'я"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm lg:text-base font-medium text-white"
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
          className="px-4 py-3 lg:px-6 lg:py-4 rounded-lg lg:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="text-sm lg:text-base font-medium text-white"
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
          className="px-4 py-3 lg:px-6 lg:py-4 rounded-lg lg:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="mt-2"
        onClick={() => {}}
      >
        {isSubmitting ? "Відправка..." : "Відправити заявку"}
      </Button>
    </form>
  );
}
