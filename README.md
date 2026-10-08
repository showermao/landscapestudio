---
title: LandscapeStudio
emoji: 🌿
colorFrom: gray
colorTo: green
sdk: docker
app_port: 7860
pinned: false
short_description: AI 風景與景觀美學分析
---

## Hugging Face Space

https://huggingface.co/spaces/JhenYuMao/landscapestudio

Deploys using Docker with a React frontend and Express backend. In Space Settings,
add `GEMINI_API_KEY` as a Secret before running AI analysis. Never commit API keys.
Push changes to the `origin` remote on `main` to rebuild the Space.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ec95da43-93e7-40b9-8575-f22a2d75435c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
