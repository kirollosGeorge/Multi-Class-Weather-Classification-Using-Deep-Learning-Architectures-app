import { DATASET_STATS } from '../config/weather';
import { apiGet } from '../lib/apiClient';
import type { DatasetStats } from '../types/domain';

export async function getDatasetStats(): Promise<DatasetStats> {
  try {
    return await apiGet<DatasetStats>('/dataset/stats');
  } catch {
    return DATASET_STATS;
  }
}
