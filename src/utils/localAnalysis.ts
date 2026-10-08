import type { LandscapeAnalysisResult } from "../types/landscape";

// These measurements describe pixels, not objects, plant species or spatial depth.
export function analyzePixels(pixels: ArrayLike<number>): LandscapeAnalysisResult {
  let count = 0, sum = 0, square = 0, green = 0, clipped = 0;
  const bins = new Map<string, { count: number; r: number; g: number; b: number }>();
  for (let i = 0; i + 3 < pixels.length; i += 4) {
    if (pixels[i + 3] < 128) continue;
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const light = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    count++; sum += light; square += light * light;
    if (g > r * 1.1 && g > b * 1.1 && g > 40) green++;
    if (light < 0.05 || light > 0.95) clipped++;
    const key = `${r >> 6},${g >> 6},${b >> 6}`;
    const bin = bins.get(key) || { count: 0, r: 0, g: 0, b: 0 };
    bin.count++; bin.r += r; bin.g += g; bin.b += b; bins.set(key, bin);
  }
  if (!count) throw new Error("照片沒有可分析的可見像素，請選擇其他圖片。");
  const brightness = sum / count;
  const contrast = Math.sqrt(Math.max(0, square / count - brightness * brightness));
  const greenPercent = Math.round(green / count * 100);
  const exposureScore = Math.round(Math.max(0, 100 - Math.abs(brightness - 0.5) * 120 - clipped / count * 40));
  const contrastScore = Math.round(Math.min(100, contrast * 400));
  const lightComment = `平均亮度 ${Math.round(brightness * 100)}%，極暗或極亮像素 ${Math.round(clipped / count * 100)}%。`;
  const greenComment = `綠色像素約 ${greenPercent}%；可能包含綠色物件，不能據此辨識植物。`;
  const unknown = { score: 0, comment: "未評估：基礎像素分析無法判定此項，0 表示未評估。" };
  const palette = [...bins.values()].sort((a, b) => b.count - a.count).slice(0, 4).map((bin, i) => ({
    hex: "#" + [bin.r, bin.g, bin.b].map(v => Math.round(v / bin.count).toString(16).padStart(2, "0")).join(""),
    name: `主要色彩 ${i + 1}`,
    percentage: Math.round(bin.count / count * 100),
  }));
  const tips = [
    brightness < 0.35 ? "畫面偏暗，可提高曝光或選擇光線較充足的時段拍攝。" : brightness > 0.75 ? "畫面偏亮，可降低曝光，保留亮部細節。" : "平均亮度適中，可比較不同時段的光線效果。",
    contrast < 0.12 ? "明暗變化較小，可嘗試側光或調整拍攝角度。" : "畫面有明暗變化，可留意主體是否仍然清楚。",
    "造景前請確認現場日照、土壤、排水及動線；本工具無法從像素推斷這些條件。",
  ];
  return {
    overallScore: Math.round((exposureScore + contrastScore) / 2),
    landscapeStyle: "免費基礎影像分析",
    styleVibeEnglish: "Local Image Measurements",
    vibeKeywords: ["本機分析", `綠色比例 ${greenPercent}%`, "無 API 費用"],
    compositionTier: "影像指標參考分 · 非景觀美學評分",
    colorPalette: palette,
    dimensions: {
      compositionDepth: { ...unknown }, floraHarmony: { score: greenPercent, comment: greenComment },
      lightAndShadow: { score: exposureScore, comment: lightComment }, hardscapeStructure: { ...unknown },
      seasonalAtmosphere: { ...unknown }, spatialBreathing: { ...unknown },
    },
    sceneryElementsBreakdown: {
      foreground: { item: "前景未辨識", assessment: "請自行觀察前景是否遮擋主要視線。" },
      middleground: { item: "中景未辨識", assessment: "請自行確認主體、通路與植栽位置。" },
      background: { item: "背景未辨識", assessment: "本工具不推測照片的空間深度。" },
      lightingCondition: { condition: "影像亮度統計", assessment: lightComment },
      materialsAndPlants: { summary: "綠色像素統計", assessment: greenComment },
    },
    keyHighlights: [lightComment, greenComment, `明暗標準差 ${Math.round(contrast * 100)}%；對比指標 ${contrastScore}/100。`],
    landscapeRedesignTips: tips,
    recommendedPlantsAndElements: [],
    quickDosAndDonts: { dos: ["比較不同拍攝角度與光線", "先查明現場種植條件"], donts: ["把綠色像素當成植物辨識結果", "以參考分代替專業現場評估"] },
    hotspots: [],
    speechCritique: `這是免費基礎影像分析。${lightComment}${greenComment}${tips[0]}評分僅供影像參考，未辨識植物或景觀結構。`,
  };
}

export async function analyzeLocalPhoto(source: string): Promise<LandscapeAnalysisResult> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("無法讀取照片，請使用 JPG、PNG 或 WebP 圖片。"));
    img.src = source;
  });
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 256 / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("瀏覽器不支援影像分析。");
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  return analyzePixels(context.getImageData(0, 0, canvas.width, canvas.height).data);
}
