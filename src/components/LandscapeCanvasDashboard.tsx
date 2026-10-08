import React, { useEffect, useRef, useState, useCallback } from "react";
import { Download, Copy, Check, Eye, Palette, Sparkles, RefreshCw, ZoomIn, Layers } from "lucide-react";
import { LandscapeAnalysisResult, CanvasThemeId, CanvasThemeConfig } from "../types/landscape";

interface Props {
  analysis: LandscapeAnalysisResult;
  imageUrl: string;
  onSelectHotspot?: (hotspotIndex: number) => void;
}

const THEMES: Record<CanvasThemeId, CanvasThemeConfig> = {
  "zen-moss": {
    id: "zen-moss",
    name: "苔原幽境",
    sub: "Zen Moss & Forest",
    bgColor: "#0c1511",
    bgGradient: ["#09120e", "#102019"],
    cardBg: "rgba(18, 36, 28, 0.75)",
    cardBorder: "rgba(82, 183, 136, 0.25)",
    accent: "#52B788",
    accentSecondary: "#74C69D",
    textPrimary: "#F4F7F5",
    textSecondary: "#A3B899",
    radarFill: "rgba(82, 183, 136, 0.28)",
    radarStroke: "#52B788",
    hotspotPositive: "#52B788",
    hotspotSuggestion: "#E9C46A",
  },
  "earthy-linen": {
    id: "earthy-linen",
    name: "大地陶然",
    sub: "Warm Terracotta & Stone",
    bgColor: "#1a1614",
    bgGradient: ["#14110f", "#241d19"],
    cardBg: "rgba(42, 33, 28, 0.75)",
    cardBorder: "rgba(199, 125, 87, 0.3)",
    accent: "#E07A5F",
    accentSecondary: "#F2CC8F",
    textPrimary: "#F8F5F0",
    textSecondary: "#C9ADA7",
    radarFill: "rgba(224, 122, 95, 0.28)",
    radarStroke: "#E07A5F",
    hotspotPositive: "#81B29A",
    hotspotSuggestion: "#F2CC8F",
  },
  "obsidian-modern": {
    id: "obsidian-modern",
    name: "曜黑當代",
    sub: "Modern Obsidian HUD",
    bgColor: "#090d13",
    bgGradient: ["#06080c", "#0f1622"],
    cardBg: "rgba(18, 25, 38, 0.8)",
    cardBorder: "rgba(56, 189, 248, 0.25)",
    accent: "#38BDF8",
    accentSecondary: "#818CF8",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    radarFill: "rgba(56, 189, 248, 0.25)",
    radarStroke: "#38BDF8",
    hotspotPositive: "#34D399",
    hotspotSuggestion: "#FBBF24",
  },
};

