import { Injector, Logger, settings } from "replugged";
import { USRBG_URL, defaultSettings } from "./lib/consts";
import "./style.css";
import { registerSettings } from "./Components/Settings";
import Types from "./types";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ImageUtils");
const USRBG_RESPONSE = await fetch(USRBG_URL);
const USRBG_JSON = await USRBG_RESPONSE.json();
export const USRDB = new Map<string, Types.USRBD_USER>(
  USRBG_JSON.map((user: Types.USRBD_USER) => [user.uid, user]),
);
PluginLogger.log("Loaded USRBG Database.");
export const SettingValues = await settings.init("dev.tharki.ImageUtils", defaultSettings);

import Injections from "./patches/index";
import Listeners from "./listeners/index";

export const start = (): void => {
  registerSettings();
  Injections.applyInjections();
  Listeners.addListeners();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Listeners.removeListeners();
};

export { openImageModal } from "./lib/utils";
export { Settings } from "./Components/Settings.jsx";
