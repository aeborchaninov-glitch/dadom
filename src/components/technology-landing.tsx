import Image from "next/image";
import { CallbackTrigger } from "./callback-trigger";
import { TechnologySolutions } from "./technology-solutions";

const advantages = [
  { icon: "wallet", title: "Разумная стоимость", text: "Лёгкая конструкция и рациональное использование материалов позволяют сократить затраты на строительство дома." },
  { icon: "timer", title: "Быстрое строительство", text: "Сборка каркаса не требует длительного ожидания усадки, как у сруба. Можно быстрее перейти к отделке и новоселью." },
  { icon: "thermometer", title: "Меньше затрат на отопление", text: "Эффективное утепление стен, пола и кровли помогает сохранять тепло зимой и снижать расходы на отопление." },
  { icon: "home", title: "Современная архитектура", text: "Панорамные окна, высокие потолки, просторные кухни-гостиные, второй свет и уютные террасы." },
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
  if (icon === "wallet") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="M5 9.5h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" /><path {...base} d="M5 9.5V7a2 2 0 0 1 2-2h16M22 17h5M22 17a2 2 0 1 0 0 4h5" /></svg>;
  if (icon === "timer") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...base} cx="16" cy="18" r="10" /><path {...base} d="M16 8V4M12 4h8M16 18l4-3M23 9l2-2" /></svg>;
  if (icon === "thermometer") return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="M14 6a3 3 0 0 1 6 0v12.4a6 6 0 1 1-6 0Z" /><path {...base} d="M17 11v10M17 24h.01" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...base} d="m4 15 12-10 12 10v12H19v-8h-6v8H4zM21 5v6" /></svg>;
}

export function TechnologyLanding() {
  return <div className="technology-page">
    <section className="technology-overview-hero">
      <Image src="/images/technology-frame-hero-v2.png" alt="Каркасный дом с открытой конструкцией в туманном хвойном лесу" fill priority sizes="100vw" className="technology-overview-hero__image object-cover object-center" />
      <div className="technology-overview-hero__veil" />
      <div className="wrap technology-overview-hero__content">
        <h1 className="display">Технология строительства каркасных домов</h1>
        <p>Современные материалы, продуманные конструктивные решения и тепло в любое время года. Рассказываем, как устроены каркасные дома и из чего складывается их комфорт.</p>
      </div>
    </section>

    <section className="technology-section"><div className="wrap">
      <div className="technology-section__heading"><h2 className="display">Почему выбирают каркасные дома</h2><p>Каркасная технология сочетает разумную стоимость строительства, короткие сроки, энергоэффективность и возможности современной архитектуры.</p></div>
      <div className="technology-advantages">{advantages.map((item) => <article key={item.title} className="technology-advantage"><div className="technology-advantage__icon"><AdvantageIcon icon={item.icon} /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </div></section>

    <section className="technology-section technology-section--paper"><div className="wrap">
      <div className="technology-section__heading"><h2 className="display">Конструктивные решения и материалы</h2><p>Ключевые части дома рассматриваются вместе: от основания и каркаса до инженерных систем и внутреннего пространства.</p></div>
      <TechnologySolutions />
    </div></section>

    <section className="technology-section"><div className="wrap">
      <div className="technology-climate">
        <div className="technology-climate__image">
          <Image src="/images/technology/winter-comfort-home.png" alt="Современный деревянный дом зимой в хвойном лесу" fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="technology-climate__copy"><p className="eyebrow">Уральский климат</p><h2 className="display">Тепло зимой. Комфорт летом.</h2><p>Даже когда за окном сильный мороз, дома хочется наслаждаться теплом и уютом. Современная каркасная технология позволяет создавать дома, предназначенные для постоянного проживания в условиях уральского климата.</p><p>Герметичные конструкции, энергоэффективные окна и грамотно организованная вентиляция обеспечивают комфортный микроклимат и помогают снизить расходы на отопление.</p><p>При проектировании дома учитываем климатические особенности Урала, снеговые и ветровые нагрузки.</p></div>
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
