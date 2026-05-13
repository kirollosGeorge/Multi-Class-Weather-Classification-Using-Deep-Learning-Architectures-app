# Weather Classification GUI

A modern, responsive frontend GUI for the original **Multi-Class Weather Classification using Deep Learning Architectures** project.

This frontend preserves the original project concept: classifying weather images into five classes using deep learning models such as CNN, ResNet, VGG, InceptionV3, EfficientNet, and Xception. The original project is notebook/script-based, so this GUI introduces a clean frontend layer with explicit API integration points.

## Features

- Modern dashboard for project overview and model status.
- Model catalog for CNN, ResNet, VGG, InceptionV3, EfficientNet, and Xception architectures.
- Image upload workflow for weather prediction.
- Validation for image type and upload size.
- Dataset documentation page with preprocessing and split rules.
- Evaluation page for accuracy, loss, confusion matrix, and classification report integration.
- Loading, empty, success, and error states.
- Responsive, accessible, mobile-first UI.
- Typed service layer ready to connect to an inference backend.

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack React Query
- Lucide React icons

## Project Structure

```txt
weather-classification-gui/
├── MODEL_ANALYSIS.md
├── README.md
├── .env.example
├── package.json
├── index.html
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
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
│   └── utils/
```

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_MAX_UPLOAD_MB=10
VITE_ENABLE_DEMO_MODE=false
```

## Expected API Endpoints

```http
GET /models
GET /dataset/stats
GET /models/:modelId/evaluation
POST /predict
```

## Prediction API Contract

Request:

```http
POST /predict
Content-Type: multipart/form-data

image: File
modelId: string
normalize: true
```

Response:

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

## Notes

- The GUI does not include backend code, training notebooks, datasets, model weights, `node_modules`, or heavy assets.
- Demo prediction mode is disabled by default.
- The best documented original model is ResNet101.