export const LandscapeCanvasDashboard: React.FC<Props> = ({
  analysis,
  imageUrl,
  onSelectHotspot,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTheme, setCurrentTheme] = useState<CanvasThemeId>("zen-moss");
  const [hoveredHotspotIndex, setHoveredHotspotIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  // Toggle layers
  const [showHotspots, setShowHotspots] = useState(true);
  const [showRadar, setShowRadar] = useState(true);
  const [showPalette, setShowPalette] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showSeal, setShowSeal] = useState(true);

  // Native Canvas resolution
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 1680;

  // Preload image
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      loadedImageRef.current = img;
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback
      setImageLoaded(true);
    };
  }, [imageUrl]);

  // Main Canvas Rendering Function
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = THEMES[currentTheme];
    const width = CANVAS_WIDTH;
    const height = CANVAS_HEIGHT;

    // Clear & background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, theme.bgGradient[0]);
    bgGrad.addColorStop(1, theme.bgGradient[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle background organic grid/geometry
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 40; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 40; y < height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer frame border
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Corner decorative brackets
    const drawBracket = (x: number, y: number, dirX: number, dirY: number) => {
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + dirX * 24, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dirY * 24);
      ctx.stroke();
    };
    drawBracket(28, 28, 1, 1);
    drawBracket(width - 28, 28, -1, 1);
    drawBracket(28, height - 28, 1, -1);
    drawBracket(width - 28, height - 28, -1, -1);

    // ==========================================
    // 1. TOP HEADER SECTION (MAGAZINE STYLE)
    // ==========================================
    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 13px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText("LANDSCAPE ARCHITECTURAL ATELIER · 景觀美學評鑑報告", 60, 72);

    ctx.font = "400 12px 'Plus Jakarta Sans', monospace";
    ctx.letterSpacing = "1px";
    const today = new Date().toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    ctx.textAlign = "right";
    ctx.fillText(`DOSSIER NO. #LS-${Math.floor(analysis.overallScore * 87)} · ${today}`, width - 60, 72);
    ctx.textAlign = "left";

    // Main Title
    ctx.fillStyle = theme.textPrimary;
    ctx.font = "700 36px 'Noto Sans TC', 'Cinzel', serif";
    ctx.letterSpacing = "1px";
    ctx.fillText(analysis.landscapeStyle, 60, 120);

    // Subtitle & Vibe
    ctx.fillStyle = theme.accent;
    ctx.font = "500 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`${analysis.styleVibeEnglish}  ·  ${analysis.compositionTier}`, 60, 148);

    // Subtle hairline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.moveTo(60, 168);
    ctx.lineTo(width - 60, 168);
    ctx.stroke();

    // ==========================================
    // 2. MAIN SCENERY PHOTO FRAME
    // ==========================================
    const photoX = 60;
    const photoY = 190;
    const photoW = 680;
    const photoH = 500;

    // Photo shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = "#151515";
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.shadowColor = "transparent";

    // Draw user photo or fallback
    if (loadedImageRef.current) {
      const img = loadedImageRef.current;
      // Object cover calculation
      const imgRatio = img.width / img.height;
      const targetRatio = photoW / photoH;
      let sx = 0,
        sy = 0,
        sWidth = img.width,
        sHeight = img.height;

      if (imgRatio > targetRatio) {
        sWidth = img.height * targetRatio;
        sx = (img.width - sWidth) / 2;
      } else {
        sHeight = img.width / targetRatio;
        sy = (img.height - sHeight) / 2;
      }

      ctx.save();
      // Rounded photo clip
      const r = 10;
      ctx.beginPath();
      ctx.moveTo(photoX + r, photoY);
      ctx.arcTo(photoX + photoW, photoY, photoX + photoW, photoY + photoH, r);
      ctx.arcTo(photoX + photoW, photoY + photoH, photoX, photoY + photoH, r);
      ctx.arcTo(photoX, photoY + photoH, photoX, photoY, r);
      ctx.arcTo(photoX, photoY, photoX + photoW, photoY, r);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, sx, sy, sWidth, sHeight, photoX, photoY, photoW, photoH);

      // Subtle vignette
      const vignette = ctx.createRadialGradient(
        photoX + photoW / 2,
        photoY + photoH / 2,
        photoW * 0.3,
        photoX + photoW / 2,
        photoY + photoH / 2,
        photoW * 0.7
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vignette;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      // Grid Lines overlay if enabled
      if (showGrid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 6]);
        // 1/3 and 2/3 verticals
        ctx.beginPath();
        ctx.moveTo(photoX + photoW / 3, photoY);
        ctx.lineTo(photoX + photoW / 3, photoY + photoH);
        ctx.moveTo(photoX + (photoW * 2) / 3, photoY);
        ctx.lineTo(photoX + (photoW * 2) / 3, photoY + photoH);
        // 1/3 and 2/3 horizontals
        ctx.moveTo(photoX, photoY + photoH / 3);
        ctx.lineTo(photoX + photoW, photoY + photoH / 3);
        ctx.moveTo(photoX, photoY + (photoH * 2) / 3);
        ctx.lineTo(photoX + photoW, photoY + (photoH * 2) / 3);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Hotspots on photo
      if (showHotspots && analysis.hotspots) {
        analysis.hotspots.forEach((spot, idx) => {
          const spotX = photoX + (spot.xPercent / 100) * photoW;
          const spotY = photoY + (spot.yPercent / 100) * photoH;
          const isHovered = hoveredHotspotIndex === idx;

          const spotColor =
            spot.type === "positive" ? theme.hotspotPositive : theme.hotspotSuggestion;

          // Pulse glow
          ctx.beginPath();
          ctx.arc(spotX, spotY, isHovered ? 18 : 12, 0, Math.PI * 2);
          ctx.fillStyle =
            spot.type === "positive"
              ? "rgba(82, 183, 136, 0.35)"
              : "rgba(233, 196, 106, 0.35)";
          ctx.fill();

          // Outer ring
          ctx.beginPath();
          ctx.arc(spotX, spotY, isHovered ? 12 : 8, 0, Math.PI * 2);
          ctx.strokeStyle = spotColor;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Center solid dot
          ctx.beginPath();
          ctx.arc(spotX, spotY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();

          // Tooltip callout badge on photo
          const label = `${idx + 1}. ${spot.title}`;
          ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
          const textWidth = ctx.measureText(label).width;
          const badgeW = textWidth + 24;
          const badgeH = 24;
          let badgeX = spotX + 16;
          let badgeY = spotY - 12;

          // Keep badge inside photo
          if (badgeX + badgeW > photoX + photoW - 10) {
            badgeX = spotX - badgeW - 16;
          }
          if (badgeY < photoY + 10) {
            badgeY = photoY + 12;
          }
          if (badgeY + badgeH > photoY + photoH - 10) {
            badgeY = photoY + photoH - badgeH - 12;
          }

          // Connecting hairline
          ctx.strokeStyle = spotColor;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(spotX, spotY);
          ctx.lineTo(badgeX > spotX ? badgeX : badgeX + badgeW, badgeY + badgeH / 2);
          ctx.stroke();

          // Badge pill
          ctx.fillStyle = isHovered ? "rgba(0, 0, 0, 0.92)" : "rgba(10, 15, 12, 0.85)";
          ctx.strokeStyle = isHovered ? spotColor : "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
          ctx.fill();
          ctx.stroke();

          // Badge text
          ctx.fillStyle = isHovered ? spotColor : "#FFFFFF";
          ctx.fillText(label, badgeX + 12, badgeY + 16);
        });
      }

      ctx.restore();
    }

    // Photo border
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    ctx.strokeRect(photoX, photoY, photoW, photoH);

    // Photo camera metadata badge
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(photoX + 16, photoY + photoH - 40, 240, 26);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.strokeRect(photoX + 16, photoY + photoH - 40, 240, 26);
    ctx.fillStyle = theme.textSecondary;
    ctx.font = "500 11px monospace";
    ctx.fillText("VIEWFINDER: 35mm · ISO 100 · f/2.8", photoX + 26, photoY + photoH - 23);

    // ==========================================
    // 3. RIGHT COLUMN: SCORE GAUGE & OVERVIEW
    // ==========================================
    const rightColX = 770;
    const rightColW = width - rightColX - 60;

    // Overall Score Card Box
    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rightColX, photoY, rightColW, 230, 8);
    ctx.fill();
    ctx.stroke();

    // Circular Score Dial
    const dialCenterX = rightColX + 85;
    const dialCenterY = photoY + 115;
    const dialRadius = 60;

    // Background track
    ctx.beginPath();
    ctx.arc(dialCenterX, dialCenterY, dialRadius, 0.75 * Math.PI, 2.25 * Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Value Arc
    const progress = Math.min(Math.max(analysis.overallScore / 100, 0), 1);
    const startAngle = 0.75 * Math.PI;
    const endAngle = startAngle + progress * 1.5 * Math.PI;

    const arcGrad = ctx.createLinearGradient(
      dialCenterX - dialRadius,
      dialCenterY,
      dialCenterX + dialRadius,
      dialCenterY
    );
    arcGrad.addColorStop(0, theme.accentSecondary);
    arcGrad.addColorStop(1, theme.accent);

    ctx.beginPath();
    ctx.arc(dialCenterX, dialCenterY, dialRadius, startAngle, endAngle);
    ctx.strokeStyle = arcGrad;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Center Score Text
    ctx.textAlign = "center";
    ctx.fillStyle = theme.textPrimary;
    ctx.font = "800 42px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`${analysis.overallScore}`, dialCenterX, dialCenterY + 10);

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("/ 100", dialCenterX, dialCenterY + 28);

    // Right of Dial: Rating Title & Keywords
    ctx.textAlign = "left";
    ctx.fillStyle = theme.accent;
    ctx.font = "700 14px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("OVERALL SCORE", dialCenterX + 85, photoY + 45);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = "700 20px 'Noto Sans TC', sans-serif";
    ctx.fillText(analysis.compositionTier, dialCenterX + 85, photoY + 75);

    // Vibe Keywords
    ctx.fillStyle = theme.textSecondary;
    ctx.font = "500 12px 'Noto Sans TC', sans-serif";
    const keywordsText = analysis.vibeKeywords.join(" · ");
    ctx.fillText(keywordsText, dialCenterX + 85, photoY + 102);

    // Lighting summary
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(dialCenterX + 85, photoY + 125, rightColW - 175, 75);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeRect(dialCenterX + 85, photoY + 125, rightColW - 175, 75);

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 11px 'Noto Sans TC', sans-serif";
    ctx.fillText("採光與氛圍診斷：", dialCenterX + 95, photoY + 146);
    ctx.fillStyle = theme.textPrimary;
    ctx.font = "400 11.5px 'Noto Sans TC', sans-serif";
    const lightCond = analysis.sceneryElementsBreakdown.lightingCondition.condition;
    ctx.fillText(lightCond, dialCenterX + 95, photoY + 168);

    // ==========================================
    // 4. RADAR CHART SECTION (BOTTOM-RIGHT)
    // ==========================================
    const radarBoxY = photoY + 245;
    const radarBoxH = 255;

    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rightColX, radarBoxY, rightColW, radarBoxH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("美學維度雷達圖 · DIMENSIONS", rightColX + 24, radarBoxY + 32);

    if (showRadar) {
      const radarCenterX = rightColX + rightColW / 2;
      const radarCenterY = radarBoxY + 145;
      const radarRadius = 78;

      const dimKeys = [
        { key: "compositionDepth", label: "構圖深度" },
        { key: "floraHarmony", label: "植栽協調" },
        { key: "lightAndShadow", label: "光影氛圍" },
        { key: "hardscapeStructure", label: "結構動線" },
        { key: "seasonalAtmosphere", label: "四季意境" },
        { key: "spatialBreathing", label: "留白借景" },
      ] as const;

      const numAxes = dimKeys.length;

      // Draw grid polygons (25%, 50%, 75%, 100%)
      [0.35, 0.65, 1.0].forEach((level) => {
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
          const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
          const r = radarRadius * level;
          const ax = radarCenterX + r * Math.cos(angle);
          const ay = radarCenterY + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(ax, ay);
          else ctx.lineTo(ax, ay);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw spoke lines & labels
      dimKeys.forEach((item, i) => {
        const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
        const ax = radarCenterX + radarRadius * Math.cos(angle);
        const ay = radarCenterY + radarRadius * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(radarCenterX, radarCenterY);
        ctx.lineTo(ax, ay);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.stroke();

        // Label position
        const labelR = radarRadius + 20;
        const lx = radarCenterX + labelR * Math.cos(angle);
        const ly = radarCenterY + labelR * Math.sin(angle);
        ctx.textAlign = "center";
        ctx.fillStyle = theme.textSecondary;
        ctx.font = "500 10.5px 'Noto Sans TC', sans-serif";
        ctx.fillText(item.label, lx, ly + 4);
      });
      ctx.textAlign = "left";

      // Draw radar data polygon
      ctx.beginPath();
      dimKeys.forEach((item, i) => {
        const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
        const score = analysis.dimensions[item.key]?.score || 80;
        const r = (score / 100) * radarRadius;
        const px = radarCenterX + r * Math.cos(angle);
        const py = radarCenterY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = theme.radarFill;
      ctx.fill();
      ctx.strokeStyle = theme.radarStroke;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw vertices
      dimKeys.forEach((item, i) => {
        const angle = (i * 2 * Math.PI) / numAxes - Math.PI / 2;
        const score = analysis.dimensions[item.key]?.score || 80;
        const r = (score / 100) * radarRadius;
        const px = radarCenterX + r * Math.cos(angle);
        const py = radarCenterY + r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      });
    }

    // ==========================================
    // 5. EXTRACTED NATURE PALETTE (BELOW PHOTO)
    // ==========================================
    const paletteY = photoY + photoH + 24;
    const paletteW = width - 120;
    const paletteH = 76;

    if (showPalette) {
      ctx.fillStyle = theme.cardBg;
      ctx.strokeStyle = theme.cardBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(60, paletteY, paletteW, paletteH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = theme.textSecondary;
      ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("景致原色色譜 · NATURE CHROMATIC PALETTE", 80, paletteY + 22);

      // Render color swatches
      const swatchStartX = 80;
      const swatchY = paletteY + 34;
      const numColors = analysis.colorPalette.length;
      const blockWidth = (paletteW - 40) / numColors;

      analysis.colorPalette.forEach((c, idx) => {
        const bx = swatchStartX + idx * blockWidth;

        // Color block
        ctx.fillStyle = c.hex;
        ctx.beginPath();
        ctx.roundRect(bx, swatchY, blockWidth - 14, 24, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label: Name and Hex
        ctx.fillStyle = theme.textPrimary;
        ctx.font = "600 10.5px 'Noto Sans TC', sans-serif";
        ctx.fillText(`${c.name} (${c.percentage}%)`, bx + 6, swatchY - 5);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "600 9px monospace";
        ctx.fillText(c.hex, bx + 8, swatchY + 16);
      });
    }

    // ==========================================
    // 6. LOWER DUAL DOSSIER PANELS: HIGHLIGHTS & TIPS
    // ==========================================
    const lowerY = paletteY + paletteH + 24;
    const lowerW = (width - 120 - 32) / 2;
    const lowerH = 680;

    // Left Box: Key Strengths
    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(60, lowerY, lowerW, lowerH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = "700 13px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("AESTHETIC STRENGTHS · 三大景觀美學亮點", 84, lowerY + 40);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = "600 18px 'Noto Sans TC', sans-serif";
    ctx.fillText("空間構成與自然靈性解析", 84, lowerY + 70);

    let leftItemY = lowerY + 105;
    analysis.keyHighlights.forEach((hl, i) => {
      // Index badge
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(84, leftItemY, 32, 28);
      ctx.strokeStyle = theme.accent;
      ctx.strokeRect(84, leftItemY, 32, 28);

      ctx.fillStyle = theme.accent;
      ctx.font = "700 13px 'Plus Jakarta Sans', monospace";
      ctx.fillText(`0${i + 1}`, 92, leftItemY + 19);

      // Text
      ctx.fillStyle = theme.textPrimary;
      ctx.font = "400 13.5px 'Noto Sans TC', sans-serif";
      // Wrap text
      const maxTextW = lowerW - 90;
      wrapText(ctx, hl, 130, leftItemY + 18, maxTextW, 22);

      leftItemY += 88;
    });

    // Elements breakdown summary under highlights
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.moveTo(84, leftItemY + 20);
    ctx.lineTo(60 + lowerW - 24, leftItemY + 20);
    ctx.stroke();

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 12px 'Noto Sans TC', sans-serif";
    ctx.fillText("景致元素層次透視：", 84, leftItemY + 48);

    const elementsList = [
      { label: "前景引導", text: analysis.sceneryElementsBreakdown.foreground.item },
      { label: "中景焦點", text: analysis.sceneryElementsBreakdown.middleground.item },
      { label: "遠景借景", text: analysis.sceneryElementsBreakdown.background.item },
    ];
    let elY = leftItemY + 75;
    elementsList.forEach((el) => {
      ctx.fillStyle = theme.accent;
      ctx.font = "600 11px 'Noto Sans TC', sans-serif";
      ctx.fillText(`· ${el.label}：`, 84, elY);
      ctx.fillStyle = theme.textPrimary;
      ctx.font = "400 11px 'Noto Sans TC', sans-serif";
      ctx.fillText(el.text, 160, elY);
      elY += 26;
    });

    // Right Box: Redesign & Improvements
    const rightBoxX = 60 + lowerW + 32;
    ctx.fillStyle = theme.cardBg;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rightBoxX, lowerY, lowerW, lowerH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accentSecondary;
    ctx.font = "700 13px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("REDESIGN ADVICE · 風景設計師造景升級", rightBoxX + 24, lowerY + 40);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = "600 18px 'Noto Sans TC', sans-serif";
    ctx.fillText("大師級空間改造與造園方針", rightBoxX + 24, lowerY + 70);

    let rightItemY = lowerY + 105;
    analysis.landscapeRedesignTips.forEach((tip, i) => {
      // Step badge
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(rightBoxX + 24, rightItemY, 32, 28);
      ctx.strokeStyle = theme.accentSecondary;
      ctx.strokeRect(rightBoxX + 24, rightItemY, 32, 28);

      ctx.fillStyle = theme.accentSecondary;
      ctx.font = "700 13px 'Plus Jakarta Sans', monospace";
      ctx.fillText(`0${i + 1}`, rightBoxX + 32, rightItemY + 19);

      // Text
      ctx.fillStyle = theme.textPrimary;
      ctx.font = "400 13.5px 'Noto Sans TC', sans-serif";
      const maxTextW = lowerW - 90;
      wrapText(ctx, tip, rightBoxX + 70, rightItemY + 18, maxTextW, 22);

      rightItemY += 92;
    });

    // Recommended Elements in right box
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.moveTo(rightBoxX + 24, rightItemY + 16);
    ctx.lineTo(rightBoxX + lowerW - 24, rightItemY + 16);
    ctx.stroke();

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 12px 'Noto Sans TC', sans-serif";
    ctx.fillText("推薦添增景觀亮點植物 / 設施：", rightBoxX + 24, rightItemY + 44);

    let plantY = rightItemY + 72;
    analysis.recommendedPlantsAndElements.slice(0, 2).forEach((item) => {
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(rightBoxX + 24, plantY - 14, lowerW - 48, 48);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(rightBoxX + 24, plantY - 14, lowerW - 48, 48);

      ctx.fillStyle = theme.accent;
      ctx.font = "600 12px 'Noto Sans TC', sans-serif";
      ctx.fillText(`【${item.category}】${item.name}`, rightBoxX + 36, plantY + 4);

      ctx.fillStyle = theme.textSecondary;
      ctx.font = "400 11px 'Noto Sans TC', sans-serif";
      ctx.fillText(`${item.placement} · ${item.benefit}`, rightBoxX + 36, plantY + 22);

      plantY += 58;
    });

    // ==========================================
    // 7. VERDICT BANNER & ATELIER STAMP
    // ==========================================
    const verdictY = lowerY + lowerH - 140;
    const verdictW = width - 120;
    const verdictH = 100;

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(60, verdictY, verdictW, verdictH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = "700 28px 'Cinzel', serif";
    ctx.fillText("“", 80, verdictY + 42);

    ctx.fillStyle = theme.textPrimary;
    ctx.font = "500 13px 'Noto Sans TC', sans-serif";
    ctx.letterSpacing = "0.5px";
    wrapText(ctx, analysis.speechCritique, 105, verdictY + 36, verdictW - 240, 22);

    ctx.fillStyle = theme.textSecondary;
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("— CHIEF LANDSCAPE ARCHITECT · VERDICT", 105, verdictY + 84);

    // Official Seal / Stamp on Canvas
    if (showSeal) {
      const sealCenterX = width - 150;
      const sealCenterY = verdictY + 50;
      const sealRadius = 40;

      ctx.save();
      ctx.translate(sealCenterX, sealCenterY);
      ctx.rotate(-0.08); // Subtle authentic tilt

      // Double ring seal
      ctx.beginPath();
      ctx.arc(0, 0, sealRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 122, 95, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, sealRadius - 5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 122, 95, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(224, 122, 95, 0.85)";
      ctx.font = "700 9px 'Cinzel', serif";
      ctx.letterSpacing = "1.5px";
      ctx.fillText("AI STUDIO", 0, -18);

      ctx.font = "700 12px 'Noto Sans TC', serif";
      ctx.fillText("景觀美學", 0, -1);
      ctx.fillText("大師評定", 0, 15);

      ctx.font = "600 7px monospace";
      ctx.fillText("★ CERTIFIED ★", 0, 27);

      ctx.restore();
      ctx.textAlign = "left";
    }

    // Canvas Bottom Bar
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.font = "400 11px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillText("AI LANDSCAPE STUDIO · AUTONOMOUS SCENERY VALUATION SYSTEM", 60, height - 42);

    ctx.textAlign = "right";
    ctx.fillText("WWW.AISTUDIO.BUILD · HIGH-FIDELITY CANVASES", width - 60, height - 42);
    ctx.textAlign = "left";
  }, [
    analysis,
    currentTheme,
    hoveredHotspotIndex,
    showGrid,
    showHotspots,
    showPalette,
    showRadar,
    showSeal,
  ]);

  // Redraw when deps change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas, imageLoaded]);

  // Helper text wrapping function for canvas
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    let currentLine = "";
    let lineY = y;

    for (let n = 0; n < text.length; n++) {
      const testLine = currentLine + text[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(currentLine, x, lineY);
        currentLine = text[n];
        lineY += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    ctx.fillText(currentLine, x, lineY);
  }

  // Handle Canvas mouse interaction for hotspots
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check if mouse is near any hotspot
    const photoX = 60;
    const photoY = 190;
    const photoW = 680;
    const photoH = 500;

    let foundIdx: number | null = null;
    analysis.hotspots.forEach((spot, idx) => {
      const spotX = photoX + (spot.xPercent / 100) * photoW;
      const spotY = photoY + (spot.yPercent / 100) * photoH;
      const dist = Math.hypot(mouseX - spotX, mouseY - spotY);
      if (dist < 28) {
        foundIdx = idx;
      }
    });

    if (foundIdx !== hoveredHotspotIndex) {
      setHoveredHotspotIndex(foundIdx);
      if (foundIdx !== null && onSelectHotspot) {
        onSelectHotspot(foundIdx);
      }
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredHotspotIndex(null);
  };

  // Download high-res PNG image from Canvas
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Landscape-Report-${analysis.overallScore}pts.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  // Copy to clipboard
  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }, "image/png");
    } catch (e) {
      console.warn("Failed to copy image to clipboard", e);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Canvas Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900/80 backdrop-blur-md p-3.5 rounded-xl border border-neutral-800">
        {/* Theme Switcher */}
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium text-neutral-400">風格畫布：</span>
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
            {Object.entries(THEMES).map(([id, t]) => (
              <button
                key={id}
                onClick={() => setCurrentTheme(id as CanvasThemeId)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  currentTheme === id
                    ? "bg-neutral-800 text-emerald-300 shadow-sm border border-neutral-700"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Layers */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <Layers className="w-3.5 h-3.5 text-neutral-500" />
            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`px-2 py-0.5 rounded transition ${
                showHotspots ? "text-emerald-400 bg-emerald-950/40" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              熱點標記
            </button>
            <span>·</span>
            <button
              onClick={() => setShowRadar(!showRadar)}
              className={`px-2 py-0.5 rounded transition ${
                showRadar ? "text-emerald-400 bg-emerald-950/40" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              雷達圖
            </button>
            <span>·</span>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2 py-0.5 rounded transition ${
                showGrid ? "text-emerald-400 bg-emerald-950/40" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              三分構圖線
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg border border-neutral-700 transition"
              title="複製海報至剪貼簿"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? "已複製" : "複製圖檔"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm transition"
              title="下載高解析海報 (PNG)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出高解析海報</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Viewport Container */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-2xl flex items-center justify-center p-2 sm:p-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
          className="w-full h-auto max-w-full rounded-xl cursor-crosshair shadow-inner transition-transform duration-200"
          style={{
            aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
          }}
        />

        {/* Hover Hotspot Tooltip Bar at bottom of preview */}
        {hoveredHotspotIndex !== null && (
          <div className="absolute bottom-6 left-6 right-6 p-3 bg-neutral-900/95 backdrop-blur-md rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-3 animate-fade-in text-neutral-100">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/40">
              {hoveredHotspotIndex + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-emerald-300">
                  {analysis.hotspots[hoveredHotspotIndex].title}
                </span>
                <span className="text-xs text-neutral-400">
                  · {analysis.hotspots[hoveredHotspotIndex].part}
                </span>
              </div>
              <p className="text-xs text-neutral-300 truncate">
                {analysis.hotspots[hoveredHotspotIndex].comment}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
