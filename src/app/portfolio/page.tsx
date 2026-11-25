import { publishedPortfolio } from "@/data/content";
import { paginate, single, type Query } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { PortfolioCard } from "@/components/portfolio-card";

type Props = { searchParams: Promise<Query> };
export const dynamic = "force-static";

export async function generateMetadata({ searchParams }: Props) {
  const query = await searchParams;
  return pageMetadata("Построенные дома", "Портфолио ДаДом: фотографии, характеристики и описание работ на реальных объектах.", "/portfolio", publishedPortfolio.length > 0 && !Object.values(query).some(Boolean));
}

export default async function PortfolioPage({ searchParams }: Props) {
  const result = paginate(publishedPortfolio, single((await searchParams).page));
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">Портфолио</p><h1 className="display page-intro__title mt-5">Построенные дома «ДаДом»</h1><p className="muted mt-5 max-w-2xl leading-7">Показываем только подтверждённые объекты с разрешёнными к публикации фотографиями и характеристиками.</p></div></section><section className="page-surface"><div className="wrap pt-10">{result.total ? <><div className="grid gap-5 md:grid-cols-2">{result.items.map((item) => <PortfolioCard item={item} key={item.id} />)}</div><Pagination path="/portfolio" page={result.page} pages={result.pages} /></> : <EmptyState kind="portfolio" />}</div></section></>;
}
