import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { publishedTechnology } from "@/data/editorial";

export const metadata = pageMetadata("Технология каркасного дома", "Материалы о конструктиве, утеплении и защите каркасного дома от ДаДом.", "/technology", publishedTechnology.length > 0);

export default function TechnologyPage() {
  return <main className="page-surface"><section className="page-intro"><div className="wrap"><p className="eyebrow">Конструктив</p><h1 className="display page-intro__title mt-5">Технология каркасного дома</h1><p className="muted mt-5 max-w-2xl leading-8">Публикуем технические материалы только после проверки решений и спецификаций.</p></div></section><section className="wrap pt-10 pb-20">{publishedTechnology.length > 0 ? <div className="grid gap-5 md:grid-cols-2">{publishedTechnology.map((entry) => <Link key={entry.slug} href={`/technology/${entry.slug}`} className="catalog-bridge block"><p className="eyebrow">{entry.category}</p><h2 className="display mt-4 text-3xl">{entry.title}</h2><p className="muted mt-4 leading-7">{entry.description}</p></Link>)}</div> : <div className="catalog-bridge"><div><h2 className="display text-4xl">Материалы готовятся к публикации</h2><p className="muted mt-5 max-w-2xl leading-7">Не размещаем неподтверждённые характеристики, материалы и узлы. После технической проверки здесь появятся подробные материалы.</p></div><Link href="/contacts" className="button button--light">Обсудить дом</Link></div>}</section></main>;
}
