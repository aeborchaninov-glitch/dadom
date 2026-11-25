import Link from "next/link";
import type { HouseProject, PortfolioItem } from "@/types/content";

export function QuoteContext({ project, item, packageName, packageId, requested }: { project?: HouseProject; item?: PortfolioItem; packageName?: string; packageId?: string; requested: boolean }) {
  if (!requested) return null;
  return (
    <section className="card p-6 sm:p-8" aria-label="Выбранный объект">
      {project ? <><p className="eyebrow">Расчёт проекта</p><h2 className="display mt-4 text-3xl">{project.name}</h2>{packageName && <p className="mt-3 text-sm font-extrabold">Комплектация: {packageName}</p>}<p className="muted mt-3 text-sm">Проект выбран. Заявка ещё не отправлена.</p><input type="hidden" name="projectId" value={project.id} />{packageId && <input type="hidden" name="packageId" value={packageId} />}<Link className="mt-5 inline-flex min-h-11 items-center font-extrabold underline underline-offset-4" href={`/projects/${project.slug}`}>Вернуться к проекту →</Link></> : item ? <><p className="eyebrow">Хочу похожий дом</p><h2 className="display mt-4 text-3xl">{item.title}</h2><p className="muted mt-3">Объект выбран. Заявка ещё не отправлена.</p><input type="hidden" name="portfolioId" value={item.id} /><Link className="mt-5 inline-flex min-h-11 items-center font-extrabold underline underline-offset-4" href={`/portfolio/${item.slug}`}>Вернуться к объекту →</Link></> : <p>Выбранный проект или объект недоступен. <Link href="/projects" className="font-extrabold underline">Открыть каталог</Link>.</p>}
    </section>
  );
}
