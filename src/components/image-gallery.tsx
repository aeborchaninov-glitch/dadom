import type { ImageAsset } from "@/types/content";
import { ContentImage } from "./content-image";

export function ImageGallery({ images, label = "Галерея", plans = false, priorityFirst = false }: { images: ImageAsset[]; label?: string; plans?: boolean; priorityFirst?: boolean }) {
  if (!images.length) return <div className="empty-state grid min-h-52 place-items-center p-6 text-center text-sm text-[var(--forest)]">{label}: материалы готовятся к публикации.</div>;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {images.map((image, index) => (
        <figure key={image.src} className={index === 0 ? "min-w-0 sm:col-span-2" : "min-w-0"}>
          <div className={"gallery-frame relative overflow-hidden bg-[var(--mist)] " + (plans ? "aspect-[4/3]" : index === 0 ? "aspect-[16/10]" : "aspect-[4/3]")}>
            <ContentImage image={image} contain={plans} priority={priorityFirst && index === 0} sizes={index === 0 ? "(max-width: 1200px) 95vw, 1180px" : "(max-width: 768px) 95vw, 580px"} />
          </div>
          <figcaption className="muted mt-3 flex flex-wrap items-center justify-between gap-x-3 text-sm"><span>{image.alt}</span><a className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href={image.src} target="_blank" rel="noopener noreferrer">Открыть оригинал ↗</a></figcaption>
        </figure>
      ))}
    </div>
  );
}
