import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("О компании ДаДом", "Информация о строительной компании ДаДом и работе в Уральском регионе.", "/about", false);

export default function AboutPage() {
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">О компании</p><h1 className="display page-intro__title mt-5">О компании «ДаДом»</h1><p className="muted mt-5 max-w-2xl leading-8">Здесь будут опубликованы проверяемые сведения о команде, процессе строительства, реквизитах, документах, гарантийных условиях и отзывах.</p></div></section><section className="page-surface"><div className="wrap pt-10"><div className="empty-state grid place-items-center p-8 text-center"><p className="max-w-lg">Материалы о компании добавляются после подтверждения владельцем.</p></div></div></section></>;
}
