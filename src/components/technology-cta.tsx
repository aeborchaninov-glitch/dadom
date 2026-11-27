import { CallbackTrigger } from "./callback-trigger";

export function TechnologyCta({ children }: { children: string }) {
  return <CallbackTrigger className="rounded-xl bg-[#C2593F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A84830]">{children}</CallbackTrigger>;
}