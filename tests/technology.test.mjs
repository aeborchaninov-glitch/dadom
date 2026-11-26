import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const load = createRequire(import.meta.url);
const { technology, getTechnology, indexableTechnology, publishedTechnology } = load("../src/data/technology.ts");
const route = load("../src/app/technology/[slug]/page.tsx");

test("technology section exposes approved topics from one indexable data source", async () => {
  const expected = ["steny", "pol", "uteplenie", "krovlya", "teplyy-pol", "okna", "ventilyatsiya", "fasad", "karkas", "paroizolyatsiya", "perekrytiya", "fundament"];
  assert.deepEqual(technology.map((item) => item.slug), expected);
  assert.equal(publishedTechnology.length, 12);
  assert.equal(indexableTechnology.length, 12);
  for (const entry of technology) {
    assert.equal(entry.published, true);
    assert.equal(entry.indexable, true);
    assert.equal(entry.faq.length, 4);
    assert.ok(entry.keyPoints.length >= 4);
    assert.equal(getTechnology(entry.slug), entry);
  }
  assert.deepEqual(route.generateStaticParams(), expected.map((slug) => ({ slug })));
  const metadata = await route.generateMetadata({ params: Promise.resolve({ slug: "steny" }) });
  assert.equal(metadata.title, "Стены каркасного дома в Екатеринбурге | Технология строительства");
  assert.equal(metadata.description, technology[0].seoDescription);
});