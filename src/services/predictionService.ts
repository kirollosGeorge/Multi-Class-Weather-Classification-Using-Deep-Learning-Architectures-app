import { env } from '../config/env';
import { apiPostForm } from '../lib/apiClient';
import type { PredictionRequestPayload, PredictionResult } from '../types/domain';

export async function predictWeather(payload: PredictionRequestPayload): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('modelId', payload.modelId);
  formData.append('normalize', String(payload.normalize));

  if (env.demoMode) {
    throw new Error('Demo mode is enabled, but dummy predictions are intentionally not generated. Connect an inference API to run predictions.');
  }

  return apiPostForm<PredictionResult>('/predict', formData);
}
