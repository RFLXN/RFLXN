import type { CSSProperties } from "react";
import { technologyBrands } from "../../content/technologyBrands";

export function TechnologyTag({ name }: { name: string }) {
  const brand = technologyBrands[name];
  if (!brand) return <span>{name}</span>;

  return (
    <span
      className="technology-tag"
      style={{ "--brand-color": brand.color } as CSSProperties}
    >
      <img
        src={brand.icon}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className={
          name === "Next.js"
            ? "technology-icon inverted"
            : brand.monochrome
              ? "technology-icon monochrome"
              : "technology-icon"
        }
        draggable={false}
      />
      {name}
    </span>
  );
}
