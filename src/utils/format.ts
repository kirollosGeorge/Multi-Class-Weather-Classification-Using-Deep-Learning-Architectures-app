export function formatPercent(value?: number): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value * 1000) / 10}%`;
}

export function formatMs(value?: number): string {
  if (typeof value !== 'number') return 'N/A';
  return `${Math.round(value)} ms`;
}

export function bytesToMb(bytes: number): number {
  return bytes / 1024 / 1024;
}
