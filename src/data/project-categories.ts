import type { HouseProject } from "@/types/content";

export type ProjectCategory = {
  slug: "barnhauzy" | "odnoetazhnye" | "dvukhetazhnye" | "s-terrasoy" | "dlya-postoyannogo-prozhivaniya";
  title: string;
  description: string;
  matches: (project: HouseProject) => boolean;
};

function searchableProjectText(project: HouseProject) {
  return [project.name, project.description, project.architecturalStyle, project.intendedUse, ...Object.values(project.specifications)]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLocaleLowerCase("ru-RU");
}

export const projectCategories: readonly ProjectCategory[] = [
  { slug: "barnhauzy", title: "Барнхаусы", description: "Проекты каркасных домов в архитектуре барнхаус.", matches: (project) => searchableProjectText(project).includes("барнхаус") },
  { slug: "odnoetazhnye", title: "Одноэтажные дома", description: "Проекты одноэтажных каркасных домов.", matches: (project) => project.floors === 1 },
  { slug: "dvukhetazhnye", title: "Двухэтажные дома", description: "Проекты двухэтажных каркасных домов.", matches: (project) => project.floors === 2 },
  { slug: "s-terrasoy", title: "Дома с террасой", description: "Проекты каркасных домов с террасой.", matches: (project) => searchableProjectText(project).includes("террас") },
  { slug: "dlya-postoyannogo-prozhivaniya", title: "Дома для постоянного проживания", description: "Проекты каркасных домов для постоянного проживания.", matches: (project) => searchableProjectText(project).includes("постоян") },
];

export function getProjectCategory(slug: string) {
  return projectCategories.find((category) => category.slug === slug);
}

export function getCategoryProjects(category: ProjectCategory, projects: readonly HouseProject[]) {
  return projects.filter((project) => project.published && category.matches(project));
}

export function getActiveProjectCategories(projects: readonly HouseProject[]) {
  return projectCategories.filter((category) => getCategoryProjects(category, projects).length > 0);
}
