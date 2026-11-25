import { pageMetadata } from "@/lib/seo";
import { publishedArticles } from "@/data/editorial";

export const metadata = pageMetadata("Полезные статьи", "Материалы о выборе проекта, строительстве и эксплуатации дома на Урале.", "/articles", publishedArticles.length > 0);

export default function ArticlesPage() {
  return <><section className="page-intro"><div className="wrap"><p className="eyebrow">База знаний</p><h1 className="display page-intro__title mt-5">Полезные статьи</h1><p className="muted mt-5 max-w-2xl leading-8">Проверенные материалы о выборе проекта, строительстве и эксплуатации дома.</p></div></section><section className="page-surface"><div className="wrap pt-10"><div className="empty-state grid place-items-center p-8 text-center"><p className="max-w-lg">Материалы готовятся к публикации после проверки содержания владельцем и профильным специалистом.</p></div></div></section></>;
}
