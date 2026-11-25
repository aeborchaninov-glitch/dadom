import type { Complectation, HouseProject } from "@/types/content";
import { priceDetails } from "@/lib/catalog";

export function ProjectPrice({ project, packages, large = false }: { project: HouseProject; packages: readonly Complectation[]; large?: boolean }) {
  const price = priceDetails(project, packages);
  return <div><p className={large ? "display text-4xl text-[var(--forest)]" : "text-lg font-extrabold text-[var(--forest)]"}>{price.label}</p>{price.package && <p className="muted mt-2 text-sm">Комплектация «{price.package.name}»</p>}{large && price.amount !== null && project.priceUpdatedAt && <p className="muted mt-2 text-xs">Цена обновлена: {project.priceUpdatedAt}</p>}</div>;
}
