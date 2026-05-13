export type WeatherClassName = 'cloudy' | 'foggy' | 'rainy' | 'shine' | 'sunrise';

export interface WeatherClass {
  id: WeatherClassName;
  label: string;
  index: number;
  description: string;
}

export interface ImageInputSize {
  width: number;
  height: number;
  channels: number;
}

export interface ModelDefinition {
  id: string;
  name: string;
  architecture: string;
  description: string;
  inputSize: ImageInputSize;
  batchSize: number;
  epochs: number;
  optimizer: string;
  loss: string;
  outputActivation: string;
  classCount: number;
  preprocessing: string;
  augmentationEnabled: boolean;
  documentedAccuracy?: number;
  selected?: boolean;
}

export interface DatasetSplit {
  name: 'training' | 'validation' | 'test';
  imageCount?: number;
  splitRatio?: number;
  notes: string;
}

export interface DatasetStats {
  classes: WeatherClass[];
  splits: DatasetSplit[];
  preprocessingRules: string[];
}

export interface PredictionRequestPayload {
  image: File;
  modelId: string;
  normalize: boolean;
}

export interface PredictionResult {
  modelId: string;
  predictedClass: WeatherClassName;
  confidence: number;
  probabilities: Record<WeatherClassName, number>;
  inferenceTimeMs?: number;
}

export interface ClassificationReportRow {
  label: WeatherClassName | 'accuracy' | 'macro avg' | 'weighted avg';
  precision?: number;
  recall?: number;
  f1Score?: number;
  support?: number;
}

export interface EvaluationMetric {
  modelId: string;
  source: 'api' | 'documentation';
  accuracy?: number;
  loss?: number;
  confusionMatrix?: number[][];
  classificationReport?: ClassificationReportRow[];
}
