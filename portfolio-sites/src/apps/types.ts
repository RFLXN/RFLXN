import type { ComponentType } from "react";
export type AppIconSource = Record<16 | 22 | 48 | 64, string>;
import type { AppTarget } from "../content/portfolio";
export interface AppProps {
  openApp: (target: AppTarget) => void;
  close: () => void;
  icon: AppIconSource;
}
export interface AppDefinition {
  id: string;
  title: string;
  description: string;
  icon: AppIconSource;
  component: ComponentType<AppProps>;
  initialSize: { width: number; height: number };
}
