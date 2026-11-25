"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useRef, useState } from "react";
import { CallbackModal } from "./callback-modal";
import { trackAnalyticsEvent } from "@/lib/analytics";

const links = [["Проекты", "/#projects"], ["Технология", "/technology"], ["Комплектации", "/complectations"], ["Контакты", "/contacts"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [restoreMobileTrigger, setRestoreMobileTrigger] = useState(false);
  const callbackButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCallbackButtonRef = useRef<HTMLButtonElement>(null);
  const showCallback = (fromMobile = false) => {
    trackAnalyticsEvent("callback_open");
    setRestoreMobileTrigger(fromMobile);
    setOpen(false);
    setCallbackOpen(true);
  };
  const closeCallback = () => {
    setCallbackOpen(false);
    setOpen(restoreMobileTrigger);
  };
  return <><header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200/60 bg-[#F9F8F6]/80 text-[#1C1B1A] backdrop-blur-md"><div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-6 lg:px-8"><div className="flex min-w-0 items-center gap-4"><Link href="/" aria-label="ДаДом — главная" className="flex shrink-0 items-center gap-2 focus-visible:outline-none"><img src="/images/dadom-house-mark.svg" alt="" className="size-10" /><span className="[font-family:Manrope,Arial,sans-serif] text-[1.55rem] font-extrabold leading-none tracking-[-0.07em]">Да<span className="text-[#C2593F]">Дом</span></span></Link><span className="hidden border-l border-stone-300 pl-4 text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.13em] text-[#57534E] xl:block">Строительство каркасных домов<br />· Екатеринбург и Урал</span></div><nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Основная навигация">{links.map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#C2593F]">{label}</Link>)}</nav><div className="hidden items-center gap-4 md:flex"><a href="tel:+73432888888" onClick={() => trackAnalyticsEvent("phone_click")} className="text-sm font-medium">+7 (343) 288-88-88</a><button ref={callbackButtonRef} type="button" onClick={() => showCallback()} className="rounded-xl bg-[#C2593F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A84830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2593F] focus-visible:ring-offset-2">Заказать звонок</button></div><button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl border border-stone-200 bg-white lg:hidden" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open}>{open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}</button></div>{open && <nav className="border-t border-stone-200/60 bg-[#F9F8F6] px-6 py-4 lg:hidden" aria-label="Мобильная навигация"><div className="mx-auto grid max-w-7xl gap-1">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white">{label}</Link>)}<a href="tel:+73432888888" onClick={() => trackAnalyticsEvent("phone_click")} className="mt-2 inline-flex items-center gap-2 px-3 py-3 text-sm font-medium"><Phone size={17} strokeWidth={1.5} />+7 (343) 288-88-88</a><button ref={mobileCallbackButtonRef} type="button" onClick={() => showCallback(true)} className="mt-2 rounded-xl bg-[#C2593F] px-3 py-3 text-left text-sm font-semibold text-white">Заказать звонок</button></div></nav>}</header>{callbackOpen && <CallbackModal open onClose={closeCallback} returnFocusRef={restoreMobileTrigger ? mobileCallbackButtonRef : callbackButtonRef} />}</>;
}
