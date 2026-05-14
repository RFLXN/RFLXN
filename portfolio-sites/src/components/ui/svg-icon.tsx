import { getSvgIconColor, getSvgIconSvg } from "@/lib/svg-assets";

type SvgIconProps = {
  iconName: string,
  raw?: boolean,
  withColor?: boolean,
  color?: string,
  className?: string
};
const rawBaseClassName = "[&>svg]:block [&>svg]:size-4";
const colorizedBaseClassName = `${rawBaseClassName} [&>svg]:fill-current`;

function SvgIcon({ iconName, raw = false, withColor = false, color, className }: SvgIconProps) {
  const iconSvg = getSvgIconSvg(iconName);
  const iconColor = raw
    ? color
    : color ?? (withColor ? getSvgIconColor(iconName) : undefined);

  if (!iconSvg) return null;

  const baseClassName = raw ? rawBaseClassName : colorizedBaseClassName;
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <span
      aria-hidden="true"
      className={combinedClassName}
      style={iconColor ? { color: iconColor } : undefined}
      dangerouslySetInnerHTML={{ __html: iconSvg }}
    />
  );
}

export { SvgIcon };
