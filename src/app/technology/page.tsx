import { pageMetadata } from "@/lib/seo";
import { TechnologyLanding } from "@/components/technology-landing";

export const metadata = pageMetadata("Технология строительства каркасных домов в Екатеринбурге", "Как устроен каркасный дом: фундамент, деревянный каркас, стены, утепление, кровля и инженерные системы. Особенности строительства в климатических условиях Урала", "/technology/", true);

export default function TechnologyPage() {
  return <TechnologyLanding />;
}