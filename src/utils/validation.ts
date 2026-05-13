import { env } from '../config/env';
import { bytesToMb } from './format';

export function validateImageFile(file: File | null): string | null {
  if (!file) return 'Please upload an image before running prediction.';
  if (!file.type.startsWith('image/')) return 'Only image files are supported.';
  if (bytesToMb(file.size) > env.maxUploadMb) {
    return `Image size exceeds the ${env.maxUploadMb} MB limit.`;
  }
  return null;
}
