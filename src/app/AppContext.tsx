import { createContext, useContext, useMemo, useState } from 'react';
import { getDefaultModelId } from '../services/modelService';

interface AppContextValue {
  selectedModelId: string;
  setSelectedModelId: (modelId: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedModelId, setSelectedModelId] = useState(getDefaultModelId());

  const value = useMemo(
    () => ({ selectedModelId, setSelectedModelId }),
    [selectedModelId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside AppProvider');
  return context;
}
