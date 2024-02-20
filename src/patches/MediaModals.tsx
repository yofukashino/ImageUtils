import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { MediaModal } from "../lib/requiredModules";
import ImageUtils from "../Components/ImageUtils";
import Types from "../types";
export default (): void => {
  PluginInjector.after(
    MediaModal.default.prototype,
    "render",
    (_args, res, instance: Types.MediaModalsInstance) => {
      if (!res?.props || res?.props?.zoomable || res?.props?.alt === "Video") return res;
      const originalChilden = res.props.children;
      res.props.id = "image-utils-modal";
      if (!SettingValues.get("hideLens", defaultSettings.hideLens))
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
