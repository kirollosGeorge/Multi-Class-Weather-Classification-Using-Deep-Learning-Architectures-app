export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  maxUploadMb: Number(import.meta.env.VITE_MAX_UPLOAD_MB ?? 10),
  demoMode: import.meta.env.VITE_ENABLE_DEMO_MODE === 'true'
};
