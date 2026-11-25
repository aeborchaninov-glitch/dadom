export function siteSettings(rawUrl = "", approved = "") {
  let url: string | undefined;
  if (rawUrl) {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash) throw new Error("NEXT_PUBLIC_SITE_URL должен быть HTTPS-адресом домена без пути и параметров");
    url = parsed.origin;
  }
  return { url, indexable: Boolean(url && approved === "true") };
}
export const site = siteSettings(process.env.NEXT_PUBLIC_SITE_URL, process.env.SITE_INDEXABLE);
