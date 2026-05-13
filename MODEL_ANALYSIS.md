# Model Analysis — Multi-Class Weather Classification GUI

## 1. Source Project Summary

The uploaded project is a deep learning research/codebase for **multi-class weather image classification**. It classifies images into five weather classes:

- `cloudy`
- `foggy`
- `rainy`
- `shine`
- `sunrise`

The original project is implemented as Python scripts and Jupyter notebooks. It does not contain a traditional web backend, database schema, API routes, authentication layer, or an existing GUI. The new GUI therefore keeps the exact concept and business workflow intact while introducing a clean frontend layer that can be connected to a future or existing inference backend.

## 2. Target Frontend Stack

Selected stack:

- **React 18** for component-based UI development.
- **Vite** for fast local development and optimized production builds.
- **TypeScript** for safer model contracts and typed service integration.
- **Tailwind CSS** for a lightweight, responsive, utility-first design system.
- **React Router** for page-level navigation.
- **TanStack React Query** for API request state, loading states, caching, and errors.

This stack is intentionally lightweight and production-ready. It avoids backend code and heavy dependencies while providing explicit integration points for model inference, model metadata, dataset statistics, and evaluation APIs.

## 3. Core Data Model

### 3.1 WeatherClass

Represents the allowed classification labels used by all models.

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `id` | `string` | Yes | Stable class identifier. |
| `label` | `string` | Yes | Human-readable label. |
| `index` | `number` | Yes | Label order used by categorical output. |
| `description` | `string` | No | UI explanation. |

Allowed labels:

```ts
cloudy | foggy | rainy | shine | sunrise
```

Original label encoding documented in the project:

- cloudy → 1
- rainy → 2
- shine/shiny → 3
- foggy → 4
- sunrise → 5

The notebooks use categorical outputs with `Dense(5, activation='softmax')`.

### 3.2 DatasetSplit

Represents dataset distribution after preprocessing.

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `name` | `training | validation | test` | Yes | Dataset stage. |
| `imageCount` | `number` | Yes | Number of images. |
| `classes` | `WeatherClass[]` | Yes | The same five labels. |
| `splitRatio` | `number` | Conditional | Used for train/validation split. |

Extracted rules:

- Dataset is read from class folders.
- Empty files are ignored during splitting.
- Train/validation split is random.
- Split size used in preprocessing script: `0.85` training and `0.15` validation.
- Test preprocessing uses `dataset/test.csv` and `dataset/alien_test/`.

### 3.3 ModelDefinition

Represents a trained or trainable weather classification architecture.

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `id` | `string` | Yes | Stable model identifier. |
| `name` | `string` | Yes | Display name. |
| `architecture` | `string` | Yes | CNN, ResNet, VGG, InceptionV3, EfficientNet, Xception. |
| `inputSize` | `{ width: number; height: number; channels: number }` | Yes | Original input size is `256 x 256 x 3`. |
| `batchSize` | `number` | Yes | CNN uses 16; transfer learning models commonly use 8. |
| `epochs` | `number` | Yes | Most notebooks use 30 epochs. |
| `optimizer` | `string` | Yes | Adam. |
| `loss` | `string` | Yes | Categorical crossentropy. |
| `outputActivation` | `string` | Yes | Softmax. |
| `classCount` | `number` | Yes | 5. |
| `preprocessing` | `string` | Yes | Either `rescale(1/255)` or model-specific `preprocess_input`. |
| `augmentationEnabled` | `boolean` | Yes | True for augmented models. |
| `documentedAccuracy` | `number` | No | Accuracy values extracted from project documentation. |

Documented architectures:

- CNN without augmentation
- CNN with augmentation
- ResNet50 with CNN layers and augmentation
- VGG16 with augmentation, dense layers, dropout, and batch normalization
- VGG19 with augmentation, dense layers, dropout, and batch normalization
- InceptionV3 with augmentation, dense layers, dropout, and batch normalization
- EfficientNetB0 with augmentation, dense layers, dropout, and batch normalization
- ResNet152 with augmentation, dense layers, dropout, and batch normalization
- ResNet101 with augmentation, dense layers, dropout, and batch normalization
- Xception with augmentation, dense layers, dropout, and batch normalization

The project documentation states that **ResNet101** is the selected model with the best documented accuracy.

### 3.4 PredictionRequest

Represents an uploaded image sent to an inference endpoint.

| Field | Type | Required | Validation |
|---|---:|---:|---|
| `image` | `File` | Yes | Must be an image file. |
| `modelId` | `string` | Yes | Must match a known model. |
| `normalize` | `boolean` | No | Allows backend to apply model preprocessing. |

Frontend validation rules:

- Only image MIME types are accepted.
- Maximum upload size is controlled by `VITE_MAX_UPLOAD_MB`.
- Model selection is required before prediction.
- The GUI does not modify original model logic; preprocessing remains delegated to backend inference services.

### 3.5 PredictionResult

