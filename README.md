---
title: LandscapeStudio
emoji: 🌿
colorFrom: gray
colorTo: green
sdk: static
app_file: site/index.html
pinned: false
short_description: 免費本機風景影像分析與語音朗讀
---

# LandscapeStudio 免費版

上傳或拍攝照片，在瀏覽器內計算亮度、對比、綠色像素比例及主要色票。
照片不會上傳分析，不需要帳號、Gemini API Key 或付費 AI API。
語音朗讀使用瀏覽器的 speechSynthesis，支援程度及可用聲音取決於裝置。
範例照片和網頁字型需要網路連線；部分裝置的語音也可能使用線上服務。

這是基礎像素分析，不是 AI 視覺辨識。總分是曝光與對比指標的平均，
不是景觀美學評分。植栽欄位顯示綠色像素比例，不能判定植物種類或健康。
無法評估的空間、材質及季節項目顯示 0（未評估）。
色票只列前四大色群，比例以整張照片計算，總和可能不滿 100%。
預設景觀報告為示範資料；上傳後會替換為照片的實際像素統計。

## 本機執行

需要 Node.js 24。

```sh
npm ci
npm run dev
```

開啟 http://localhost:3000。無需設定任何 Secret。

```sh
npm run lint
npm run build
node --import tsx --test src/utils/localAnalysis.test.ts
```

## Hugging Face

Space: https://huggingface.co/spaces/JhenYuMao/landscapestudio

Space 直接提供 site/ 的靜態網頁，不需要 CPU 配額、伺服器或 GEMINI_API_KEY。
修改後執行 `npm run build:space`，將更新的 site/ 一併提交，
再使用有寫入權限的帳號執行 `git push origin main` 即可部署。
舊的 GEMINI_API_KEY Secret 可以移除。
