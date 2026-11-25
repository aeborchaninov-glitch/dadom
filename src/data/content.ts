import type { Complectation, HouseProject, ImageAsset, PortfolioItem } from "@/types/content";
import { findPublished, validateContent } from "@/lib/catalog";

type ShowcaseComplectation = Complectation & { badge: string; image: ImageAsset };

// The homepage and the dedicated packages page intentionally use this one source.
export const complectations: ShowcaseComplectation[] = [
  {
    id: "warm-shell",
    name: "Теплый контур",
    badge: "Базовый старт",
    image: { src: "/images/warm-shell-frame.png", alt: "Теплый контур" },
    description: "Надёжная и защищённая основа для самостоятельного продолжения работ.",
    includedWorks: ["Свайно-винтовой или ЖБ фундамент", "Силовой каркас из доски камерной сушки", "Утепление контура 200 мм и пароизоляция", "Кровля, водосточная система и фасад", "Энергосберегающие окна и входная дверь"],
    excludedWorks: [],
  },
  {
    id: "white-box",
    name: "White Box",
    badge: "Предчистовая",
    image: { src: "/images/white-box-pines.png", alt: "White Box" },
    description: "Чистое, светлое пространство, полностью готовое к финальной отделке.",
    includedWorks: ["Всё из комплектации «Теплый контур»", "Скрытая разводка электрики и отопления", "Монтаж систем водоснабжения и канализации", "Полусухая стяжка пола под чистовое покрытие", "Обшивка стен и потолков гипсокартоном"],
    excludedWorks: [],
  },
  {
    id: "turnkey",
    name: "Под ключ",
    badge: "Популярный выбор",
    image: { src: "/images/turnkey-scandi-interior.png", alt: "Под ключ" },
    description: "Заезжайте и живите: интерьер, инженерия и комфорт уже предусмотрены.",
    includedWorks: ["Всё из комплектации «White Box»", "Чистовая отделка стен: имитация бруса или покраска", "Укладка ламината, керамогранита и плинтусов", "Установка межкомнатных дверей и откосов", "Монтаж сантехники, розеток и светильников"],
    excludedWorks: [],
  },
];

export const projects: HouseProject[] = [];
export const portfolio: PortfolioItem[] = [];

const errors = validateContent(projects, portfolio, complectations);
if (errors.length) throw new Error("Ошибки контента:\n" + errors.join("\n"));

export const publishedProjects = projects.filter(p => p.published);
export const publishedPortfolio = portfolio.filter(p => p.published);
export const getProject = (slug: string) => findPublished(projects, slug);
export const getProjectById = (id: string) => findPublished(projects, id, "id");
export const getPortfolioItem = (slug: string) => findPublished(portfolio, slug);
export const getComplectation = (id: string | null) => complectations.find(p => p.id === id) ?? null;
export const getProjectComplectations = (project: HouseProject) =>
  [...new Set([...project.packageIds, ...(project.pricePackageId ? [project.pricePackageId] : [])])]
    .map(getComplectation).filter((p): p is ShowcaseComplectation => p !== null);