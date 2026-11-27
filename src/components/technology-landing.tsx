import Image from "next/image";
import { CallbackTrigger } from "./callback-trigger";

const advantages = [
  { icon: "heat", title: "Энергоэффективность", text: "Тепловой контур продумывают как единую систему стен, пола, кровли, окон и вентиляции." },
  { icon: "speed", title: "Скорость строительства", text: "Каркасная технология позволяет последовательно вести работы и планировать следующий этап заранее." },
  { icon: "plan", title: "Свобода архитектуры", text: "Планировка, окна, террасы и внешний облик дома увязываются с конструкцией ещё на стадии проекта." },
  { icon: "home", title: "Комфорт проживания", text: "Продуманная конструкция помогает создать спокойное, светлое и удобное пространство для жизни круглый год." },
] as const;

const solutions = [
  { title: "Фундамент", image: "/images/editorial/construction.webp", alt: "Строительные работы на загородном доме", text: "Основание дома выбирают после изучения участка и проекта. Фундамент связывает рельеф, будущую нагрузку и конструкцию первого этажа." },
  { title: "Силовой каркас", image: "/images/editorial/timber-frame.webp", alt: "Деревянный каркас загородного дома", text: "Деревянный каркас задаёт геометрию и несущую схему дома. На этапе проектирования в нём учитывают планировку, проёмы и кровельное решение." },
  { title: "Стены и утепление", image: "/images/editorial/insulation.webp", alt: "Монтаж утепления в каркасной конструкции", text: "Стена объединяет каркас, утепляющий контур, защитные и отделочные слои. Их работа зависит от последовательности монтажа и грамотных примыканий." },
  { title: "Кровля и фасад", image: "/images/editorial/modern-house.webp", alt: "Современный загородный дом с фасадом и кровлей", text: "Кровля и фасад защищают дом от осадков и формируют его характер. Решения подбирают вместе с архитектурой, утеплением и условиями участка." },
  { title: "Окна и двери", image: "/images/editorial/panoramic-house.webp", alt: "Дом с панорамными окнами", text: "Оконные и дверные проёмы влияют на свет, вид из дома и комфорт. Их размещение согласовывают с конструкцией стен, фасадом и планировкой." },
  { title: "Инженерные системы", image: "/images/editorial/interior.webp", alt: "Светлый интерьер загородного дома", text: "Отопление, водоснабжение, электрика и вентиляция проектируются как часть общего сценария жизни в доме. Это позволяет заранее предусмотреть удобные решения для помещений." },
] as const;

const stages = [
  ["01", "Проектирование", "/images/editorial/terrace.webp", "Планировка, архитектура и конструктивная логика дома."],
  ["02", "Фундамент", "/images/editorial/construction.webp", "Подготовка основания с учётом участка и проекта."],
  ["03", "Сборка каркаса", "/images/editorial/timber-frame.webp", "Формирование несущей конструкции будущего дома."],
  ["04", "Тёплый контур", "/images/editorial/insulation.webp", "Стены, кровля, утепление, окна и защита от внешней среды."],
  ["05", "Инженерия и отделка", "/images/editorial/interior.webp", "Подготовка систем и пространства для повседневной жизни."],
  ["06", "Готовый дом", "/images/editorial/modern-house.webp", "Финальная проверка и дом, в который можно переезжать."],
] as const;

const questions = [
  ["Подходит ли каркасный дом для постоянного проживания?", "Да, при грамотном проектировании конструкций, утепляющего контура, отопления, вентиляции и режима эксплуатации. Решения всегда подбирают под конкретный дом и участок."],
  ["От чего зависит тепло в каркасном доме?", "На комфорт влияют согласованная работа стен, пола, кровли, окон, герметичность конструкций, отопление и вентиляция. Нельзя оценивать дом по одному элементу отдельно."],
  ["Можно ли строить каркасный дом на Урале?", "Да. При проектировании учитывают местный климат, снеговые и ветровые нагрузки, а также сценарий проживания семьи."],
  ["Когда нужно продумывать инженерные системы?", "На стадии проекта. Это помогает предусмотреть трассы коммуникаций, размещение оборудования и удобство дальнейшей эксплуатации."],
  ["Как выбрать подходящую комплектацию?", "Начните с назначения дома, участка и желаемого уровня готовности. Затем состав работ можно обсудить вместе с проектом и бюджетом."],
] as const;

