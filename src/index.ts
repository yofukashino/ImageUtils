import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
import { registerSettings } from "./Components/Settings";
import Types from "./types";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ImageUtils", "#b380ff");
export const USRDB = new Map<string, Types.USRBD_USER>();

export const SettingValues = await settings.init("dev.yofukashino.ImageUtils", defaultSettings);

import Injections from "./patches/index";
import Utils from "./lib/utils";

export const start = (): void => {
  registerSettings();
  Injections.applyInjections();
  void Utils.loadUSRBD();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { openImageModal } from "./lib/utils";
export { Settings } from "./Components/Settings.jsx";
