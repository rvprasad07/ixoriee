"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Currency } from "@/types";

interface OpenDrawerOptions {
  pillarId?: string;
  pillarTitle?: string;
  tierId?: string;
  tierName?: string;
  currency?: Currency;
}

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: (options?: OpenDrawerOptions) => void;
  closeDrawer: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  selectedPillarId?: string;
  selectedPillarTitle?: string;
  selectedTierId?: string;
  selectedTierName?: string;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [selectedPillarId, setSelectedPillarId] = useState<string | undefined>(undefined);
  const [selectedPillarTitle, setSelectedPillarTitle] = useState<string | undefined>(undefined);
  const [selectedTierId, setSelectedTierId] = useState<string | undefined>(undefined);
  const [selectedTierName, setSelectedTierName] = useState<string | undefined>(undefined);

  const openDrawer = useCallback((options?: OpenDrawerOptions) => {
    if (options?.pillarId) setSelectedPillarId(options.pillarId);
    if (options?.pillarTitle) setSelectedPillarTitle(options.pillarTitle);
    if (options?.tierId) setSelectedTierId(options.tierId);
    if (options?.tierName) setSelectedTierName(options.tierName);
    if (options?.currency) setCurrency(options.currency);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        currency,
        setCurrency,
        selectedPillarId,
        selectedPillarTitle,
        selectedTierId,
        selectedTierName,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