function AdvantageIcon({ icon }: { icon: (typeof advantages)[number]["icon"] }) {
  const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "heat") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="M16 4v24M8.5 7.5c3 3.4 3 13.6 0 17M23.5 7.5c-3 3.4-3 13.6 0 17" /></svg>;
  if (icon === "speed") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="M18.5 3 7 17h8l-1.5 12L25 15h-8z" /></svg>;
  if (icon === "plan") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="M5 6h22v20H5zM11 6v8h8V6M5 20h8v6M20 18h7" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="m4 15 12-10 12 10v12H19v-8h-6v8H4z" /></svg>;
}

export function TechnologyLanding() {
  return <div className="technology-page">
    <section className="technology-overview-hero">
      <Image src="/images/technology-frame-hero-v2.png" alt="Каркасный дом с открытой конструкцией в туманном хвойном лесу" fill priority sizes="100vw" className="object-cover" />
      <div className="technology-overview-hero__veil" />
      <div className="wrap technology-overview-hero__content">
        <h1 className="display">Технология строительства каркасных домов</h1>
        <p>Современные материалы, продуманные конструктивные решения и тепло в любое время года. Рассказываем, как устроены каркасные дома и из чего складывается их комфорт.</p>
      </div>
    </section>

    <section className="technology-section"><div className="wrap">
      <div className="technology-section__heading"><h2 className="display">Почему каркасная технология</h2><p>Дом — это цельная система, в которой архитектура, конструктив и инженерия работают вместе.</p></div>
      <div className="technology-advantages">{advantages.map((item) => <article key={item.title} className="technology-advantage"><div className="technology-advantage__icon"><AdvantageIcon icon={item.icon} /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </div></section>

    <section className="technology-section technology-section--paper"><div className="wrap">
      <div className="technology-section__heading"><h2 className="display">Конструктивные решения и материалы</h2><p>Ключевые части дома рассматриваются вместе: от основания и каркаса до инженерных систем и внутреннего пространства.</p></div>
      <div className="technology-solutions">{solutions.map((item) => <article key={item.title} className="technology-solution"><div className="technology-solution__image"><Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div><div className="technology-solution__body"><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    </div></section>

    <section className="technology-section"><div className="wrap">
      <div className="technology-climate">
        <div className="technology-photo-request" role="img" aria-label="Для этого блока требуется утверждённая фотография современного деревянного дома зимой"><span>Нужно фото</span><strong>Современный деревянный дом зимой</strong><small>Горизонтальный кадр · 4:3 или 16:9</small></div>
        <div className="technology-climate__copy"><p className="eyebrow">Уральский климат</p><h2 className="display">Тепло зимой. Комфорт летом.</h2><p>Каркасный дом может стать полноценным жильём для круглогодичного проживания даже в условиях уральского климата. Комфорт внутри зависит от грамотного утепления стен, пола и кровли, герметичности конструкций, характеристик окон, отопления и вентиляции.</p><p>При проектировании необходимо учитывать особенности климата Екатеринбурга и Свердловской области, снеговые и ветровые нагрузки, а также назначение будущего дома.</p></div>
      </div>
    </div></section>

    <section className="technology-section technology-section--paper"><div className="wrap">
      <div className="technology-section__heading"><h2 className="display">Этапы строительства дома</h2><p>Понятная последовательность помогает видеть путь от идеи до готового дома.</p></div>
      <ol className="technology-stages">{stages.map(([number, title, image, text]) => <li key={number}><div className="technology-stages__image"><Image src={image} alt="" fill sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 100vw" className="object-cover" /></div><div><span>{number}</span><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
    </div></section>

    <section className="technology-section"><div className="wrap technology-faq">
      <div className="technology-section__heading"><h2 className="display">Частые вопросы о каркасных домах</h2></div>
      <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p className="muted pb-5 leading-7">{answer}</p></details>)}</div>
    </div></section>

    <section className="technology-section technology-section--last"><div className="wrap"><div className="technology-form-cta"><div><p className="eyebrow">Обсудим ваш проект</p><h2 className="display">Расскажите, каким вы видите будущий дом</h2><p>Поможем сориентироваться в конструктиве, формате строительства и следующих шагах.</p></div><CallbackTrigger className="technology-form-cta__button">Заказать звонок</CallbackTrigger></div></div></section>
  </div>;
}
