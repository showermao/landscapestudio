import React, { useState } from "react";
import {
  Compass,
  TreePine,
  SunMedium,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { LandscapeAnalysisResult } from "../types/landscape";

interface Props {
  analysis: LandscapeAnalysisResult;
  onSimulateScene?: (sceneType: string) => void;
  isAnalyzing?: boolean;
}

export const LandscapeDetailTabs: React.FC<Props> = ({
  analysis,
  onSimulateScene,
  isAnalyzing,
}) => {
  const [activeTab, setActiveTab] = useState<
    "breakdown" | "dimensions" | "redesign" | "rules"
  >("redesign");

  const dimList = [
    {
      key: "compositionDepth",
      label: "構圖與視角深度",
      score: analysis.dimensions.compositionDepth.score,
      comment: analysis.dimensions.compositionDepth.comment,
      icon: Compass,
    },
    {
      key: "floraHarmony",
      label: "植栽配置與層次",
      score: analysis.dimensions.floraHarmony.score,
      comment: analysis.dimensions.floraHarmony.comment,
      icon: TreePine,
    },
    {
      key: "lightAndShadow",
      label: "光影流轉與氛圍",
      score: analysis.dimensions.lightAndShadow.score,
      comment: analysis.dimensions.lightAndShadow.comment,
      icon: SunMedium,
    },
    {
      key: "hardscapeStructure",
      label: "硬質景觀與動線",
      score: analysis.dimensions.hardscapeStructure.score,
      comment: analysis.dimensions.hardscapeStructure.comment,
      icon: Layers,
    },
    {
      key: "seasonalAtmosphere",
      label: "色彩調和與四季意境",
      score: analysis.dimensions.seasonalAtmosphere.score,
      comment: analysis.dimensions.seasonalAtmosphere.comment,
      icon: Sparkles,
    },
    {
      key: "spatialBreathing",
      label: "留白美學與借景藝術",
      score: analysis.dimensions.spatialBreathing.score,
      comment: analysis.dimensions.spatialBreathing.comment,
      icon: Leaf,
    },
  ];

  return (
    <div className="w-full bg-neutral-900/70 backdrop-blur-md rounded-2xl border border-neutral-800 p-5 flex flex-col gap-5">
      {/* Tab Navigation Controls */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800/80">
        <button
          onClick={() => setActiveTab("redesign")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "redesign"
              ? "bg-neutral-800 text-emerald-400 shadow-sm border border-neutral-700"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>大師造景升級案</span>
        </button>

        <button
          onClick={() => setActiveTab("dimensions")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "dimensions"
              ? "bg-neutral-800 text-emerald-400 shadow-sm border border-neutral-700"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>六大美學維度剖析</span>
        </button>

        <button
          onClick={() => setActiveTab("breakdown")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "breakdown"
              ? "bg-neutral-800 text-emerald-400 shadow-sm border border-neutral-700"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>空間景致層次解構</span>
        </button>

        <button
          onClick={() => setActiveTab("rules")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "rules"
              ? "bg-neutral-800 text-emerald-400 shadow-sm border border-neutral-700"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>造園美學守則 (Do&apos;s &amp; Don&apos;ts)</span>
        </button>
      </div>

      {/* Tab Content 1: Redesign & Plant Recommendations */}
      {activeTab === "redesign" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* 3 Major Landscape Advice */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              三大造景進階改造方針
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {analysis.landscapeRedesignTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950/60 border border-neutral-800/90 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50 mb-2.5">
                      STEP 0{idx + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Additions */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-200 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              推薦增設景觀植物與設施
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {analysis.recommendedPlantsAndElements.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/40 rounded border border-emerald-800/40">
                      {item.category}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {item.placement}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-100">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Dimensions */}
      {activeTab === "dimensions" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          {dimList.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-neutral-200">
                      {d.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {d.score} 分
                  </span>
                </div>

                {/* Score bar */}
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    style={{ width: `${d.score}%` }}
                  />
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  {d.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 3: Spatial Breakdown */}
      {activeTab === "breakdown" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-400 font-mono mb-2 block">
                FOREGROUND · 前景引領
              </span>
              <h4 className="text-sm font-semibold text-neutral-100 mb-1">
                {analysis.sceneryElementsBreakdown.foreground.item}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {analysis.sceneryElementsBreakdown.foreground.assessment}
              </p>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-400 font-mono mb-2 block">
                MIDDLEGROUND · 中景核心
              </span>
              <h4 className="text-sm font-semibold text-neutral-100 mb-1">
                {analysis.sceneryElementsBreakdown.middleground.item}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {analysis.sceneryElementsBreakdown.middleground.assessment}
              </p>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-4">
              <span className="text-xs font-semibold text-emerald-400 font-mono mb-2 block">
                BACKGROUND · 遠景借景
              </span>
              <h4 className="text-sm font-semibold text-neutral-100 mb-1">
                {analysis.sceneryElementsBreakdown.background.item}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {analysis.sceneryElementsBreakdown.background.assessment}
              </p>
            </div>
          </div>

          <div className="bg-neutral-950/50 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-neutral-400 font-medium">植栽與造園材質構成：</span>
              <p className="text-sm text-neutral-200 font-medium mt-0.5">
                {analysis.sceneryElementsBreakdown.materialsAndPlants.summary}
              </p>
            </div>
            <div className="text-xs text-neutral-400 max-w-md">
              {analysis.sceneryElementsBreakdown.materialsAndPlants.assessment}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Rules */}
      {activeTab === "rules" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {/* Do's */}
          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              造園良策 (DO&apos;S)
            </h4>
            <ul className="space-y-2.5">
              {analysis.quickDosAndDonts.dos.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-amber-400" />
              美學禁忌 (DON&apos;TS)
            </h4>
            <ul className="space-y-2.5">
              {analysis.quickDosAndDonts.donts.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="text-amber-400 font-bold mt-0.5">✕</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Occasion / Re-Simulation Quick Bar */}
      {onSimulateScene && (
        <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>切換情境重新評測美學：</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              "日式侘寂禪意庭園",
              "都會空中綠洲露台",
              "壯闊自然山水地景",
              "歐式浪漫鄉村花園",
            ].map((scene) => (
              <button
                key={scene}
                onClick={() => onSimulateScene(scene)}
                disabled={isAnalyzing}
                className="px-2.5 py-1 text-xs text-neutral-300 hover:text-emerald-300 bg-neutral-950 hover:bg-neutral-800 rounded-md border border-neutral-800 transition disabled:opacity-50"
              >
                {scene}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
