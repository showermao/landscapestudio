import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { speechService } from "../utils/speech";

interface Props {
  text: string;
  autoPlay?: boolean;
  architectName?: string;
}

export const VoiceCriticPlayer: React.FC<Props> = ({
  text,
  autoPlay = false,
  architectName = "景觀造園大師 · 首席美學顧問",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Equalizer animation bars
  const [barHeights, setBarHeights] = useState<number[]>([12, 24, 18, 30, 15, 26, 14, 20]);
  const animationIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Load voices
    const list = speechService.getVoices();
    setVoices(list);
    const pref = speechService.getPreferredVoice();
    if (pref) {
      setSelectedVoice(pref.name);
    }
  }, []);

  // Equalizer visualizer loop while playing
  useEffect(() => {
    if (isPlaying) {
      animationIntervalRef.current = window.setInterval(() => {
        setBarHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 26) + 6)
        );
      }, 110);
    } else {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      setBarHeights([6, 8, 6, 10, 6, 9, 6, 7]);
    }

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Handle Play
  const handlePlay = () => {
    setSpeechError(null);
    speechService.speak(text, {
      rate,
      voiceName: selectedVoice || undefined,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: (err) => {
        console.warn("Speech error:", err);
        setIsPlaying(false);
        setSpeechError("語音播放暫不可用或被瀏覽器靜音，可點擊重試");
      },
    });
  };

  const handlePause = () => {
    speechService.stop();
    setIsPlaying(false);
  };

  const handleReplay = () => {
    speechService.stop();
    handlePlay();
  };

  // Auto-play trigger when text changes
  useEffect(() => {
    if (autoPlay && text) {
      const timer = setTimeout(() => {
        handlePlay();
      }, 600);
      return () => {
        clearTimeout(timer);
        speechService.stop();
      };
    }
    return () => {
      speechService.stop();
    };
  }, [text]);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-950/40 via-neutral-900/90 to-neutral-900/60 backdrop-blur-md rounded-2xl border border-emerald-900/40 p-4 sm:p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Avatar & Meta */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-neutral-100">{architectName}</h4>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 font-mono">
                AI VOICE
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              語音解說評析 · 點擊聆聽大師造景思維
            </p>
          </div>
        </div>

        {/* Center: Live Waveform Equalizer */}
        <div className="flex items-center gap-1.5 h-8 px-3 py-1 bg-neutral-950/70 rounded-lg border border-neutral-800/80">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="w-1 bg-emerald-400/80 rounded-full transition-all duration-100"
              style={{
                height: `${h}px`,
                backgroundColor: isPlaying
                  ? i % 2 === 0
                    ? "#52B788"
                    : "#74C69D"
                  : "#404040",
              }}
            />
          ))}
        </div>

        {/* Right: Controls & Speed */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Rate selector */}
          <div className="flex items-center gap-1 p-0.5 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
            {[0.8, 1.0, 1.2].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`px-2 py-1 rounded transition ${
                  rate === r
                    ? "bg-emerald-950 text-emerald-300 font-semibold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {r}x
              </button>
            ))}
          </div>

          {/* Primary Play/Pause Button */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 transition"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>暫停</span>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>播放語音評語</span>
            </button>
          )}

          <button
            onClick={handleReplay}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition"
            title="重播語音"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Spoken text quotation display */}
      <div className="mt-3.5 pt-3 border-t border-neutral-800/80">
        <blockquote className="text-sm leading-relaxed text-neutral-200 font-normal italic relative pl-4 border-l-2 border-emerald-500/60">
          “{text}”
        </blockquote>
      </div>

      {speechError && (
        <p className="mt-2 text-xs text-amber-400/90">{speechError}</p>
      )}
    </div>
  );
};
