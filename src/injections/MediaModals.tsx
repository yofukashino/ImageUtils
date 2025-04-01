import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import ImageUtils from "../Components/ImageUtils";
import ImageComponent from "../Components/Image";
import Types from "../types";

export default (): void => {
  const { MediaModal } = Modules;
  const Image = webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(
    MediaModal,
    "handleImageLoad",
  );

  PluginInjector.after(
    Image.prototype,
    "render",
    (_args, res, instance: Types.MediaModalsInstance) => {
      if (!res?.props || res?.props?.zoomable || res?.props?.alt === "Video") return res;
      const originalChilden = res.props.children ?? ImageComponent;
      res.props.id = "image-utils-modal";
      if (!SettingValues.get("hideLens", defaultSettings.hideLens) && originalChilden)
        res.props.children = (props) => (
          <ImageUtils
            {...instance.props}
            children={originalChilden}
            childProps={{
              ...props,
              className:
                SettingValues.get("darkenImage", defaultSettings.darkenImage) &&
                "imageUtils-backdrop",
            }}
            ready={instance.state.readyState === "READY"}
            src={props.src}
          />
        );
      return res;
    },
  );
};
