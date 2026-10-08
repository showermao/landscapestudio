import React, { useState, useRef, useEffect } from "react";
import { Camera, X, RotateCcw, Upload, Grid3X3, Compass, Check, AlertCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraCaptureModal: React.FC<Props> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      setCameraError(
        "無法啟動相機。請確認已授予相機權限，或直接選擇「上傳風景相片」。"
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen, facingMode]);

  // Flip Camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  // Capture frame
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Flash simulation
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    // Stop tracks
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    onCapture(dataUrl);
    onClose();
  };

  // Countdown shutter
  const handleShutterClick = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          takeSnapshot();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // File upload fallback with auto compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawUrl = event.target?.result as string;
      if (!rawUrl) return;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1600;
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
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.88);
          if (stream) {
            stream.getTracks().forEach((t) => t.stop());
          }
          onCapture(compressed);
          onClose();
          return;
        }
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }
        onCapture(rawUrl);
        onClose();
      };
      img.onerror = () => {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }
        onCapture(rawUrl);
        onClose();
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-neutral-200">
              現場風景取景器 · LANDSCAPE VIEWFINDER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
                showGrid
                  ? "bg-emerald-950/60 border-emerald-600/50 text-emerald-400"
                  : "bg-neutral-800 border-neutral-700 text-neutral-400"
              }`}
              title="切換三分構圖線"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">構圖輔助線</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Viewfinder Area */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center max-w-md">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm text-neutral-300 mb-4">{cameraError}</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition"
              >
                從手機或電腦上傳風景照片
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Flash Effect */}
          {flash && (
            <div className="absolute inset-0 bg-white transition-opacity duration-200 opacity-90 pointer-events-none" />
          )}

          {/* Golden Ratio / Rule of Thirds Grid Overlay */}
          {showGrid && !cameraError && (
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-r border-b border-white/20" />
              <div className="border-b border-white/20" />
              <div className="border-r border-white/20" />
              <div className="border-r border-white/20" />
              <div />
            </div>
          )}

          {/* Horizon Leveler Line Guide */}
          {!cameraError && (
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-between opacity-60">
              <div className="w-8 h-0.5 bg-emerald-400" />
              <div className="w-4 h-4 rounded-full border border-emerald-400" />
              <div className="w-8 h-0.5 bg-emerald-400" />
            </div>
          )}

          {/* Countdown Indicator */}
          {countdown !== null && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-7xl font-extrabold text-white animate-ping">
                {countdown}
              </span>
            </div>
          )}
        </div>

        {/* Viewfinder Controls Footer */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          {/* Flip camera */}
          <button
            onClick={toggleFacingMode}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition"
            title="切換前後鏡頭"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">切換鏡頭</span>
          </button>

          {/* Shutter Button */}
          <button
            onClick={handleShutterClick}
            disabled={Boolean(cameraError)}
            className="group relative w-16 h-16 rounded-full border-4 border-white/40 flex items-center justify-center hover:border-emerald-400 active:scale-95 transition"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500 group-hover:bg-emerald-400 transition" />
          </button>

          {/* Upload file fallback */}
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">本地相簿</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
