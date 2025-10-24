import Types from "./types";
export default [
  {
    find: "image-menu",
    replacements: [
      {
        match: /(\w+)(,{onClick:.{10,30}ZOOM_OUT_BUTTON_PRESSED)/,
        replace: (_, zoomJsx: string, suffix: string) => `$exports?._zoom?.(${zoomJsx})${suffix}`,
      },
      {
        match: /\[("IMAGE"===\w+\.type)/,
        replace: (_, suffix: string) => `[$exports?._details?.(arguments[0]?.item ?? {}),${suffix}`,
      },
    ],
  },
  /*   {
    find: "this.setVolumeButtonRef",
    replacements: [
      {
        match: /(children:\i===\i\.VIDEO\?\(0,)\w+\.jsx\)\(/,
        replace: (_, prefix: string) => `${prefix}$exports?._expandVideo)(this,`,
      },
    ],
  }, */
] as Types.DefaultTypes.PlaintextPatch[];
