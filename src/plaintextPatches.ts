import Types from "./types";
export default [
  {
    find: "image-menu",
    replacements: [
      {
        match: /(\w+)(,{onClick:.{10,30}ZOOM_OUT_BUTTON_PRESSED)/,
        replace: (_, component: string, suffix: string) =>
          `replugged.plugins.getExports("dev.yofukashino.ImageUtils")?._zoom?.(${component})${suffix}`,
      },
      {
        match: /\[("IMAGE"===\w+\.type)/,
        replace: (_, suffix: string) =>
          `[replugged.plugins.getExports("dev.yofukashino.ImageUtils")?._details?.(arguments[0]?.item),${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
