import { useQuery } from '@tanstack/react-query';
import { BarChart3, FileWarning } from 'lucide-react';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { useAppContext } from '../../app/AppContext';
import { WEATHER_CLASSES } from '../../config/weather';
import { useModels } from '../../hooks/useModels';
import { getModelEvaluation } from '../../services/evaluationService';
import { formatPercent } from '../../utils/format';

export function EvaluationPage() {
  const { selectedModelId, setSelectedModelId } = useAppContext();
  const { data: models = [] } = useModels();
  const { data: evaluation, isLoading } = useQuery({
    queryKey: ['evaluation', selectedModelId],
    queryFn: () => getModelEvaluation(selectedModelId),
    enabled: Boolean(selectedModelId)
  });

  return (
    <div>
      <PageHeader
        eyebrow="Evaluation"
        title="Model metrics and testing outputs"
        description="Review documented performance now, then connect API endpoints for live confusion matrices, classification reports, accuracy curves, and loss curves."
        action={
          <select
            value={selectedModelId}
            onChange={(event) => setSelectedModelId(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 sm:w-72"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Performance summary</h3>
              <p className="mt-1 text-sm text-slate-500">Current values are either API-driven or extracted from documentation.</p>
            </div>
            {evaluation?.source ? <StatusBadge tone={evaluation.source === 'api' ? 'success' : 'warning'}>{evaluation.source}</StatusBadge> : null}
          </div>

          {isLoading ? <p className="mt-8 text-sm text-slate-500">Loading evaluation...</p> : null}

          <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm text-slate-300">Accuracy</p>
            <p className="mt-2 text-5xl font-bold">{formatPercent(evaluation?.accuracy)}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Accuracy is shown exactly as available from the connected API or from the uploaded project documentation.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Loss</p>
              <p className="mt-2 font-semibold text-slate-950">{evaluation?.loss ?? 'API required'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Matrix</p>
              <p className="mt-2 font-semibold text-slate-950">{evaluation?.confusionMatrix ? 'Available' : 'API required'}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Confusion matrix</h3>
                <p className="text-sm text-slate-500">Expected shape: 5 x 5, ordered by weather classes.</p>
              </div>
            </div>

            {evaluation?.confusionMatrix ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-separate border-spacing-2 text-sm">
                  <thead>
                    <tr>
                      <th className="text-left text-slate-500">True / Predicted</th>
                      {WEATHER_CLASSES.map((item) => <th key={item.id} className="text-center text-slate-500">{item.label}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {evaluation.confusionMatrix.map((row, rowIndex) => (
                      <tr key={WEATHER_CLASSES[rowIndex]?.id ?? rowIndex}>
                        <th className="text-left font-semibold text-slate-700">{WEATHER_CLASSES[rowIndex]?.label}</th>
                        {row.map((value, colIndex) => (
                          <td key={`${rowIndex}-${colIndex}`} className="rounded-xl bg-slate-100 p-3 text-center font-semibold text-slate-800">{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState icon={FileWarning} title="Confusion matrix requires API data" description="Connect GET /models/:modelId/evaluation to return confusionMatrix when backend evaluation outputs are available." />
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Classification report</h3>
            {evaluation?.classificationReport?.length ? (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    <tr>
                      <th className="py-3">Label</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>F1-score</th>
                      <th>Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluation.classificationReport.map((row) => (
                      <tr key={row.label} className="border-t border-slate-100">
                        <td className="py-3 font-medium capitalize">{row.label}</td>
                        <td>{formatPercent(row.precision)}</td>
                        <td>{formatPercent(row.recall)}</td>
                        <td>{formatPercent(row.f1Score)}</td>
                        <td>{row.support ?? 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Classification report is ready to render once returned by the evaluation API.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
