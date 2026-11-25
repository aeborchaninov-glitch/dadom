export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="section-heading__body">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display section-heading__title mt-4">{title}</h2>
      {text && <p className="section-heading__text muted mt-5 text-base leading-7">{text}</p>}
    </div>
  );
}
