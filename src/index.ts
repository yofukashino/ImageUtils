import { Injector, Logger, settings } from "replugged";
import { DefaultSettings } from "@consts";
import "./style.css";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("ImageUtils", "#ffffff80");
export const SettingValues = settings.init("dev.yofukashino.ImageUtils", DefaultSettings);
import Settings from "@components/Settings";
import Injections from "@Injections";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjections();
};

export { Settings } from "@components/Settings";

export { _zoom, _details, _expandVideo } from "./plaintextFunctions";
