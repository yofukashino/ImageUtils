import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ImageUtils", "#b380ff");
export const USRDB = new Map<string, string>();
export const SettingValues = await settings.init("dev.yofukashino.ImageUtils", defaultSettings);
import Settings from "./Components/Settings";
import Injections from "./injections/index";
import Utils from "./lib/utils";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
  void Utils.loadUSRBD();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings.jsx";

export { _zoom, _details } from "./plaintextFunctions";
