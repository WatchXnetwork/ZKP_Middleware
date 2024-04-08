import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getStorage } from "@/stores/storage";

import User, { UserStore } from "@/domain/user.model";

export const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            hydrated: false,
            user: {} as never,
            setUser: (data: Partial<User>) =>
                set({
                    user: {
                        ...get().user,
                        ...data
                    }
                }),
        }),
        {
            name: "user-store",
            storage: getStorage(),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.hydrated = true;
                }
            },
        }
    )
);
