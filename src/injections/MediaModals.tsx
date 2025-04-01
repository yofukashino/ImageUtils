import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import ImageUtils from "../Components/ImageUtils";

export default (): void => {
  const { Image } = Modules;

  PluginInjector.after(Image, "render", ([props], res: React.ReactElement) => {
    if (!props || props?.zoomable || props?.alt === "Video") return res;
    const Image = res.props.children;
    Image.props.id = "image-utils-modal";
    if (!SettingValues.get("hideLens", defaultSettings.hideLens) && Image.props.children)
      Image.props.children = (
        <ImageUtils
          {...props}
          children={Image.props.children}
          ready={props.readyState === "READY"}
          src={props.src}
        />
      );
    return res;
  });
};
