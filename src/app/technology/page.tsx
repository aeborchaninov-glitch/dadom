import { pageMetadata } from "@/lib/seo";
import { indexableTechnology } from "@/data/technology";
import { TechnologyLanding } from "@/components/technology-landing";

export const metadata = pageMetadata("Технология строительства каркасных домов", "Как устроен каркасный дом: конструктив, утепление, полы, кровля, окна и инженерные решения. ДаДом, Екатеринбург.", "/technology/", true);

export default function TechnologyPage() {
  return <TechnologyLanding topics={indexableTechnology} />;
}