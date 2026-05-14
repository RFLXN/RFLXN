import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { createPortal } from "react-dom";

type PreviewImageProps = {
  src: string,
  alt: string,
  title?: string,
  className?: string
};

const previewClassName = "relative aspect-square w-40 overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-[0_10px_30px_rgb(0_0_0_/_0.18)] sm:w-44";

function PreviewImage({ src, alt, title, className }: PreviewImageProps) {
  const [ isOpen, setIsOpen ] = useState(false);
  const combinedClassName = className
    ? `${previewClassName} ${className}`
    : previewClassName;

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => (
      event.key === "Escape"
        ? setIsOpen(false)
        : undefined
    );

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ isOpen ]);

  let overlay = null;

  if (isOpen) {
    overlay = (
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(8_10_16_/_0.84)] p-4 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <button
          type="button"
          aria-label="Close preview"
          className="absolute right-4 top-4 rounded-full border border-app-border bg-app-surface-overlay p-2 text-app-text transition-colors hover:border-app-border-strong hover:text-app-text-strong"
          onClick={() => setIsOpen(false)}
        >
          <X className="size-4" />
        </button>

        <img
          src={src}
          alt={alt}
          className="max-h-[88vh] w-auto max-w-[94vw] rounded-xl border border-app-border bg-app-surface shadow-[0_20px_60px_rgb(0_0_0_/_0.35)]"
          onClick={event => event.stopPropagation()}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="group inline-flex align-top text-left [&:not(:last-child)]:mr-3"
        onClick={() => setIsOpen(true)}
      >
        <div className={combinedClassName}>
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.38] saturate-[0.8] transition-transform duration-200 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_10_16_/_0.08),rgb(8_10_16_/_0.46))]" />

          {title ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <span className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-[15px]">
                {title}
              </span>
            </div>
          ) : null}

          <div className="pointer-events-none absolute bottom-3 right-3 translate-y-1 rounded-full border border-white/18 bg-[rgb(8_10_16_/_0.56)] p-2 text-white opacity-0 shadow-[0_8px_24px_rgb(0_0_0_/_0.22)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <Search className="size-3.5" />
          </div>
        </div>
      </button>

      {typeof document !== "undefined" && overlay ? (
        createPortal(overlay, document.body)
      ) : null}
    </>
  );
}

export { PreviewImage };
