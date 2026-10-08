export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onBoundary?: (charIndex: number) => void;
}

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.isLoaded = true;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (!this.voices.length) {
      this.voices = this.synth.getVoices();
    }
    // Sort Chinese voices to the top
    return [...this.voices].sort((a, b) => {
      const aIsZh = a.lang.toLowerCase().includes("zh");
      const bIsZh = b.lang.toLowerCase().includes("zh");
      if (aIsZh && !bIsZh) return -1;
      if (!aIsZh && bIsZh) return 1;
      const aIsTw = a.lang.toLowerCase().includes("tw");
      const bIsTw = b.lang.toLowerCase().includes("tw");
      if (aIsTw && !bIsTw) return -1;
      if (!aIsTw && bIsTw) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  public getPreferredVoice(): SpeechSynthesisVoice | null {
    const list = this.getVoices();
    if (!list.length) return null;
    // Try zh-TW first, then any zh
    const twVoice = list.find((v) => v.lang.replace("_", "-").toLowerCase().includes("zh-tw"));
    if (twVoice) return twVoice;
    const zhVoice = list.find((v) => v.lang.toLowerCase().startsWith("zh"));
    if (zhVoice) return zhVoice;
    return list[0];
  }

  public speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth) {
      options.onError?.("瀏覽器不支援語音合成 API");
      return;
    }

    this.stop();

    // Clean up text
    const cleanText = text.replace(/[*#_~`]/g, "").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    let targetVoice: SpeechSynthesisVoice | null = null;
    if (options.voiceName) {
      targetVoice = this.voices.find((v) => v.name === options.voiceName) || null;
    }
    if (!targetVoice) {
      targetVoice = this.getPreferredVoice();
    }
    if (targetVoice) {
      utterance.voice = targetVoice;
      utterance.lang = targetVoice.lang;
    } else {
      utterance.lang = "zh-TW";
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options.onError?.(e);
    };

    if (options.onBoundary) {
      utterance.onboundary = (e) => {
        options.onBoundary?.(e.charIndex);
      };
    }

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis trigger error:", e);
      options.onError?.(e);
    }
  }

  public stop() {
    if (!this.synth) return;
    try {
      this.synth.cancel();
      this.currentUtterance = null;
    } catch (e) {
      console.warn("Error stopping speech:", e);
    }
  }

  public pause() {
    if (!this.synth) return;
    this.synth.pause();
  }

  public resume() {
    if (!this.synth) return;
    this.synth.resume();
  }

  public isSpeaking(): boolean {
    return Boolean(this.synth?.speaking);
  }
}

export const speechService = new SpeechManager();
