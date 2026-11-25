export type PriceStatus = "known" | "on-request" | "not-set";

export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isIllustration?: boolean;
};

export type Complectation = {
  id: string;
  name: string;
  description: string;
  includedWorks: string[];
  excludedWorks: string[];
};

export type HouseProject = {
  id: string;
  slug: string;
  name: string;
  description: string;
  area: number | null;
  dimensions: string | null;
  floors: number | null;
  bedrooms: number | null;
  rooms: number | null;
  intendedUse: string | null;
  architecturalStyle: string | null;
  price: number | null;
  priceStatus: PriceStatus;
  priceCurrency: "RUB";
  pricePackageId: string | null;
  priceUpdatedAt: string | null;
  heroImage: ImageAsset | null;
  gallery: ImageAsset[];
  floorPlans: ImageAsset[];
  specifications: Record<string, string | null>;
  packageIds: string[];
  includedWorks: string[];
  excludedWorks: string[];
  featured: boolean;
  published: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  area: number | null;
  location: string | null;
  completionYear: number | null;
  heroImage: ImageAsset | null;
  gallery: ImageAsset[];
  constructionPhotos: ImageAsset[];
  specifications: Record<string, string | null>;
  relatedProjectId: string | null;
  customerBrief: string | null;
  completedWorks: string[];
  featured: boolean;
  published: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};
