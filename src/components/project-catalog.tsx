import Link from "next/link";
import type { Complectation, HouseProject } from "@/types/content";
import { priceDetails, queryProjects, single, type Query } from "@/lib/catalog";
import { EmptyState } from "./empty-state";
import { HouseCard } from "./house-card";
import { Pagination } from "./pagination";

export function ProjectCatalog({ projects, packages, query = {} }: { projects: HouseProject[]; packages: Complectation[]; query?: Query }) {
  const published = projects.filter((project) => project.published);
  if (!published.length) return <EmptyState kind="projects" />;

  const result = queryProjects(published, packages, query);
  const numbers = (key: "floors" | "bedrooms") => [...new Set(published.map((project) => project[key]).filter((value): value is number => value !== null))].sort((a, b) => a - b);
  const uses = [...new Set(published.map((project) => project.intendedUse).filter((value): value is string => Boolean(value)))];
  const priced = published.some((project) => priceDetails(project, packages).amount !== null);

  return (
    <>
      <form action="/projects" method="get" className="catalog-filters grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label>Площадь от, м²<input name="minArea" type="number" min="0" step="any" defaultValue={single(query.minArea)} /></label>
        <label>Площадь до, м²<input name="maxArea" type="number" min="0" step="any" defaultValue={single(query.maxArea)} /></label>
        <label>Этажей<select name="floors" defaultValue={single(query.floors)}><option value="">Любая этажность</option>{numbers("floors").map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label>Спален<select name="bedrooms" defaultValue={single(query.bedrooms)}><option value="">Любое количество</option>{numbers("bedrooms").map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        {priced && <label>Стоимость до, ₽<input name="maxPrice" type="number" min="0" defaultValue={single(query.maxPrice)} /></label>}
        {uses.length > 0 && <label>Назначение<select name="use" defaultValue={single(query.use)}><option value="">Любое назначение</option>{uses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>}
        <label>Сортировка<select name="sort" defaultValue={single(query.sort)}><option value="">Порядок каталога</option><option value="area-asc">Площадь: по возрастанию</option><option value="area-desc">Площадь: по убыванию</option>{priced && <><option value="price-asc">Цена: по возрастанию</option><option value="price-desc">Цена: по убыванию</option></>}</select></label>
        <div className="flex flex-wrap items-end gap-3"><button className="button" type="submit">Применить</button><Link href="/projects" className="inline-flex min-h-12 items-center px-2 text-sm font-extrabold underline underline-offset-4">Сбросить</Link></div>
      </form>
      <p className="muted my-7 text-sm font-bold" role="status">Найдено проектов: {result.total}</p>
      {result.total ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{result.items.map((project) => <HouseCard key={project.id} project={project} packages={packages} />)}</div> : (
        <div className="empty-state grid place-items-center p-8 text-center"><div><h2 className="display text-3xl">Подходящие проекты не найдены</h2><p className="muted mt-3">Попробуйте расширить диапазон или сбросить фильтры.</p></div></div>
      )}
      <Pagination path="/projects" page={result.page} pages={result.pages} query={query} />
    </>
  );
}
