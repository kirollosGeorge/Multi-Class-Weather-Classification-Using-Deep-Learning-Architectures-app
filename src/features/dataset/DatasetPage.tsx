import { CheckCircle2, Database } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { getDatasetStats } from '../../services/datasetService';

export function DatasetPage() {
  const { data } = useQuery({ queryKey: ['dataset-stats'], queryFn: getDatasetStats });

  return (
    <div>
      <PageHeader
        eyebrow="Dataset & Preprocessing"
        title="Five-class weather image dataset rules"
        description="The GUI documents and enforces the same dataset assumptions used by the original preprocessing scripts and notebooks."
      />

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Dataset splits</h3>
              <p className="text-sm text-slate-500">Extracted from project documentation and preprocessing script.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {data?.splits.map((split) => (
              <div key={split.name} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="capitalize font-semibold text-slate-950">{split.name}</h4>
                  {split.splitRatio ? <StatusBadge tone="info">{Math.round(split.splitRatio * 100)}%</StatusBadge> : <StatusBadge>CSV based</StatusBadge>}
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-950">{split.imageCount ?? 'N/A'} images</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{split.notes}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold">Allowed classes</h3>
            <p className="mt-1 text-sm text-slate-500">These labels are used by the model output layer, API response, and frontend validation.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {data?.classes.map((weatherClass) => (
                <div key={weatherClass.id} className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-950">{weatherClass.label}</h4>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">#{weatherClass.index}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{weatherClass.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Preprocessing rules</h3>
            <div className="mt-5 space-y-3">
              {data?.preprocessingRules.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{rule}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
