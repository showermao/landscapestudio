import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzePixels } from "./localAnalysis";

test("measures actual colors and marks semantic dimensions as unassessed", () => {
  const report = analyzePixels(new Uint8ClampedArray([0, 128, 0, 255, 0, 128, 0, 255]));
  assert.equal(report.colorPalette[0].hex, "#008000");
  assert.equal(report.colorPalette[0].percentage, 100);
  assert.equal(report.dimensions.floraHarmony.score, 100);
  assert.equal(report.dimensions.compositionDepth.score, 0);
  assert.deepEqual(report.hotspots, []);
  assert.deepEqual(report.recommendedPlantsAndElements, []);
});

test("brightness changes the report; a uniform image has no contrast", () => {
  const dark = analyzePixels([0, 0, 0, 255]);
  const middle = analyzePixels([128, 128, 128, 255]);
  assert.ok(middle.overallScore > dark.overallScore);
  assert.equal(middle.dimensions.floraHarmony.score, 0);
  assert.match(middle.keyHighlights[2], /對比指標 0\/100/);
});

test("ignores transparent pixels and rejects empty images", () => {
  const report = analyzePixels([255, 0, 0, 0, 0, 0, 255, 255]);
  assert.equal(report.colorPalette[0].hex, "#0000ff");
  assert.throws(() => analyzePixels([]), /可見像素/);
  assert.throws(() => analyzePixels([0, 0, 0, 0]), /可見像素/);
});
