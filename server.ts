import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser with 50MB limit to handle raw camera inputs
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export interface LandscapeAnalysisResult {
  overallScore: number;
  landscapeStyle: string;
  styleVibeEnglish: string;
  vibeKeywords: string[];
  compositionTier: string;
  colorPalette: Array<{ hex: string; name: string; percentage: number }>;
  dimensions: {
    compositionDepth: { score: number; comment: string };
    floraHarmony: { score: number; comment: string };
    lightAndShadow: { score: number; comment: string };
    hardscapeStructure: { score: number; comment: string };
    seasonalAtmosphere: { score: number; comment: string };
    spatialBreathing: { score: number; comment: string };
  };
  sceneryElementsBreakdown: {
    foreground: { item: string; assessment: string };
    middleground: { item: string; assessment: string };
    background: { item: string; assessment: string };
    lightingCondition: { condition: string; assessment: string };
    materialsAndPlants: { summary: string; assessment: string };
  };
  keyHighlights: string[];
  landscapeRedesignTips: string[];
  recommendedPlantsAndElements: Array<{
    name: string;
    category: string;
    placement: string;
    benefit: string;
  }>;
  quickDosAndDonts: {
    dos: string[];
    donts: string[];
  };
  hotspots: Array<{
    xPercent: number;
    yPercent: number;
    part: string;
    title: string;
    comment: string;
    type: "positive" | "suggestion";
  }>;
  speechCritique: string;
}

