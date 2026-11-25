import Link from "next/link";
import { company } from "@/data/company";
import { ContactDetails } from "./contact-details";

export function Footer() {
  return (
    <footer className="mt-10 rounded-t-[34px] bg-[var(--ink)] py-14 text-[var(--white)] sm:rounded-t-[52px]">
      <div className="wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="site-logo text-4xl font-extrabold">ДаДом<span className="site-logo__dot">.</span></Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#c9d3cc]">Каркасные дома для жизни на Урале. Проекты, планировки и прозрачный разговор о составе работ.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Навигация</p>
          <div className="grid gap-3 text-sm font-bold text-[#dce5dd]">
            <Link className="transition hover:text-[var(--sand)]" href="/projects">Проекты домов</Link>
            <Link className="transition hover:text-[var(--sand)]" href="/portfolio">Построенные дома</Link>
            <Link className="transition hover:text-[var(--sand)]" href="/complectations">Комплектации</Link>
            <Link className="transition hover:text-[var(--sand)]" href="/contacts">Контакты</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Регион работы</p>
          <p className="text-sm leading-6 text-[#dce5dd]">{company.region}</p>
          <div className="mt-5 text-[#dce5dd]"><ContactDetails /></div>
        </div>
      </div>
      <div className="wrap mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-[#aebcaf] sm:flex-row sm:justify-between">
        <span>© {company.name}</span>
        <span className="flex flex-wrap gap-4"><Link href="/privacy">Политика обработки данных</Link><Link href="/consent">Согласие</Link></span>
      </div>
    </footer>
  );
}
