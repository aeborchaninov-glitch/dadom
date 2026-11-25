import Link from "next/link";
import type { Complectation } from "@/types/content";

export function Specifications({ items }: { items: [string, string | null][] }) {
  return <dl className="spec-grid grid grid-cols-2 gap-3 sm:grid-cols-3">{items.map(([label, value]) => <div key={label}><dt className="muted text-xs font-bold">{label}</dt><dd className="mt-1 text-sm font-extrabold">{value?.trim() || "Уточняется"}</dd></div>)}</dl>;
}

export function Works({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="text-base font-extrabold">{title}</h3>{items.length ? <ul className="muted mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{items.map((work, index) => <li key={index}>{work}</li>)}</ul> : <p className="muted mt-3 text-sm">Перечень уточняется.</p>}</div>;
}

export function PackageCard({ item, projectSlug }: { item: Complectation; projectSlug?: string }) {
  return <article className="package-card card p-6"><h3 className="display text-3xl">{item.name}</h3><p className="muted mt-3 leading-7">{item.description}</p><div className={`mt-6 grid gap-6 ${item.excludedWorks.length ? "sm:grid-cols-2" : ""}`}><Works title="Включено" items={item.includedWorks} />{item.excludedWorks.length > 0 && <Works title="Не включено" items={item.excludedWorks} />}</div>{projectSlug && <Link className="button button--light mt-6" href={`/contacts?project=${encodeURIComponent(projectSlug)}&package=${encodeURIComponent(item.id)}`}>Выбрать комплектацию</Link>}</article>;
}
