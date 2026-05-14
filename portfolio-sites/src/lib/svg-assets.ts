const svgModules = import.meta.glob("../assets/icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;
const colorModules = import.meta.glob("../assets/icons/*.color", {
  query: "?raw",
  import: "default",
  eager: true
}) as Record<string, string>;

const getAssetName = (assetPath: string, extension: string) => assetPath
  .split("/")
  .pop()
  ?.replace(extension, "");
const svgIcons = Object.fromEntries(Object.entries(svgModules).map(([ assetPath, svg ]) => [ getAssetName(assetPath, ".svg"), svg ]));
const colorIcons = Object.fromEntries(Object.entries(colorModules).map(([ assetPath, color ]) => [ getAssetName(assetPath, ".color"), color.trim() ]));

const getSvgIconColor = (iconName: string) => colorIcons[iconName];
const getSvgIconSvg = (iconName: string) => svgIcons[iconName];

export { getSvgIconColor, getSvgIconSvg };
