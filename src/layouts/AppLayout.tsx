import { CloudSun, Database, Gauge, Home, LineChart, Settings, UploadCloud } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';

const navigation = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/prediction', label: 'Prediction', icon: UploadCloud },
  { to: '/models', label: 'Models', icon: CloudSun },
  { to: '/dataset', label: 'Dataset', icon: Database },
  { to: '/evaluation', label: 'Evaluation', icon: LineChart },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white/90 px-5 py-6 backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3 rounded-3xl bg-slate-950 p-4 text-white shadow-soft">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <Gauge className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-slate-300">Weather AI</p>
            <h1 className="text-lg font-semibold">Classification GUI</h1>
          </div>
        </div>

        <nav className="space-y-2" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                )
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Weather AI</p>
              <h1 className="font-semibold">Classification GUI</h1>
            </div>
            <CloudSun className="h-6 w-6 text-blue-600" />
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium',
                    isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
