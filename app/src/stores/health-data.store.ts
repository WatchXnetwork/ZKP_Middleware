import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getStorage } from "@/stores/storage";

import { HealthData, HealthDataStore } from "@/domain/data/health-data.model";



export const useHealthDataStore = create(
    persist<HealthDataStore>(
        (set, get) => ({
            hydrated: false,
            healthData: [],
            addHealthData: (data: HealthData) =>
                set({
                    healthData: [
                        ...get().healthData,
                        data
                    ]
                }),
            setHealthData: (data: HealthData[]) =>
                set({
                    healthData: data
                }),

            clearData: () => set({ healthData: [] }),
        }),
        {
            name: "health-data-store",
            storage: getStorage(),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.hydrated = true;
                }
            },
        }
    )
);
