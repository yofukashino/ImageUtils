import { PluginInjector, PluginLogger } from "@this";
import Modules from "@lib/RequiredModules";

const InjectionNames = [
  "ExpressionPickerContext.tsx",
  "GdmContext.tsx",
  "GuildContext.tsx",
  "ImageContext.tsx",
  "ImageZoomWrapper.ts",
  "MediaModals.tsx",
  "MessageContext.tsx",
  "StreamContext.tsx",
  "UserContext.tsx",
] as const;

export const applyInjections = async (): Promise<void> => {
  try {
    await Modules.loadModules();
    await Promise.all(InjectionNames.map((name) => import(`./${name}`)));
  } catch (err: unknown) {
    PluginLogger.error(err);
  }
};

export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
};

export default { applyInjections, removeInjections };
