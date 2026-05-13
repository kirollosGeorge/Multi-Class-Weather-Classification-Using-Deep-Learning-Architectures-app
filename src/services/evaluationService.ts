import { MODEL_DEFINITIONS } from '../config/weather';
import { apiGet } from '../lib/apiClient';
import type { EvaluationMetric } from '../types/domain';

export async function getModelEvaluation(modelId: string): Promise<EvaluationMetric> {
  try {
    return await apiGet<EvaluationMetric>(`/models/${modelId}/evaluation`);
  } catch {
    const model = MODEL_DEFINITIONS.find((item) => item.id === modelId);
    return {
      modelId,
      source: 'documentation',
      accuracy: model?.documentedAccuracy
    };
  }
}
