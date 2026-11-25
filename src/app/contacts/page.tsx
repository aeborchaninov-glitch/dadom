import { company } from "@/data/company";
import { getPortfolioItem, getProject, getProjectComplectations } from "@/data/content";
import { single, type Query } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { ContactDetails } from "@/components/contact-details";
import { QuoteContext } from "@/components/quote-context";

export const metadata = pageMetadata("Контакты", "Контакты компании ДаДом и обсуждение строительства каркасного дома в Екатеринбурге и на Урале.", "/contacts", Boolean(company.phone || company.email));
export const dynamic = "force-static";

export default async function ContactsPage({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const project = getProject(single(query.project));
  const item = getPortfolioItem(single(query.portfolio));
  const packageId = single(query.package);
  const selectedPackage = project ? getProjectComplectations(project).find((entry) => entry.id === packageId) ?? null : null;

  return (
    <>
      <section className="page-intro"><div className="wrap"><p className="eyebrow">Контакты</p><h1 className="display page-intro__title mt-5">Обсудить ваш дом</h1><p className="muted mt-5 max-w-2xl leading-8">{company.region}</p></div></section>
      <section className="page-surface"><div className="wrap max-w-4xl pt-10"><QuoteContext project={project} item={item} packageName={selectedPackage?.name} packageId={selectedPackage?.id} requested={Boolean(query.project || query.portfolio)} /><section className="card mt-8 grid gap-8 p-7 sm:p-10 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Связь</p><h2 className="display mt-5 text-4xl">Начнём с диалога</h2></div><div><ContactDetails /></div></section>{company.legalName && <p className="mt-8">{company.legalName}</p>}{company.requisites && <p className="muted mt-3 whitespace-pre-line">{company.requisites}</p>}{company.socialLinks.map((link) => <p key={link.href} className="mt-4"><a href={link.href} className="underline">{link.label}</a></p>)}</div></section>
    </>
  );
}
