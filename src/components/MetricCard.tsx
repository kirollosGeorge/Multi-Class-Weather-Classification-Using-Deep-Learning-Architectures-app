import type { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  helper?: string;
}

export function MetricCard({ label, value, icon: Icon, helper }: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
