import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ModelsPage } from '../features/models/ModelsPage';
import { PredictionPage } from '../features/prediction/PredictionPage';
import { DatasetPage } from '../features/dataset/DatasetPage';
import { EvaluationPage } from '../features/evaluation/EvaluationPage';
import { SettingsPage } from '../features/settings/SettingsPage';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/dataset" element={<DatasetPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
