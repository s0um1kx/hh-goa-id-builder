# 🛵 Hacker House Goa 2026 — Builder ID Card & Frame Generator

> High-performance, client-side web utility for generating personalized, event-branded **Builder ID Cards** and **Avatar Frames** for Hacker House Goa 2026. Built using React, Tailwind CSS, HTML5 Canvas, and Vercel Edge Functions.

---

## ⚡ Key Features

- **Zero Auth Overhead:** Pure client-side utility with instant photo-to-card pipeline execution.
- **Native iOS HEIC Ingestion:** Automated browser-side conversion of Apple `.heic` and `.heif` image blobs via `heic2any`.
- **Real-Time Image Processing Engine:**
  - Automated pixel luminance transformation: $$\text{Gray} = 0.34R + 0.50G + 0.16B$$
  - Interactive scale ($\text{Zoom} \in [1.0, 3.0]$) and 2D spatial translation ($\text{Offset}_{x,y} \in [-100, 100]$) controls.
- **High-DPI Canvas Rendering:** Renders DOM nodes at `pixelRatio: 2` using `html-to-image` and exports iOS Safari-compatible binary Blob URLs.
- **Serverless Open Graph (OG) Engine:** Vercel Edge Runtime (`@vercel/og`) dynamically constructs custom Twitter/X preview banners on the fly.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & Theme** | Tailwind CSS, Lucide Icons, Custom Typography |
| **Canvas & Processing** | `html-to-image`, `heic2any`, HTML5 Canvas API |
| **Edge Compute** | Vercel Edge Functions (`@vercel/og`) |
| **Deployment** | Vercel Continuous Integration (CI/CD) |

---

## 📸 Screenshots & Previews

| Builder Controls | Live Card Preview |
| :---: | :---: |
| ![Controls](https://raw.githubusercontent.com/s0um1kx/hh-goa-id-builder/main/public/screenshots/controls.png) | ![ID Card Preview](https://raw.githubusercontent.com/s0um1kx/hh-goa-id-builder/main/public/screenshots/card-preview.png) |

| X / Twitter Open Graph Card | High-Res PNG Export |
| :---: | :---: |
| ![Twitter Card Preview](https://raw.githubusercontent.com/s0um1kx/hh-goa-id-builder/main/public/screenshots/twitter-card.png) | ![Exported PNG](https://raw.githubusercontent.com/s0um1kx/hh-goa-id-builder/main/public/screenshots/export.png) |

---

## 🌐 Live Deployment

- **Live Web App:** [https://hh-goa-id-builder.vercel.app/](https://hh-goa-id-builder.vercel.app/)
- **Dynamic OG Image API:** `https://hh-goa-id-builder.vercel.app/api/og`
- **Hosting Platform:** Vercel Global Edge Network

---

## 🚀 Local Development Setup

```bash
# 1. Clone repository
git clone [https://github.com/s0um1kx/hh-goa-id-builder.git](https://github.com/s0um1kx/hh-goa-id-builder.git)
cd hh-goa-id-builder

# 2. Install dependencies
npm install

# 3. Launch dev server
npm run dev