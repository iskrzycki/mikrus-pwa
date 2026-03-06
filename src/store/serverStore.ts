import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ServerCredentials {
  id: string;
  serverId: string;
  apiKey: string;
}

interface ServerStore {
  servers: ServerCredentials[];
  activeServerId: string | null;
  addServer: (server: Omit<ServerCredentials, "id">) => void;
  updateServer: (id: string, server: Partial<Omit<ServerCredentials, "id">>) => void;
  removeServer: (id: string) => void;
  setActiveServer: (id: string) => void;
  getActiveServer: () => ServerCredentials | undefined;
}

// Migrate old localStorage data if exists
const migrateOldData = (): { servers: ServerCredentials[]; activeServerId: string | null } => {
  const oldApiKey = localStorage.getItem("apiKey");
  const oldServerId = localStorage.getItem("serverId");
  
  if (oldApiKey && oldServerId) {
    const id = crypto.randomUUID();
    // Clean up old data
    localStorage.removeItem("apiKey");
    localStorage.removeItem("serverId");
    return {
      servers: [{
        id,
        serverId: oldServerId,
        apiKey: oldApiKey,
      }],
      activeServerId: id,
    };
  }
  
  return { servers: [], activeServerId: null };
};

export const useServerStore = create<ServerStore>()(
  persist(
    (set, get) => ({
      ...migrateOldData(),
      
      addServer: (server) => {
        const id = crypto.randomUUID();
        const newServer = { ...server, id };
        set((state) => ({
          servers: [...state.servers, newServer],
          activeServerId: state.activeServerId ?? id,
        }));
      },
      
      updateServer: (id, updates) => {
        set((state) => ({
          servers: state.servers.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },
      
      removeServer: (id) => {
        set((state) => {
          const newServers = state.servers.filter((s) => s.id !== id);
          const newActiveId = state.activeServerId === id
            ? (newServers[0]?.id ?? null)
            : state.activeServerId;
          return { servers: newServers, activeServerId: newActiveId };
        });
      },
      
      setActiveServer: (id) => {
        set({ activeServerId: id });
      },
      
      getActiveServer: () => {
        const state = get();
        return state.servers.find((s) => s.id === state.activeServerId);
      },
    }),
    {
      name: "server-storage",
    }
  )
);
