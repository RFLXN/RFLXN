import { create } from "zustand";

export const textSizes = ["small", "medium", "large"] as const;
export type TextSize = (typeof textSizes)[number];
export const textSizeLabels: Record<TextSize, string> = {
  small: "S",
  medium: "M",
  large: "L",
};
const storageKey = "rflxn-text-size";
export function normalizeTextSize(value: unknown): TextSize {
  return textSizes.includes(value as TextSize) ? (value as TextSize) : "medium";
}
function readPreference(): TextSize {
  try {
    return normalizeTextSize(localStorage.getItem(storageKey));
  } catch {
    return "medium";
  }
}
interface PreferencesState {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}
export const usePreferencesStore = create<PreferencesState>((set) => ({
  textSize: readPreference(),
  setTextSize: (value) => {
    const textSize = normalizeTextSize(value);
    // Storage can be unavailable; the current page should still update.
    try {
      localStorage.setItem(storageKey, textSize);
    } catch {
      /* session-only */
    }
    set({ textSize });
  },
}));
