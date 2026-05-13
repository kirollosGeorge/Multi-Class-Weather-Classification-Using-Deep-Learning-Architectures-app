import { CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useAppContext } from '../../app/AppContext';
import { useModels } from '../../hooks/useModels';
import { formatPercent } from '../../utils/format';

export function ModelsPage() {
  const { selectedModelId, setSelectedModelId } = useAppContext();
  const { data: models = [], isLoading } = useModels();

  return (
    <div>
      <PageHeader
        eyebrow="Model Catalog"
        title="Compare original deep learning architectures"
        description="Review the extracted model definitions, preprocessing rules, documented metrics, and select the model used by the prediction workflow."
      />

      {isLoading ? <p className="text-sm text-slate-500">Loading model definitions...</p> : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {models.map((model) => {
          const isSelected = model.id === selectedModelId;
          return (
            <Card key={model.id} className={isSelected ? 'ring-2 ring-blue-600' : ''}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-950">{model.name}</h3>
                    {model.selected ? <StatusBadge tone="success">Documented best</StatusBadge> : null}
                    {model.augmentationEnabled ? <StatusBadge tone="info">Augmentation</StatusBadge> : <StatusBadge>Without augmentation</StatusBadge>}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{model.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedModelId(model.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  {isSelected ? <CheckCircle2 className="h-4 w-4" /> : null}
                  {isSelected ? 'Selected' : 'Select'}
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info label="Architecture" value={model.architecture} />
                <Info label="Accuracy" value={formatPercent(model.documentedAccuracy)} />
                <Info label="Input" value={`${model.inputSize.width} x ${model.inputSize.height} x ${model.inputSize.channels}`} />
                <Info label="Batch / Epochs" value={`${model.batchSize} / ${model.epochs}`} />
                <Info label="Optimizer" value={model.optimizer} />
                <Info label="Loss" value={model.loss} />
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Preprocessing</p>
                <p className="mt-2 break-words text-sm text-slate-700">{model.preprocessing}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}
