import type { Complectation, HouseProject, PortfolioItem } from "@/types/content";
import { findPublished, validateContent } from "@/lib/catalog";

// Only verified records. A record with published:false is never exposed by selectors.
export const complectations: Complectation[] = [];
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
    .map(getComplectation).filter((p): p is Complectation => p !== null);
