import Types from "./types";

export default [
  {
    find: "",
    replacements: [
      {
        match: /^/,
        replace: () => ``,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
