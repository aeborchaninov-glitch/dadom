import Link from "next/link";

export function EmptyState({ kind }: { kind: "projects" | "portfolio" }) {
  const isProjects = kind === "projects";
  return (
    <div className="empty-state grid place-items-center p-8 text-center sm:p-10">
      <div className="relative z-10">
        <span className="empty-state__icon" aria-hidden="true">{isProjects ? "⌂" : "◫"}</span>
        <p className="eyebrow mt-6">Раздел наполняется</p>
        <h2 className="display empty-state__title mt-4">{isProjects ? "Проекты готовятся к публикации" : "Портфолио появится здесь"}</h2>
        <p className="muted mx-auto mt-4 max-w-md text-sm leading-6">{isProjects ? "Добавим проекты с подтверждёнными характеристиками, планировками и условиями расчёта." : "Мы разместим только реальные объекты и материалы, на публикацию которых получено разрешение."}</p>
        <Link className="button button--light mt-7" href="/#request">Обсудить ваш дом</Link>
      </div>
    </div>
  );
}
