import { clsx } from 'clsx';

type Tone = 'success' | 'warning' | 'neutral' | 'info';

const tones: Record<Tone, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  info: 'bg-blue-50 text-blue-700 ring-blue-200'
};

export function StatusBadge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1', tones[tone])}>{children}</span>;
}
