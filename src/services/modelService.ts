import { MODEL_DEFINITIONS } from '../config/weather';
import { apiGet } from '../lib/apiClient';
import type { ModelDefinition } from '../types/domain';

export async function getModels(): Promise<ModelDefinition[]> {
  try {
    return await apiGet<ModelDefinition[]>('/models');
  } catch {
    return MODEL_DEFINITIONS;
  }
}

export function getDefaultModelId(): string {
  return MODEL_DEFINITIONS.find((model) => model.selected)?.id ?? MODEL_DEFINITIONS[0].id;
}
