import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const load = createRequire(import.meta.url);
const { technology, getTechnology, indexableTechnology, publishedTechnology } = load("../src/data/technology.ts");
const route = load("../src/app/technology/[slug]/page.tsx");

test("technology drafts stay in the source tree but out of public routes and sitemap", async () => {
  const expected = ["steny", "pol", "uteplenie", "krovlya", "teplyy-pol", "okna", "ventilyatsiya", "fasad", "karkas", "paroizolyatsiya", "perekrytiya", "fundament"];
  assert.deepEqual(technology.map((item) => item.slug), expected);
  assert.equal(publishedTechnology.length, 0);
  assert.equal(indexableTechnology.length, 0);
  for (const entry of technology) {
    assert.equal(entry.published, false);
    assert.equal(entry.indexable, false);
    assert.equal(entry.faq.length, 4);
    assert.ok(entry.keyPoints.length >= 4);
    assert.equal(getTechnology(entry.slug), undefined);
  }
  assert.deepEqual(route.generateStaticParams(), [{ slug: "__not-published" }]);
});