Represents inference output from the backend.

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `predictedClass` | `WeatherClassName` | Yes | Final predicted class. |
| `confidence` | `number` | Yes | Highest softmax probability. |
| `probabilities` | `Record<WeatherClassName, number>` | Yes | Probability distribution across all five labels. |
| `modelId` | `string` | Yes | Model used for inference. |
| `inferenceTimeMs` | `number` | No | Backend processing time. |

### 3.6 EvaluationMetric

Represents post-training or testing outputs.

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `accuracy` | `number` | No | Overall model accuracy. |
| `loss` | `number` | No | Evaluation loss. |
| `confusionMatrix` | `number[][]` | No | 5x5 class matrix. |
| `classificationReport` | `object` | No | Precision, recall, F1-score, support. |

Original project outputs include:

- Accuracy curves
- Loss curves
- Confusion matrix
- Normalized confusion matrix
- Classification report

## 4. Relationships

```text
WeatherClass 1..* DatasetSplit
WeatherClass 1..* PredictionResult.probabilities
ModelDefinition 1..* PredictionRequest
ModelDefinition 1..* PredictionResult
ModelDefinition 1..* EvaluationMetric
DatasetSplit 1..* PreprocessingPipeline
```

## 5. Business Rules Preserved

1. The classification task must remain a five-class weather classification problem.
2. Input images must be resized/preprocessed to `256 x 256 x 3` before inference/training.
3. Model outputs must remain five-class categorical softmax probabilities.
4. Dataset folder classes must remain `cloudy`, `foggy`, `rainy`, `shine`, and `sunrise`.
5. The train/validation split rule remains `85% / 15%`.
6. Empty files must be excluded during dataset preparation.
7. CNN models use image rescaling by `1/255`.
8. Transfer learning models use the relevant Keras `preprocess_input` function.
9. The selected/best documented model remains ResNet101 unless changed by backend metadata.
10. The frontend must not retrain models or silently change prediction logic.

## 6. CRUD Operations Represented in the GUI

Because the original project has no database-backed CRUD layer, the GUI maps CRUD-like operations to ML workflow actions:

| Area | Operation | Frontend Behavior | Backend Integration Point |
|---|---|---|---|
| Models | Read | Display available model definitions and documented metrics. | `GET /models` |
| Models | Select | Choose model for inference. | Local UI state; sent with prediction request. |
| Prediction | Create | Upload image and create a prediction request. | `POST /predict` |
| Prediction | Read | Display prediction result and class probabilities. | Response from `POST /predict` |
| Dataset | Read | Display class labels and split strategy. | `GET /dataset/stats` |
| Evaluation | Read | Display metrics, confusion matrix, and reports. | `GET /models/:id/evaluation` |
| Config | Read | Display active API base URL and upload rules. | `.env` variables |

## 7. User Workflows

### 7.1 Dashboard Workflow

1. User opens the GUI.
2. User sees project purpose, selected model, dataset classes, and integration status.
3. User navigates to Prediction, Models, Dataset, or Evaluation.

### 7.2 Prediction Workflow

1. User selects a model.
2. User uploads a weather image.
3. Frontend validates image type and size.
4. Frontend sends image and model ID to the prediction API.
5. API returns predicted class and probabilities.
6. GUI displays confidence, probability bars, and inference notes.
7. Loading, error, empty, and success states are shown clearly.

### 7.3 Model Review Workflow

1. User opens Models page.
2. User reviews architectures and documented accuracy.
3. User compares preprocessing, batch size, epochs, and augmentation.
4. User selects preferred model for prediction.

### 7.4 Dataset Workflow

1. User opens Dataset page.
2. User reviews allowed classes and split rules.
3. User sees preprocessing rules and validation constraints.
4. Backend dataset stats can be connected later through `GET /dataset/stats`.

### 7.5 Evaluation Workflow

1. User opens Evaluation page.
2. User selects a model.
3. GUI requests model evaluation data.
4. GUI displays documented fallback metrics if API data is unavailable and clearly labels them as extracted documentation values.
5. API-based metrics replace documentation values when connected.

## 8. State Requirements

Global UI state:

- Selected model ID.
- API connection mode.
- Prediction form state.
- Prediction result state.
- Request loading/error states.

Server state handled through React Query:

- Model list.
- Dataset statistics.
- Evaluation result.
- Prediction mutation.

## 9. API / Service Integration Points

Configured by `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_MAX_UPLOAD_MB=10
VITE_ENABLE_DEMO_MODE=false
```

Expected endpoints:

```http
GET /models
GET /dataset/stats
GET /models/:modelId/evaluation
POST /predict
```

Expected prediction request:

```http
POST /predict
Content-Type: multipart/form-data

image: File
modelId: string
normalize: true
```

Expected prediction response:

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

## 10. Limitations and Professional Equivalents

- The original project does not expose an API, so this GUI includes a service layer ready for backend integration.
- The original project uses notebooks and local scripts; the GUI does not include backend training code to comply with the requirement of not including backend code.
- Evaluation charts from image files are not included as heavy assets. Instead, the GUI provides structured metric cards and placeholders ready for API-driven charts.
- No mock prediction is enabled by default. Demo behavior is only available when explicitly enabled using `VITE_ENABLE_DEMO_MODE=true`.
