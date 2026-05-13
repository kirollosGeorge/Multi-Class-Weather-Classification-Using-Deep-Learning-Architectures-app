import { clsx } from 'clsx';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx('rounded-3xl border border-slate-200 bg-white p-6 shadow-sm', className)}>{children}</section>;
}