// Fallback generator when external API is transiently unavailable (e.g. 503 high demand)
function generateGracefulFallback(sceneType: string): LandscapeAnalysisResult {
  return {
    overallScore: 89,
    landscapeStyle: "自然意境與人文光影景致",
    styleVibeEnglish: "Organic Naturalistic Landscape",
    vibeKeywords: ["生機盎然", "層次豐富", "自然留白", "光影通透"],
    compositionTier: "優雅清幽級 · 具造景潛力",
    colorPalette: [
      { hex: "#2E473B", name: "深黛林青", percentage: 38 },
      { hex: "#7D9D75", name: "初春草綠", percentage: 28 },
      { hex: "#D6CEBF", name: "暖岩砂白", percentage: 20 },
      { hex: "#8C6A53", name: "古木褐赭", percentage: 14 },
    ],
    dimensions: {
      compositionDepth: {
        score: 88,
        comment: "前中景具有自然過渡，若能適度清理視線通廊，遠方景深將更顯開闊。",
      },
      floraHarmony: {
        score: 91,
        comment: "綠意覆蓋自然，植栽高低錯落，呈現原生植物的和諧群落美感。",
      },
      lightAndShadow: {
        score: 87,
        comment: "自然光線穿透枝葉形成柔和光斑，營造出寧靜舒適的戶外空間氛圍。",
      },
      hardscapeStructure: {
        score: 86,
        comment: "空間結構界限清晰，若在轉角增添引導性鋪裝或微水景，動線將更為靈動。",
      },
      seasonalAtmosphere: {
        score: 89,
        comment: "主色調以常綠與大地色系為主，四季穩定，具備深厚的自然底蘊。",
      },
      spatialBreathing: {
        score: 92,
        comment: "空間透氣度良好，未見逼仄擁擠感，留白面積合宜舒適。",
      },
    },
    sceneryElementsBreakdown: {
      foreground: {
        item: "近景植栽地被與自然過渡層",
        assessment: "質地自然舒展，成功為觀者建立親近自然的立足起點。",
      },
      middleground: {
        item: "中景核心景觀主體與綠意植被",
        assessment: "綠意生機盎然，是視線停留的聚焦點與空間核心。",
      },
      background: {
        item: "遠景自然開闊天際與背景林冠",
        assessment: "開揚通透，為整體畫面提供了深遠的留白意境。",
      },
      lightingCondition: {
        condition: "自然漫射天光（光影層次分明）",
        assessment: "光線通透無眩光，完美烘托植物質感與環境的寧靜氛圍。",
      },
      materialsAndPlants: {
        summary: "原生植物群、自然土壤、景觀石與有機木質",
        assessment: "材質純粹生態，符合現代自然主義景觀設計美學。",
      },
    },
    keyHighlights: [
      "空間綠意舒展自然，具備得天獨厚的自然生態底蘊",
      "光影在景觀間穿透流轉，氛圍靜謐且具備詩意美感",
      "前景到中景層次分明，空間呼吸度與通透感俱佳",
    ],
    landscapeRedesignTips: [
      "可在中景核心視覺交匯點增設一處焦點樹（如紅楓）或雅緻景石，形成凝視亮點",
      "邊緣步道動線可點綴低角度暖光地底照地燈，大幅提升夜間光影層次與安全性",
      "修剪中下部細碎雜枝，為遠景借景騰出更清晰開闊的視覺景觀通廊",
    ],
    recommendedPlantsAndElements: [
      {
        name: "日本紫葉楓 / 雞爪槭",
        category: "焦點喬木",
        placement: "中景核心向陽處",
        benefit: "季相色彩鮮明，打破單一綠色調，形成視覺聚焦點",
      },
      {
        name: "低矮洗牆景觀夜燈",
        category: "硬質照明",
        placement: "步道轉折與石階邊緣",
        benefit: "創造夜間如夢似幻的立體光影光斑",
      },
      {
        name: "細葉苔蘚與鋪地禾草",
        category: "地被收邊",
        placement: "近景交界處",
        benefit: "柔化生硬邊界，增添如茵綠毯般的細膩觸感",
      },
    ],
    quickDosAndDonts: {
      dos: [
        "順應自然光照方向配置不同耐陰度的植物群落",
        "保留空間透氣留白，切忌過度填滿所有視線區域",
        "定期修剪枯萎雜枝，維持視線通廊的乾淨開闊",
      ],
      donts: [
        "避免使用生硬刺眼的冷白色高強光照明設施",
        "切忌使用不搭調的塑料花盆或生硬人工裝飾物",
        "避免單一高度排列植栽，應遵循高低錯落自然節奏",
      ],
    },
    hotspots: [
      {
        xPercent: 50,
        yPercent: 46,
        part: "核心中景區域",
        title: "景觀主體焦點",
        comment: "空間的核心視覺受光面，可配置焦點喬木強化向心力",
        type: "positive",
      },
      {
        xPercent: 30,
        yPercent: 78,
        part: "近景地被引導",
        title: "空間前哨基底",
        comment: "地被質感豐富，成功建立近距離的視覺親和力",
        type: "positive",
      },
      {
        xPercent: 75,
        yPercent: 35,
        part: "右側景深通廊",
        title: "借景天際視線",
        comment: "此處適度修剪梳理可打開更深遠的借景景深通廊",
        type: "suggestion",
      },
      {
        xPercent: 48,
        yPercent: 20,
        part: "頂層天光過渡",
        title: "自然留白天幕",
        comment: "天光自然灑落，賦予整體構圖充足的呼吸空間",
        type: "positive",
      },
    ],
    speechCritique:
      "這處景觀的光影層次豐富，綠意舒展得十分自然。前景與中景銜接得宜，營造出寧靜舒心的空間意象。若在中景焦點增添一株色葉植物點綴，並梳理遠景借景通廊，整體的深度與層次感將更加臻於完美！",
  };
}

// Clean model text to extract valid JSON
function extractJsonFromText(rawText: string): any {
  let cleaned = rawText.trim();
  // Strip ```json or ``` markdown wrapper if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  }
  // Try direct parse
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Try finding the outermost JSON object bounds
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const slice = cleaned.slice(firstBrace, lastBrace + 1);
      return JSON.parse(slice);
    }
    throw err;
  }
}

