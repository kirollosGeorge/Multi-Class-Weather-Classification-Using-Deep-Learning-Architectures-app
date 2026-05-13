import { useQuery } from '@tanstack/react-query';
import { getModels } from '../services/modelService';

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: getModels,
    staleTime: 1000 * 60 * 10
  });
}
