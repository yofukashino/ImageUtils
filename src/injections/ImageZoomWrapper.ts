import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const ImageZoomWrapper = webpack.getExportsForProps<{
    $$typeof: symbol;
    type: Types.DefaultTypes.AnyFunction;
    compare: undefined;
  }>(Modules.ImageZoomWrapper, ["$$typeof"]);

  PluginInjector.after(ImageZoomWrapper, "type", (_args, res: React.ReactElement) => {
    if (!res?.props || res?.props?.alt === "Video") return res;
    if (!SettingValues.get("hideLens", defaultSettings.hideLens)) delete res.props.onClick;
    return res;
  });
};
