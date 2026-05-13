import { Activity, BrainCircuit, CloudSun, Database, Route } from 'lucide-react';
import { Card } from '../../components/Card';
import { MetricCard } from '../../components/MetricCard';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { DATASET_STATS } from '../../config/weather';
import { useAppContext } from '../../app/AppContext';
import { useModels } from '../../hooks/useModels';
import { formatPercent } from '../../utils/format';

export function DashboardPage() {
  const { selectedModelId } = useAppContext();
  const { data: models = [] } = useModels();
  const selectedModel = models.find((model) => model.id === selectedModelId) ?? models.find((model) => model.selected);

  return (
    <div>
      <PageHeader
        eyebrow="Deep Learning Weather Classifier"
        title="Production-ready GUI for multi-class weather image classification"
        description="A modern frontend layer for the original notebook-based ML workflow, preserving the same five-class weather classification concept and model comparison logic."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Weather Classes" value="5" icon={CloudSun} helper="cloudy, foggy, rainy, shine, sunrise" />
        <MetricCard label="Model Architectures" value={String(models.length || 10)} icon={BrainCircuit} helper="CNN, ResNet, VGG, Inception, EfficientNet, Xception" />
        <MetricCard label="Image Input" value="256²" icon={Activity} helper="RGB image input: 256 x 256 x 3" />
        <MetricCard label="Documented Best" value={formatPercent(selectedModel?.documentedAccuracy)} icon={Database} helper={selectedModel?.name ?? 'ResNet101'} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white">
            <StatusBadge tone="info">Selected model</StatusBadge>
            <h3 className="mt-5 text-3xl font-bold">{selectedModel?.name ?? 'ResNet101'}</h3>
            <p className="mt-3 max-w-2xl text-blue-100">
              {selectedModel?.description ?? 'Selected transfer learning model with documented top performance in the original project.'}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-blue-100">Optimizer</p>
                <p className="mt-1 font-semibold">{selectedModel?.optimizer ?? 'Adam'}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-blue-100">Loss</p>
                <p className="mt-1 font-semibold">{selectedModel?.loss ?? 'categorical_crossentropy'}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-blue-100">Output</p>
                <p className="mt-1 font-semibold">5-class softmax</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <Route className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Core workflow</h3>
              <p className="text-sm text-slate-500">Preserved from the original project.</p>
            </div>
          </div>
          <ol className="mt-6 space-y-4">
            {['Prepare dataset folders', 'Resize and preprocess images', 'Train or load model', 'Run five-class prediction', 'Review metrics and confusion matrix'].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>
                <span className="text-sm font-medium text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Dataset classes</h3>
            <p className="mt-1 text-sm text-slate-500">All UI validation and API contracts are aligned with these labels.</p>
          </div>
          <StatusBadge tone="success">Business rules preserved</StatusBadge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {DATASET_STATS.classes.map((weatherClass) => (
            <div key={weatherClass.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-950">{weatherClass.label}</p>
              <p className="mt-1 text-xs text-slate-500">Encoded index: {weatherClass.index}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
