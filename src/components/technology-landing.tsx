"use client";

import Link from "next/link";
import { useState } from "react";
import type { TechnologyTopic } from "@/types/editorial";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { TechnologyCta } from "./technology-cta";

const overviewFaq = [
  ["Из чего состоит стена каркасного дома?", "Это согласованная система несущей части, теплового контура, защитных и отделочных слоёв. Точный состав определяется проектом."],
  ["Какое утепление используется в каркасном доме?", "Решение зависит от проекта, условий эксплуатации и утверждённой спецификации. Универсальных цифр и марок без исходных данных не бывает."],
  ["Нужна ли пароизоляция?", "Такие решения рассматривают в составе конкретной конструкции и вместе с вентиляцией, а не как отдельную опцию."],
  ["Как устроен пол в каркасном доме?", "Пол увязывают с фундаментом, конструкцией, инженерными коммуникациями и будущей отделкой."],
  ["Какая кровля подходит для каркасного дома?", "Кровельное решение выбирают по архитектуре дома, проекту и условиям участка."],
  ["Нужна ли вентиляция в каркасном доме?", "Вопрос воздухообмена важен для современного дома и прорабатывается вместе с планировкой и инженерной частью."],
] as const;

export function TechnologyLanding({ topics }: { topics: TechnologyTopic[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? null;

  const activateHotspot = (slug: string) => {
    setActiveSlug(slug);
    trackAnalyticsEvent("technology_hotspot_click");
  };

  return <div className="page-surface technology-page">
    <section className="technology-hero"><div className="wrap"><p className="eyebrow">Экспертный раздел</p><h1 className="display technology-hero__title">Технология строительства каркасных домов</h1><p className="technology-hero__lead">Показываем, из чего состоит будущий дом: конструктив, утепление, полы, кровля, окна, инженерные решения и другие важные элементы.</p><p className="muted mt-5 max-w-2xl leading-7">Раздел поможет понять общую логику строительства каркасного дома и подготовиться к предметному разговору о проекте, комплектации и стоимости.</p><div className="mt-8"><TechnologyCta>Обсудить проект</TechnologyCta></div></div></section>

    <section className="section"><div className="wrap"><div className="section-heading"><div className="section-heading__body"><p className="eyebrow">Конструктив</p><h2 className="display section-heading__title mt-4">Из чего состоит ваш будущий дом</h2><p className="muted section-heading__text mt-5 leading-7">Пока финальная иллюстрация готовится, схема помогает увидеть, как темы связаны между собой. Нажмите на точку, чтобы прочитать пояснение или перейти к материалу.</p></div></div><div className="technology-scheme mt-10" aria-label="Схема элементов каркасного дома"><div className="technology-scheme__house" aria-hidden="true"><span className="technology-scheme__roof" /><span className="technology-scheme__body" /><span className="technology-scheme__window technology-scheme__window--one" /><span className="technology-scheme__window technology-scheme__window--two" /><span className="technology-scheme__door" /></div>{topics.map((topic) => <div key={topic.slug} className="technology-hotspot" style={{ left: `${topic.hotspot.x}%`, top: `${topic.hotspot.y}%` }}><button type="button" onClick={() => activateHotspot(topic.slug)} aria-expanded={activeTopic?.slug === topic.slug} aria-label={`Показать: ${topic.hotspotLabel}`}><span /></button>{activeTopic?.slug === topic.slug && <div className="technology-hotspot__popover"><p className="font-bold text-[#1C1B1A]">{topic.hotspotLabel}</p><p className="mt-1 text-sm leading-5 text-[#57534E]">{topic.excerpt}</p><Link href={`/technology/${topic.slug}/`} onClick={() => trackAnalyticsEvent("technology_hotspot_click")} className="mt-3 inline-flex text-sm font-bold text-[#2D3A31] underline decoration-[#C2593F] underline-offset-4">Подробнее</Link></div>}</div>)}</div><div className="mt-5 flex flex-wrap gap-2">{topics.map((topic) => <Link key={topic.slug} href={`/technology/${topic.slug}/`} onClick={() => trackAnalyticsEvent("technology_hotspot_click")} className="technology-scheme__legend">{topic.hotspotLabel}</Link>)}</div></div></section>

    <section className="section bg-white/45"><div className="wrap"><div className="section-heading"><div className="section-heading__body"><p className="eyebrow">Темы раздела</p><h2 className="display section-heading__title mt-4">Разбираем дом по важным решениям</h2></div></div><div className="technology-topic-grid mt-10">{topics.map((topic) => <article key={topic.slug} className="technology-topic-card"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#765637]">Технология</p><h3 className="display mt-4 text-3xl">{topic.title}</h3><p className="muted mt-4 text-sm leading-6">{topic.excerpt}</p><Link href={`/technology/${topic.slug}/`} onClick={() => trackAnalyticsEvent("technology_topic_click")} className="mt-6 inline-flex text-sm font-bold text-[#1C1B1A] underline decoration-[#C2593F] decoration-2 underline-offset-4">Подробнее</Link></article>)}</div></div></section>

    <section className="section"><div className="wrap"><div className="technology-expertise"><div><p className="eyebrow">Подход</p><h2 className="display mt-4 text-4xl">Что вы найдёте в разделе</h2></div><ul>{["Объясняем простым языком.", "Показываем устройство узлов и решений.", "Рассказываем, на что обращать внимание.", "Не перегружаем человека лишней терминологией.", "Публикуем только полезную информацию."].map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

    <section className="section bg-white/45"><div className="wrap max-w-4xl"><p className="eyebrow">Вопросы и ответы</p><h2 className="display mt-4 text-4xl">Технология без лишних сложностей</h2><div className="faq-list mt-8">{overviewFaq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p className="muted pb-5 leading-7">{answer}</p></details>)}</div></div></section>

    <section className="section"><div className="wrap"><div className="final-cta"><div className="final-cta__inner max-w-3xl"><p className="eyebrow">Следующий шаг</p><h2 className="display mt-5 text-4xl sm:text-5xl">Обсудим, каким будет ваш дом</h2><p className="mt-5 max-w-2xl leading-7 text-[#dce5dd]">Если хотите понять, какой конструктив и какая комплектация подойдут именно вам, оставьте заявку — обсудим проект, участок и формат строительства.</p><div className="mt-8"><TechnologyCta>Обсудить строительство</TechnologyCta></div></div></div></div></section>
  </div>;
}