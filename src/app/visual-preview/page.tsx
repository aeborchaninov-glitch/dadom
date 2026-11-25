import Link from "next/link";
import { HouseCard } from "@/components/house-card";
import { visualPackages, visualProjects } from "@/data/visual-fixtures";
import { site } from "@/lib/site";
import { notFound } from "next/navigation";

export const metadata = { title: "Визуальная проверка", robots: { index: false, follow: false } };

export default function VisualPreviewPage() {
  if (site.indexable) notFound();
  const detailHref = `/visual-preview/${visualProjects[0].slug}`;
  return <main className="page-surface"><div className="wrap pt-10"><p className="eyebrow">Только для проверки интерфейса</p><h1 className="display mt-5 text-5xl">Демонстрационный каталог</h1><p className="muted mt-5 max-w-2xl">Тестовые данные не входят в каталог, sitemap и поисковую выдачу. Они не являются предложением «ДаДом».</p><div className="mt-9 grid max-w-md gap-5"><HouseCard project={visualProjects[0]} packages={visualPackages} detailHref={detailHref} quoteHref={detailHref} /></div><Link className="button button--light mt-7" href={detailHref}>Открыть подробную страницу</Link></div></main>;
}
