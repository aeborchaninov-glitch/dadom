import Link from "next/link";
import type { PortfolioItem } from "@/types/content";
import { ContentImage } from "./content-image";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const details = [item.area === null ? null : `${item.area} м²`, item.location, item.completionYear].filter((value) => value !== null).join(" · ");

  return (
    <article className="portfolio-card card">
      <Link href={`/portfolio/${item.slug}`} aria-label={`Объект ${item.title}`} className="portfolio-card__media relative block aspect-[16/10] bg-[var(--mist)]">
        <ContentImage image={item.heroImage ?? item.gallery[0] ?? null} />
      </Link>
      <div className="p-6">
        <p className="eyebrow">Построенный объект</p>
        <h3 className="display mt-4 text-3xl">{item.title}</h3>
        <p className="muted mt-3 text-sm">{details || "Характеристики уточняются"}</p>
        <p className="muted mt-4 leading-6">{item.description}</p>
        <Link className="mt-5 inline-flex min-h-11 items-center font-extrabold text-[var(--forest)] underline underline-offset-4" href={`/portfolio/${item.slug}`}>Смотреть объект →</Link>
      </div>
    </article>
  );
}
