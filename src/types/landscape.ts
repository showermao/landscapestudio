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

export type CanvasThemeId = "zen-moss" | "earthy-linen" | "obsidian-modern";

export interface CanvasThemeConfig {
  id: CanvasThemeId;
  name: string;
  sub: string;
  bgColor: string;
  bgGradient: [string, string];
  cardBg: string;
  cardBorder: string;
  accent: string;
  accentSecondary: string;
  textPrimary: string;
  textSecondary: string;
  radarFill: string;
  radarStroke: string;
  hotspotPositive: string;
  hotspotSuggestion: string;
}

export interface PresetScenery {
  id: string;
  title: string;
  location: string;
  tag: string;
  imageUrl: string;
  analysis: LandscapeAnalysisResult;
}
