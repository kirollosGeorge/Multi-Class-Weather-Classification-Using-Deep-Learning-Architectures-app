# Weather Classification GUI

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Stars](https://img.shields.io/github/stars/your-org/weather-classification-gui?style=social)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6.svg)
![Vite](https://img.shields.io/badge/Vite-powered-646CFF.svg)

A modern, responsive frontend GUI for a multi-class deep learning weather image classification project.

The interface preserves the original ML concept: classify weather images into `cloudy`, `foggy`, `rainy`, `shine`, and `sunrise` using deep learning model architectures such as CNN, ResNet, VGG, InceptionV3, EfficientNet, and Xception.

> This repository contains the frontend layer only. It does not include backend code, datasets, notebooks, trained weights, `node_modules`, or heavy assets.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API and Config Notes](#api-and-config-notes)
- [Environment Variables](#environment-variables)
- [Prediction API Contract](#prediction-api-contract)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

**Weather Classification GUI** provides a production-ready frontend experience for reviewing weather classification models, uploading images for inference, inspecting prediction probabilities, and displaying dataset and evaluation information.

The original project is notebook/script-based. This GUI introduces a clean architecture with strongly typed domain models, a dedicated service layer, responsive pages, accessible UI components, and clear API integration points.

## Features

- Modern dashboard with project summary and model overview.
- Model catalog for CNN, ResNet, VGG, InceptionV3, EfficientNet, and Xception variants.
- Weather image upload and prediction workflow.
- Client-side validation for file type, file size, and model selection.
- Prediction result UI with confidence score and class probability bars.
- Dataset page documenting classes, preprocessing, and split rules.
- Evaluation page prepared for accuracy, loss, confusion matrix, and classification report integration.
- Loading, error, empty, and success states.
- Responsive layout optimized for mobile, tablet, and desktop.
- Accessibility-conscious navigation, spacing, contrast, and interactive states.
- API-ready service layer for backend inference integration.

## Screenshots

> Add screenshots after deploying or running the interface locally.

```txt
screenshots/
├── dashboard.png
├── models.png
├── prediction.png
├── dataset.png
└── evaluation.png
```

### Dashboard

![Dashboard Screenshot Placeholder](./screenshots/dashboard.png)

### Prediction

![Prediction Screenshot Placeholder](./screenshots/prediction.png)

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Server State | TanStack React Query |
| Icons | Lucide React |

## Quick Start

```bash
git clone <repository-url>
cd weather-classification-gui
npm install
cp .env.example .env
npm run dev
```

Build and preview production output:

```bash
npm run build
npm run preview
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Runs TypeScript build checks and generates the production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks across TypeScript and TSX files.

## Project Structure

```txt
weather-classification-gui/
├── MODEL_ANALYSIS.md
├── README.md
├── .env.example
├── package.json
├── index.html
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── AppContext.tsx
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── MetricCard.tsx
│   │   ├── PageHeader.tsx
│   │   ├── ProbabilityBar.tsx
│   │   └── StatusBadge.tsx
│   ├── config/
│   │   ├── env.ts
│   │   └── weather.ts
│   ├── features/
│   │   ├── dashboard/
│   │   ├── dataset/
│   │   ├── evaluation/
│   │   ├── models/
│   │   ├── prediction/
│   │   └── settings/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── main.tsx
│   └── styles.css
└── .gitignore
```

## API and Config Notes

The frontend is intentionally separated from backend model logic. API calls are isolated in `src/services` and configured through `src/lib/apiClient.ts` and `src/config/env.ts`.

Expected backend endpoints:

```http
GET /models
GET /dataset/stats
GET /models/:modelId/evaluation
POST /predict
```

The backend should remain responsible for:

- Loading trained model weights.
- Applying the correct preprocessing pipeline.
- Resizing images to `256 x 256 x 3`.
- Running inference.
- Returning softmax probabilities for all five classes.
- Returning evaluation data such as accuracy, loss, confusion matrix, and classification reports.

The frontend should remain responsible for:

- Model selection.
- Image upload interaction.
- File validation.
- Displaying prediction and evaluation results.
- Handling loading, error, empty, and success states.

## Environment Variables

Create a `.env` file from `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_MAX_UPLOAD_MB=10
VITE_ENABLE_DEMO_MODE=false
```

| Variable | Required | Default | Description |
|---|---:|---|---|
| `VITE_API_BASE_URL` | Yes | `http://localhost:8000/api` | Base URL for backend API calls. |
| `VITE_MAX_UPLOAD_MB` | Yes | `10` | Maximum image upload size in megabytes. |
| `VITE_ENABLE_DEMO_MODE` | No | `false` | Enables labeled demo behavior if implemented. Keep disabled for production usage. |

## Prediction API Contract

### Request

```http
POST /predict
Content-Type: multipart/form-data

image: File
modelId: string
normalize: true
```

### Response

```json
{
  "modelId": "resnet101",
  "predictedClass": "cloudy",
  "confidence": 0.94,
  "probabilities": {
    "cloudy": 0.94,
    "foggy": 0.02,
    "rainy": 0.01,
    "shine": 0.02,
    "sunrise": 0.01
  },
  "inferenceTimeMs": 142
}
```

### Supported weather classes

```txt
cloudy
foggy
rainy
shine
sunrise
```

## Troubleshooting

### The app does not start

Make sure dependencies are installed and Node.js is version 18 or later.

```bash
node -v
npm install
npm run dev
```

### API requests fail

Check that `VITE_API_BASE_URL` points to a running backend API.

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Also confirm that the backend supports CORS requests from the frontend development origin.

### Image upload is rejected

Confirm that the selected file is an image and does not exceed the configured upload size.

```env
VITE_MAX_UPLOAD_MB=10
```

### Prediction returns unexpected class names

The backend response must use one of the supported class labels:

```txt
cloudy, foggy, rainy, shine, sunrise
```

If the backend uses `shiny`, map it to `shine` before returning the response or normalize the label in the service layer.

### Production build fails

Run TypeScript and lint checks to identify the issue.

```bash
npm run lint
npm run build
```

## Roadmap

- Add real backend inference connection.
- Add authenticated admin mode for model metadata management if required.
- Add persisted prediction history when backend storage is available.
- Add downloadable evaluation reports.
- Add chart visualizations for training and validation curves.
- Add automated tests for services, forms, and critical workflows.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Keep API contracts typed and documented.
5. Run checks before opening a pull request.

```bash
npm run lint
npm run build
```

6. Open a pull request with a clear description and screenshots when UI changes are included.

## Security

Do not commit datasets, model weights, private API URLs, credentials, or environment files containing secrets.

Use `.env.example` for public configuration examples and keep real `.env` files local.

## License

This project is released under the **MIT License** unless a different license is defined by the repository owner.
