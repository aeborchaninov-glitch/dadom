import { CallbackTrigger } from "./callback-trigger";

export function TechnologyCta({ children }: { children: string }) {
  return <CallbackTrigger className="button button--wood">{children}</CallbackTrigger>;
}