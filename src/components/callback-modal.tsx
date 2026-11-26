"use client";

import Link from "next/link";
import { LoaderCircle, X } from "lucide-react";
import { FormEvent, KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type CallbackModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  source?: "header_callback" | "technology_cta";
};

const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return "";
  if (digits.length < 4) return `+7 (${digits}`;
  if (digits.length < 7) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length < 9) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
}

export function CallbackModal({ open, onClose, returnFocusRef, source = "header_callback" }: CallbackModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => nameRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    if (isSubmitting) return;
    onClose();
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href]'
    ));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validName = name.trim().length >= 2;
    const validPhone = phonePattern.test(phone);
    setNameError(validName ? "" : "Укажите имя — не менее двух символов.");
    setPhoneError(validPhone ? "" : "Введите номер в формате +7 (999) 999-99-99.");
    setSubmitError("");
    if (!validName || !validPhone) return;

    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
    if (!endpoint) {
      setSubmitError("Приём заявок через сайт пока не подключён. Пожалуйста, позвоните нам по номеру в шапке сайта.");
      return;
    }

    setIsSubmitting(true);
    trackAnalyticsEvent("lead_submit");
    if (source === "technology_cta") trackAnalyticsEvent("technology_cta_submit");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, source }),
      });
      if (!response.ok) throw new Error("Lead endpoint rejected the request");
      setSubmitted(true);
      trackAnalyticsEvent("lead_success");
    } catch {
      setSubmitError("Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз или позвоните нам по номеру в шапке сайта.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B1A]/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        aria-describedby="callback-description"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-[440px] rounded-3xl bg-[#F5F3EE] p-6 text-[#1C1B1A] shadow-2xl sm:p-8"
      >
        <button type="button" onClick={close} disabled={isSubmitting} aria-label="Закрыть форму" className="absolute right-4 top-4 grid size-10 place-items-center rounded-xl text-[#57534E] transition hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2593F] disabled:cursor-not-allowed disabled:opacity-60">
          <X size={20} strokeWidth={1.75} />
        </button>
        <h2 id="callback-title" className="pr-10 [font-family:Manrope,Arial,sans-serif] text-2xl font-bold tracking-tight">Заказать звонок</h2>
        <p id="callback-description" className="mt-2 text-sm leading-6 text-[#57534E]">Оставьте номер телефона, и мы свяжемся с вами.</p>
        {submitted ? <p role="status" className="mt-6 rounded-xl border border-[#C2593F]/25 bg-white/70 px-4 py-3 text-sm leading-6 text-[#57534E]">Спасибо! Мы получили заявку и скоро свяжемся с вами.</p> : <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="callback-name" className="sr-only">Ваше имя</label>
            <input ref={nameRef} id="callback-name" name="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(nameError)} aria-describedby={nameError ? "callback-name-error" : undefined} autoComplete="name" placeholder="Ваше имя" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-base outline-none placeholder:text-stone-400 focus:border-[#C2593F] focus:ring-2 focus:ring-[#C2593F]/20" />
            {nameError && <p id="callback-name-error" role="alert" className="mt-2 text-sm text-[#A84830]">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="callback-phone" className="sr-only">Телефон</label>
            <input id="callback-phone" name="phone" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? "callback-phone-error" : undefined} inputMode="tel" autoComplete="tel" placeholder="+7 (999) 999-99-99" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-base outline-none placeholder:text-stone-400 focus:border-[#C2593F] focus:ring-2 focus:ring-[#C2593F]/20" />
            {phoneError && <p id="callback-phone-error" role="alert" className="mt-2 text-sm text-[#A84830]">{phoneError}</p>}
          </div>
          {submitError && <p role="alert" className="rounded-xl border border-[#C2593F]/25 bg-white/70 px-4 py-3 text-sm leading-5 text-[#57534E]">{submitError}</p>}
          <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2593F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A84830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2593F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
            {isSubmitting ? "Отправляем…" : "Жду звонка"}
          </button>
        </form>}
        <p className="mt-4 text-xs leading-5 text-[#78716C]">Нажимая на кнопку, вы соглашаетесь на обработку персональных данных в соответствии с <Link href="/privacy" className="underline underline-offset-2 hover:text-[#1C1B1A]">политикой конфиденциальности</Link>.</p>
      </div>
    </div>
  );
}
