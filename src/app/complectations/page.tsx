import { complectations } from "@/data/content";
import { PackageCard } from "@/components/detail-blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Что входит в стоимость дома", "Состав комплектаций ДаДом: включённые работы и исключения из стоимости строительства.", "/complectations", complectations.length > 0);

export default function ComplectationsPage() {
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">Состав работ</p><h1 className="display page-intro__title mt-5">Что входит в стоимость дома</h1><p className="muted mt-5 max-w-2xl leading-7">Для каждой комплектации публикуются состав работ и позиции, которые рассчитываются отдельно.</p></div></section><section className="page-surface"><div className="wrap pt-10">{complectations.length ? <div className="grid gap-6">{complectations.map((item) => <PackageCard item={item} key={item.id} />)}</div> : <div className="empty-state grid place-items-center p-8 text-center"><p>Утверждённые комплектации готовятся к публикации.</p></div>}</div></section></>;
}
