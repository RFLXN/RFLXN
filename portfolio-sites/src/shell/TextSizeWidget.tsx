import { ALargeSmall } from "lucide-react";
import { useLayoutEffect } from "react";
import {
  textSizes,
  textSizeLabels,
  usePreferencesStore,
} from "../store/preferencesStore";

export function TextSizePreference() {
  const textSize = usePreferencesStore((s) => s.textSize);
  useLayoutEffect(() => {
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);
  return null;
}
export function TextSizeWidget() {
  const textSize = usePreferencesStore((s) => s.textSize);
  return (
    <div
      className="text-size-widget"
      role="group"
      aria-label="글자 크기"
      title="글자 크기 조절"
    >
      <span className="text-size-label" aria-hidden="true">
        <ALargeSmall size={18} />
      </span>
      {textSizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-label={`글자 크기 ${textSizeLabels[size]}`}
          aria-pressed={textSize === size}
          title={`글자 크기: ${textSizeLabels[size]}`}
          onClick={() => usePreferencesStore.getState().setTextSize(size)}
        >
          {textSizeLabels[size]}
        </button>
      ))}
    </div>
  );
}
