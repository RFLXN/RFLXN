import { useId, useState, type ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ProfileListItem = {
  icon: ReactNode,
  label: string,
  text: string | string[],
  href?: string
};

type ProfileListProps = { items: ProfileListItem[] };

const rowClassName = "flex w-full items-center gap-4 py-3";
const textClassName = "ml-auto min-w-0 text-right text-sm text-app-text-soft transition-colors hover:text-app-text-strong sm:text-base";

type ProfileListRowProps = {
  item: ProfileListItem,
  isLast: boolean
};

function ProfileListRow({ item, isLast }: ProfileListRowProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const triggerId = useId();
  const itemTextClassName = item.href
    ? `${textClassName} underline decoration-app-border-strong underline-offset-4`
    : textClassName;
  const itemTextContent = Array.isArray(item.text)
    ? (
      <span className="inline-flex flex-col items-end gap-0.5">
        {item.text.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
          </span>
        ))}
      </span>
    )
    : item.text;
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const rowContent = (
    <>
      <TooltipTrigger
        id={triggerId}
        render={<span className="shrink-0 text-app-accent" />}
      >
        {item.icon}
      </TooltipTrigger>

      <span className={itemTextClassName}>
        {itemTextContent}
      </span>
    </>
  );

  return (
    <li>
      <Tooltip
        open={isOpen}
        triggerId={triggerId}
      >
        {item.href ? (
          <a
            href={item.href}
            className={`${rowClassName} rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral`}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onFocus={handleOpen}
            onBlur={handleClose}
          >
            {rowContent}
          </a>
        ) : (
          <div
            className={rowClassName}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            {rowContent}
          </div>
        )}

        <TooltipContent>
          {item.label}
        </TooltipContent>
      </Tooltip>

      {isLast ? null : <Separator />}
    </li>
  );
}

function ProfileList({ items }: ProfileListProps) {
  return (
    <TooltipProvider>
      <ul className="py-1">
        {items.map((item, index) => (
          <ProfileListRow
            key={index}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </TooltipProvider>
  );
}

export { ProfileList };
export type { ProfileListItem };
