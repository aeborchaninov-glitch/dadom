"use client";
import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/types/content";

export function ContentImage({image,contain=false,priority=false,sizes="(max-width: 768px) 100vw, 50vw"}:{image:ImageAsset|null;contain?:boolean;priority?:boolean;sizes?:string}) {
  const [failed,setFailed]=useState<string|null>(null);
  if (!image?.src || failed===image.src) return <div className="grid-lines grid h-full min-h-32 place-items-center p-6 text-center text-sm text-[var(--forest)]" role="img" aria-label="Изображение пока недоступно">Изображение пока недоступно</div>;
  return <><Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} loading={priority ? "eager" : "lazy"} className={contain ? "object-contain" : "object-cover"} onError={()=>setFailed(image.src)}/>{image.isIllustration && <span className="absolute bottom-3 right-3 max-w-[85%] bg-[var(--paper)] px-3 py-2 text-xs text-[var(--forest)]">Визуализация</span>}</>;
}
