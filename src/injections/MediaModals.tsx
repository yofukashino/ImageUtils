import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { MediaModal } from "@lib/RequiredModules";
import ImageUtils from "@components/ImageUtils";
import ImageComponent from "@components/Image";

import type { Image, ImageProps, ImageState } from "@lib/RequiredModules/MediaModal";

const Image = webpack.getFunctionBySource<Image>(MediaModal, "handleImageLoad");

PluginInjector.after(
  Image.prototype,
  "render",
  (_args, res, instance: { props: ImageProps; state: ImageState }) => {
    return res;
    if (!res?.props || res?.props?.zoomable || res?.props?.alt === "Video") return res;
    const originalChilden = res.props.children ?? ImageComponent;
    res.props.id = "image-utils-modal";
    if (!SettingValues.get("hideLens", DefaultSettings.hideLens) && originalChilden)
      res.props.children = (props) => (
        <ImageUtils
          {...instance.props}
          ImageComponent={originalChilden}
          childProps={{
            ...props,
            className:
              SettingValues.get("darkenImage", DefaultSettings.darkenImage) &&
              "imageUtils-backdrop",
          }}
          ready={instance.state.readyState === "READY"}
          src={props.src}
        />
      );
    return res;
  },
);