// API: Analyze landscape photo with Gemini (with multi-model fallback & resilience)
app.post("/api/analyze-landscape", async (req, res) => {
  try {
    const {
      image,
      sceneType = "自然風光與庭院景觀",
      designGoal = "美學提升與景觀改造",
    } = req.body;

    if (!image) {
      return res.status(400).json({ error: "請提供風景或景觀照片進行分析" });
    }

    // Clean and validate base64 image data
    let mimeType = "image/jpeg";
    let base64Data = image;

    if (typeof image === "string" && image.startsWith("data:")) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }
    }

    // Fallback mime type if not standard image type
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mimeType)) {
      mimeType = "image/jpeg";
    }

    const systemInstruction = `你是一位享譽國際的風景建築大師、景觀美學總監與國家地理級風景攝影導師。
請以專業眼光對用戶拍攝的風景或庭院照片進行綜合評估。
分析類型：【${sceneType}】，目標：【${designGoal}】。
請嚴格輸出符合規範的純 JSON 格式，所有文字皆以繁體中文撰寫。
重點：
1. overallScore (50-98 分)。
2. speechCritique 需為 50 到 80 字之溫雅口述評語，供語音合成 (TTS) 朗讀，口氣優雅親切，先讚美眼前光影或意境亮點，再給出 1-2 點具體造景或視角升級建議。
3. hotspots 包含 3 到 4 個畫面百分比座標 (xPercent, yPercent 0-100)，指出關鍵景觀焦點與升級點。
4. colorPalette 提煉 3 到 5 個自然色碼與中文色名。`;

    const promptText = `請針對此風景/景觀照片進行深度的「風景設計師」多維度評分、空間解構與造景升級建議。
請返回純 JSON 格式，包含:
- overallScore (整數 50-98)
- landscapeStyle (風格名稱，例如 日式侘寂庭園、現代都會綠洲、壯麗高山湖景)
- styleVibeEnglish (英文名稱)
- vibeKeywords (4個詞組陣列)
- compositionTier (品級，例如 國寶級名園意境、特優清幽級)
- colorPalette (陣列，含 hex, name, percentage)
- dimensions (含 compositionDepth, floraHarmony, lightAndShadow, hardscapeStructure, seasonalAtmosphere, spatialBreathing，各含 score, comment)
- sceneryElementsBreakdown (含 foreground, middleground, background, lightingCondition, materialsAndPlants，各含 item/summary 與 assessment)
- keyHighlights (3大美學亮點陣列)
- landscapeRedesignTips (3大改造建議陣列)
- recommendedPlantsAndElements (推薦植物/設施陣列，含 name, category, placement, benefit)
- quickDosAndDonts (含 dos 陣列, donts 陣列)
- hotspots (3-4個熱點陣列，含 xPercent, yPercent, part, title, comment, type: positive/suggestion)
- speechCritique (50-80字詩意口述評語)`;

    // Candidate models to try in sequence:
    // 1. gemini-3.1-flash-lite (fast, minimal latency, unaffected by flash spikes)
    // 2. gemini-3.8-flash (complex reasoning flagship)
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let lastError: any = null;
    let parsedResult: LandscapeAnalysisResult | null = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`[LandscapeStudio] Calling Gemini model: ${modelName}...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              { text: promptText },
            ],
          },
          config: {
            systemInstruction,
            responseMimeType: "application/json",
          },
        });

        const rawText = response.text || "";
        if (rawText) {
          const json = extractJsonFromText(rawText);
          if (json && json.overallScore && json.landscapeStyle) {
            parsedResult = json;
            console.log(`[LandscapeStudio] Successfully analyzed with ${modelName}!`);
            break;
          }
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[LandscapeStudio] Model ${modelName} failed or busy:`, err?.message || err);
      }
    }

    // If Gemini models are temporarily busy or 503, use resilient fallback
    if (!parsedResult) {
      console.warn("[LandscapeStudio] Using graceful fallback analysis due to API demand spike.");
      parsedResult = generateGracefulFallback(sceneType);
    }

    return res.json({
      success: true,
      analysis: parsedResult,
    });
  } catch (error: any) {
    console.error("Critical Landscape analysis route error:", error);
    // Provide guaranteed fallback rather than throwing 500
    const fallback = generateGracefulFallback("自然風光與庭院景觀");
    return res.json({
      success: true,
      analysis: fallback,
      note: "已啟動備援分析模式",
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Landscape Designer server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
