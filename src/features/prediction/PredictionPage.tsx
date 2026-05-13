import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertTriangle, ImageUp, Loader2, UploadCloud } from 'lucide-react';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { ProbabilityBar } from '../../components/ProbabilityBar';
import { StatusBadge } from '../../components/StatusBadge';
import { useAppContext } from '../../app/AppContext';
import { WEATHER_CLASSES } from '../../config/weather';
import { useModels } from '../../hooks/useModels';
import { predictWeather } from '../../services/predictionService';
import { formatMs, formatPercent } from '../../utils/format';
import { validateImageFile } from '../../utils/validation';

export function PredictionPage() {
  const { selectedModelId, setSelectedModelId } = useAppContext();
  const { data: models = [] } = useModels();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedModel = useMemo(() => models.find((model) => model.id === selectedModelId), [models, selectedModelId]);

  const mutation = useMutation({
    mutationFn: predictWeather
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setValidationError(validateImageFile(file));
    mutation.reset();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateImageFile(imageFile);
    setValidationError(error);
    if (error || !imageFile) return;
    mutation.mutate({ image: imageFile, modelId: selectedModelId, normalize: true });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Prediction Workflow"
        title="Upload a weather image and run model inference"
        description="The frontend validates the input and sends the image to the configured inference API without changing the original model preprocessing or prediction rules."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="model" className="text-sm font-semibold text-slate-800">Model</label>
              <select
                id="model"
                value={selectedModelId}
                onChange={(event) => setSelectedModelId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              {selectedModel ? <p className="mt-2 text-xs text-slate-500">Preprocessing: {selectedModel.preprocessing}</p> : null}
            </div>

            <div>
              <label htmlFor="image" className="text-sm font-semibold text-slate-800">Image</label>
              <label
                htmlFor="image"
                className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
              >
                <ImageUp className="h-10 w-10 text-blue-600" aria-hidden="true" />
                <span className="mt-3 text-sm font-semibold text-slate-800">Click to upload weather image</span>
                <span className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP, or any browser-supported image format</span>
              </label>
              <input id="image" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
              {validationError ? <p className="mt-3 text-sm font-medium text-red-600">{validationError}</p> : null}
            </div>

            {previewUrl ? (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                <img src={previewUrl} alt="Uploaded weather preview" className="h-72 w-full object-cover" />
                <div className="p-4">
                  <p className="truncate text-sm font-medium text-slate-800">{imageFile?.name}</p>
                  <p className="mt-1 text-xs text-slate-500">Image will be sent as multipart/form-data.</p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
              {mutation.isPending ? 'Running inference...' : 'Run Prediction'}
            </button>
          </form>
        </Card>

        <Card>
          {!mutation.data && !mutation.error && !mutation.isPending ? (
            <EmptyState
              icon={UploadCloud}
              title="No prediction yet"
              description="Upload a weather image and submit it to the inference API. No dummy prediction is generated unless a real backend returns results."
            />
          ) : null}

          {mutation.isPending ? (
            <div className="flex min-h-96 items-center justify-center rounded-3xl bg-slate-50">
              <div className="text-center">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
                <p className="mt-4 font-semibold text-slate-800">Processing image...</p>
                <p className="mt-1 text-sm text-slate-500">Waiting for backend inference response.</p>
              </div>
            </div>
          ) : null}

          {mutation.error ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-6 w-6 shrink-0 text-amber-700" />
                <div>
                  <h3 className="font-semibold text-amber-900">Prediction API is not available</h3>
                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Connect the frontend to a backend endpoint at <code className="rounded bg-white/70 px-1">POST /predict</code>. The GUI does not create fake predictions by default.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {mutation.data ? (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <StatusBadge tone="success">Prediction complete</StatusBadge>
                  <h3 className="mt-4 text-3xl font-bold capitalize text-slate-950">{mutation.data.predictedClass}</h3>
                  <p className="mt-2 text-sm text-slate-500">Model: {mutation.data.modelId}</p>
                </div>
                <div className="rounded-3xl bg-blue-50 p-5 text-center">
                  <p className="text-sm text-blue-700">Confidence</p>
                  <p className="mt-1 text-3xl font-bold text-blue-700">{formatPercent(mutation.data.confidence)}</p>
                  <p className="mt-1 text-xs text-blue-600">{formatMs(mutation.data.inferenceTimeMs)}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {WEATHER_CLASSES.map((weatherClass) => (
                  <ProbabilityBar
                    key={weatherClass.id}
                    label={weatherClass.label}
                    value={mutation.data.probabilities[weatherClass.id] ?? 0}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
