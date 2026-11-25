import { pageMetadata } from "@/lib/seo";
import HomePage from "@/components/home-page";

export const metadata = pageMetadata(
  "Каркасные дома под ключ в Екатеринбурге — ДаДом",
  "Строительство современных каркасных домов в Екатеринбурге и Свердловской области. Проекты, планировки, комплектации и расчёт стоимости строительства.",
  "/",
  true,
);

export default function Page() {
  return <HomePage />;
}
