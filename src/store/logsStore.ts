import { create } from "zustand";
import type { LogData } from "../utils";

interface LogsStore {
  apiResponse?: LogData[];
  lastFetch: Date | null;
  setApiResponse: (response: LogData[] | undefined) => void;
  setLastFetch: (date: Date | null) => void;
}

export const useLogsStore = create<LogsStore>((set) => ({
  apiResponse: undefined,
  lastFetch: null,
  setApiResponse: (response) => set({ apiResponse: response }),
  setLastFetch: (date) => set({ lastFetch: date }),
}));
