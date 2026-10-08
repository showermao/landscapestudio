import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Camera,
  Upload,
  Sparkles,
  TreePine,
  Layers,
  Volume2,
  Compass,
  CheckCircle,
  RefreshCw,
  Eye,
  ChevronRight,
  Info,
} from "lucide-react";
import { LandscapeAnalysisResult, PresetScenery } from "./types/landscape";
import { PRESET_SCENERIES } from "./utils/presetSceneries";
import { LandscapeCanvasDashboard } from "./components/LandscapeCanvasDashboard";
import { VoiceCriticPlayer } from "./components/VoiceCriticPlayer";
import { LandscapeDetailTabs } from "./components/LandscapeDetailTabs";
import { CameraCaptureModal } from "./components/CameraCaptureModal";

export default function App() {
  // Current active scenery & analysis
  const [currentScenery, setCurrentScenery] = useState<PresetScenery>(
    PRESET_SCENERIES[0]
  );
  const [currentImage, setCurrentImage] = useState<string>(
    PRESET_SCENERIES[0].imageUrl
  );
  const [analysisResult, setAnalysisResult] = useState<LandscapeAnalysisResult>(
    PRESET_SCENERIES[0].analysis
  );

  // UI States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [selectedHotspotIndex, setSelectedHotspotIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Trigger celebratory confetti for top scores
  useEffect(() => {
    if (analysisResult && analysisResult.overallScore >= 90) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#52B788", "#74C69D", "#E9C46A", "#D4B483"],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [analysisResult]);

  // Handle Photo Analysis via backend API
  const analyzePhoto = async (
    base64Data: string,
    sceneType = "自然風光與庭院景觀"
  ) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setCurrentImage(base64Data);

    try {
      const response = await fetch("/api/analyze-landscape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Data,
          sceneType,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "分析請求失敗");
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.warn("Analysis error, falling back gracefully:", err);
      setAnalysisError(
        err?.message || "風景分析連線發生問題，請檢查網路或稍候重試"
      );
      // Fall back to closest preset if needed
      setAnalysisResult(PRESET_SCENERIES[0].analysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle preset select
  const handleSelectPreset = (preset: PresetScenery) => {
    setCurrentScenery(preset);
    setCurrentImage(preset.imageUrl);
    setAnalysisResult(preset.analysis);
    setAnalysisError(null);
  };

  // Helper to optimize and compress high-res uploaded photos
  const optimizeImage = (file: File, maxDim = 1600, quality = 0.88): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) {
          resolve("");
          return;
        }
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(rawUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Handle local file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimizedDataUrl = await optimizeImage(file);
      if (optimizedDataUrl) {
        analyzePhoto(optimizedDataUrl);
      }
    } catch (err) {
      console.warn("Image reading error:", err);
    } finally {
      // Clear input so same file can be re-selected if desired
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans-body">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-neutral-100">
                  AI 風景設計師
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50 font-mono">
                  LANDSCAPE STUDIO
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                拍照即評 · 圖文並茂 Canvas 儀表板 · 智能語音造園顧問
              </p>
            </div>
          </div>

          {/* Action CTAs: Camera & Upload */}
          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl border border-neutral-800 transition"
              title="從本機或相簿上傳風景照片"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>上傳風景照</span>
            </button>

            <button
              onClick={() => setIsCameraOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md shadow-emerald-950/40 transition active:scale-95"
              title="啟動鏡頭現場拍攝風景"
            >
              <Camera className="w-4 h-4" />
              <span>拍攝新風景</span>
            </button>
          </div>
        </div>
      </header>

      {/* Preset Scenery Selector Ribbon */}
      <section className="w-full bg-neutral-900/50 border-b border-neutral-800/60 px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 shrink-0 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>精選範例探索：</span>
          </div>

          <div className="flex items-center gap-2">
            {PRESET_SCENERIES.map((preset) => {
              const isActive = currentScenery.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                    isActive
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm"
                      : "bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80"
                  }`}
                >
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{preset.title}</span>
                  <span className="text-[10px] text-neutral-400">
                    ({preset.analysis.overallScore}分)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
        {/* Error Alert if any */}
        {analysisError && (
          <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-xl flex items-center justify-between text-xs text-amber-200">
            <span>{analysisError}</span>
            <button
              onClick={() => setAnalysisError(null)}
              className="text-amber-400 hover:text-amber-200 underline"
            >
              略過
            </button>
          </div>
        )}

        {/* Loading overlay during analysis */}
        {isAnalyzing && (
          <div className="w-full bg-neutral-900/90 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin" />
            <div>
              <h3 className="text-base font-bold text-neutral-100">
                景觀美學大師正在審視眼前風景...
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                正在進行三維空間縱深透視、六大美學維度解構、自然色譜提煉與語音評語撰擬
              </p>
            </div>
          </div>
        )}

        {/* VOICE CRITIC PLAYER SECTION ("並簡要的以語音說出評語") */}
        <VoiceCriticPlayer
          text={analysisResult.speechCritique}
          autoPlay={false}
          architectName="景觀建築大師 · 首席美學評委"
        />

        {/* CENTERPIECE: CANVAS DASHBOARD ("以圖文並茂的儀表板呈現於 Canvas") */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-bold text-neutral-200 tracking-wide">
                圖文並茂景觀儀表板 · HTML5 CANVAS PRESENTATION
              </h2>
            </div>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              支援高解析匯出、複製圖檔與滑鼠熱點即時互動
            </span>
          </div>

          <LandscapeCanvasDashboard
            analysis={analysisResult}
            imageUrl={currentImage}
            onSelectHotspot={(idx) => setSelectedHotspotIndex(idx)}
          />
        </div>

        {/* INTERACTIVE DETAIL TABS & REDESIGN ADVICE */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-sm font-bold text-neutral-200 tracking-wide">
              造景改造策略與維度剖析 · ARCHITECTURAL STRATEGY
            </h2>
          </div>

          <LandscapeDetailTabs
            analysis={analysisResult}
            isAnalyzing={isAnalyzing}
            onSimulateScene={(scene) => analyzePhoto(currentImage, scene)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-6 px-4 sm:px-8 mt-12 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-neutral-300">
              AI 風景設計師 · LandscapeStudio
            </span>
            <span>· 景觀美學大師在線顧問</span>
          </div>
          <div>
            <span>即時 Canvas 渲染 · 智慧空間分析 · Web Speech 語音合成</span>
          </div>
        </div>
      </footer>

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(base64) => analyzePhoto(base64)}
      />
    </div>
  );
}
