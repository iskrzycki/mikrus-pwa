import { create } from "zustand";
import type { ServerData } from "../utils";

interface DashboardStore {
  apiResponse?: ServerData;
  lastFetch: Date | null;
  setApiResponse: (response: ServerData | undefined) => void;
  setLastFetch: (date: Date | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  apiResponse: undefined,
  lastFetch: null,
  setApiResponse: (response) => set({ apiResponse: response }),
  setLastFetch: (date) => set({ lastFetch: date }),
}));
