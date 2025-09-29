"use client";

import { useId } from "react";
import { createContext, useContext, ReactNode } from "react";

interface IdContextType {
  generateId: (prefix?: string) => string;
}

const IdContext = createContext<IdContextType | null>(null);

export function IdProvider({ children }: { children: ReactNode }) {
  const baseId = useId();
  let counter = 0;

  const generateId = (prefix = "radix") => {
    counter++;
    return `${prefix}-${baseId}-${counter}`;
  };

  return (
    <IdContext.Provider value={{ generateId }}>
      {children}
    </IdContext.Provider>
  );
}

export function useStableId(prefix?: string) {
  const context = useContext(IdContext);
  if (!context) {
    // Fallback to useId if not within IdProvider
    return useId();
  }
  return context.generateId(prefix);
}