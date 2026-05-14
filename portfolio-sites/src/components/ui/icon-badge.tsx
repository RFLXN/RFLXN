import type { ReactNode } from "react";

import { getReadableBrandColor } from "@/lib/color";
import { getSvgIconColor, getSvgIconSvg } from "@/lib/svg-assets";
import { SvgIcon } from "@/components/ui/svg-icon";

type IconBadgeProps = {
  label: ReactNode,
  icon?: ReactNode,
  iconName?: string,
  rawIcon?: boolean,
  withColor?: boolean,
  className?: string
};

const baseClassName = "inline-flex overflow-hidden rounded-md border border-app-border-strong bg-app-surface-strong text-[11px] font-medium text-app-text-strong sm:text-xs";

function IconBadge({
  icon,
  iconName,
  rawIcon = false,
  withColor = false,
  label,
  className
}: IconBadgeProps) {
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;
  const hasNamedIcon = iconName ? Boolean(getSvgIconSvg(iconName)) : false;
  const normalizedAccentColor = iconName && withColor && !rawIcon
    ? getReadableBrandColor(getSvgIconColor(iconName))
    : undefined;
  const iconContent = hasNamedIcon && iconName
    ? (
      <SvgIcon
        iconName={iconName}
        raw={rawIcon}
        color={normalizedAccentColor}
        className="[&>svg]:size-3.5"
      />
    )
    : icon;
  const hasIconContent = iconContent !== null && iconContent !== undefined && iconContent !== false;

  const rootStyle = normalizedAccentColor
    ? { borderColor: `${normalizedAccentColor}55` }
    : undefined;
  const iconStyle = normalizedAccentColor
    ? {
      borderColor: `${normalizedAccentColor}40`,
      backgroundColor: `${normalizedAccentColor}18`,
      color: normalizedAccentColor
    }
    : undefined;

  return (
    <span
      className={combinedClassName}
      style={rootStyle}
    >
      {hasIconContent ? (
        <span
          className="flex items-center justify-center border-r border-app-border-strong bg-app-surface px-2 text-app-accent [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:stroke-[1.9]"
          style={iconStyle}
        >
          {iconContent}
        </span>
      ) : null}
      <span className="px-2.5 py-1">
        {label}
      </span>
    </span>
  );
}

export { IconBadge };
