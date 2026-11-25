import { publishedPortfolio } from "@/data/content";
import { pageMetadata } from "@/lib/seo";
import { EmptyState } from "@/components/empty-state";
import { PortfolioCard } from "@/components/portfolio-card";

export const metadata = pageMetadata("Построенные дома", "Портфолио ДаДом: фотографии, характеристики и описание работ на реальных объектах.", "/portfolio", publishedPortfolio.length > 0);

export default function PortfolioPage() {
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">Портфолио</p><h1 className="display page-intro__title mt-5">Построенные дома «ДаДом»</h1><p className="muted mt-5 max-w-2xl leading-7">Показываем только подтверждённые объекты с разрешёнными к публикации фотографиями и характеристиками.</p></div></section><section className="page-surface"><div className="wrap pt-10">{publishedPortfolio.length ? <div className="grid gap-5 md:grid-cols-2">{publishedPortfolio.map((item) => <PortfolioCard item={item} key={item.id} />)}</div> : <EmptyState kind="portfolio" />}</div></section></>;
}