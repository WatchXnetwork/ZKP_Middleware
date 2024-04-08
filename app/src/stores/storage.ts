import { createJSONStorage } from "zustand/middleware";

export const getStorage = () => {
    return createJSONStorage(() => window.localStorage) as never;
}