import { Code2, ServerCog } from 'lucide-react';
import { Card } from '../../components/Card';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { env } from '../../config/env';

export function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Configuration"
        title="API and frontend runtime settings"
        description="Use this page to verify the integration configuration expected by the GUI before connecting a backend inference service."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <ServerCog className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Environment</h3>
              <p className="text-sm text-slate-500">Read from Vite environment variables.</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <Setting label="API Base URL" value={env.apiBaseUrl} />
            <Setting label="Max Upload Size" value={`${env.maxUploadMb} MB`} />
            <Setting label="Demo Mode" value={String(env.demoMode)} />
          </dl>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Expected endpoints</h3>
                <p className="text-sm text-slate-500">Backend contracts required by the service layer.</p>
              </div>
            </div>
            <StatusBadge tone="info">Ready</StatusBadge>
          </div>

          <div className="mt-6 space-y-3 font-mono text-sm">
            {['GET /models', 'GET /dataset/stats', 'GET /models/:modelId/evaluation', 'POST /predict'].map((endpoint) => (
              <div key={endpoint} className="rounded-2xl bg-slate-950 px-4 py-3 text-slate-100">{endpoint}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</dt>
      <dd className="mt-2 break-words font-semibold text-slate-950">{value}</dd>
    </div>
  );
}
