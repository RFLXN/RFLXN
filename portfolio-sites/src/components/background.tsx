type BackgroundProps = { totalHeight?: number };

function Background({ totalHeight }: BackgroundProps) {
  const resolvedHeight = totalHeight ? `${totalHeight}px` : "100%";

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
      style={{ height: resolvedHeight }}
    >
      <div className="absolute inset-0 bg-app-bg" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 12% 10%, rgb(145 207 169 / 0.18) 0%, transparent 26%)",
            "radial-gradient(circle at 82% 28%, rgb(108 165 144 / 0.15) 0%, transparent 24%)",
            "radial-gradient(circle at 24% 58%, rgb(150 190 214 / 0.11) 0%, transparent 22%)",
            "radial-gradient(circle at 72% 86%, rgb(145 207 169 / 0.16) 0%, transparent 25%)",
            "linear-gradient(180deg, rgb(226 244 233 / 0.018) 0%, transparent 20%, rgb(145 207 169 / 0.045) 52%, transparent 100%)"
          ].join(", ")
        }}
      />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: [
            "linear-gradient(180deg, transparent 0%, rgb(145 207 169 / 0.032) 34%, transparent 72%)",
            "radial-gradient(circle at 50% 50%, rgb(226 244 233 / 0.025) 0%, transparent 42%)"
          ].join(", ")
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{ backgroundImage: "radial-gradient(circle at top, var(--app-glow-top), transparent 28%)" }}
      />
    </div>
  );
}

export { Background };
