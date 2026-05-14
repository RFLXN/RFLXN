type RgbColor = {
  red: number,
  green: number,
  blue: number
};

const readableLuminanceThreshold = 0.18;
const whiteRgb = {
  red: 255,
  green: 255,
  blue: 255
};

const clampChannel = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
const toLinearChannel = (channel: number) => {
  const normalized = channel / 255;

  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
};
const getRelativeLuminance = ({ red, green, blue }: RgbColor) => (
  (0.2126 * toLinearChannel(red))
  + (0.7152 * toLinearChannel(green))
  + (0.0722 * toLinearChannel(blue))
);
const parseHexColor = (hexColor: string) => {
  const normalizedHexColor = hexColor.trim().replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalizedHexColor)) return null;

  return {
    red: Number.parseInt(normalizedHexColor.slice(0, 2), 16),
    green: Number.parseInt(normalizedHexColor.slice(2, 4), 16),
    blue: Number.parseInt(normalizedHexColor.slice(4, 6), 16)
  } satisfies RgbColor;
};
const toHexColor = ({ red, green, blue }: RgbColor) => `#${[ red, green, blue ]
  .map(channel => clampChannel(channel)
    .toString(16)
    .padStart(2, "0"))
  .join("")}`;
const mixRgb = (from: RgbColor, to: RgbColor, amount: number) => ({
  red: from.red + ((to.red - from.red) * amount),
  green: from.green + ((to.green - from.green) * amount),
  blue: from.blue + ((to.blue - from.blue) * amount)
} satisfies RgbColor);

function getReadableBrandColor(hexColor?: string) {
  if (!hexColor) return undefined;

  const parsedHexColor = parseHexColor(hexColor);

  if (!parsedHexColor) return hexColor;
  if (getRelativeLuminance(parsedHexColor) >= readableLuminanceThreshold) return hexColor;

  for (const amount of [ 0.2, 0.35, 0.5, 0.65, 0.8 ]) {
    const mixedColor = mixRgb(parsedHexColor, whiteRgb, amount);

    if (getRelativeLuminance(mixedColor) >= readableLuminanceThreshold) return toHexColor(mixedColor);
  }

  return toHexColor(mixRgb(parsedHexColor, whiteRgb, 0.8));
}

export { getReadableBrandColor };
