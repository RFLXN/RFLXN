import type { AppIconSource } from "./types";

/** Decorative: the surrounding app button or window supplies its accessible name. */
export function AppIcon({
  icon,
  size,
}: {
  icon: AppIconSource;
  size: 16 | 22 | 48 | 64;
}) {
  return (
    <img
      className="papirus-icon"
      src={icon[size]}
      width={size}
      height={size}
      alt=""
      draggable={false}
    />
  );
}
