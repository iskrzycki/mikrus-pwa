import { create } from "zustand";
import type { DatabaseInfo } from "../utils";

interface DatabasesStore {
  apiResponse?: DatabaseInfo;
  lastFetch: Date | null;
  setApiResponse: (response: DatabaseInfo | undefined) => void;
  setLastFetch: (date: Date | null) => void;
}

export const useDatabasesStore = create<DatabasesStore>((set) => ({
  apiResponse: undefined,
  lastFetch: null,
  setApiResponse: (response) => set({ apiResponse: response }),
  setLastFetch: (date) => set({ lastFetch: date }),
}));
