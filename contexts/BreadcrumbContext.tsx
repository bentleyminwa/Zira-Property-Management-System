'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface BreadcrumbOverrides {
  [path: string]: string;
}

interface BreadcrumbContextType {
  overrides: BreadcrumbOverrides;
  setBreadcrumbOverride: (path: string, label: string) => void;
  clearBreadcrumbOverride: (path: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [overrides, setOverrides] = useState<BreadcrumbOverrides>({});

  const setBreadcrumbOverride = useCallback((path: string, label: string) => {
    setOverrides((prev) => ({ ...prev, [path]: label }));
  }, []);

  const clearBreadcrumbOverride = useCallback((path: string) => {
    setOverrides((prev) => {
      const newOverrides = { ...prev };
      delete newOverrides[path];
      return newOverrides;
    });
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{ overrides, setBreadcrumbOverride, clearBreadcrumbOverride }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
