// got link from https://github.com/Rico040/bunny-plugins/blob/master/plugins/userbg/src/index.tsx#L23C40-L23C76
export const USRBG_URL = "https://usrbg.is-hardly.online/users";
export const defaultSettings = {
  hideLens: false,
  darkenImage: true,
  saveValues: true,
  pixelZoom: false,
  invertScroll: true,
  square: false,
  zoom: 2,
  size: 100,
  scrollSpeed: 0.5,
  iconSize: ["128", "256", "512", "1024", "2048", "4096"],
  iconType: ["webp", "png", "jpg", "gif"],
  guild: true,
  user: true,
  gdm: true,
  userbg: true,
  stream: true,
  stickers: true,
  hex: true,
  host: true,
  dimensions: true,
  engines: ["Google", "Yandex", "SauceNAO", "IQDB", "TinEye", "ImgOps"],
};

export const searchEngines = {
  Google: "https://lens.google.com/uploadbyurl?url=",
  Yandex: "https://yandex.com/images/search?rpt=imageview&url=",
  SauceNAO: "https://saucenao.com/search.php?url=",
  IQDB: "https://iqdb.org/?url=",
  TinEye: "https://www.tineye.com/search?url=",
  ImgOps: "https://imgops.com/start?url=",
};
