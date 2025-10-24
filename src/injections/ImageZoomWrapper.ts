import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { ImageZoomWrapper } from "@lib/RequiredModules";

PluginInjector.after(ImageZoomWrapper, "type", (_args, res: React.ReactElement) => {
  if (!res?.props || res?.props?.alt === "Video") return res;
  if (!SettingValues.get("hideLens", DefaultSettings.hideLens)) {
    delete res.props.onClick;
    delete res.props.onMouseDown;
    delete res.props.onMouseUp;
  }
  return res;
});
