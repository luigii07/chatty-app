import { create } from "zustand";
import type { Theme } from "../constants/themes";

type ThemeStore = {
    theme: Theme,
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: localStorage.getItem("chat-theme") as Theme || "light",

    setTheme: (theme: Theme) => {
        window.localStorage.setItem("chat-theme", theme);

        set({ theme: theme });
    }
}));