import { webpack } from "replugged";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import ImageDetails from "../Components/ImageDetails";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  const { ImageModalModule } = Modules;
  const ImageModal = webpack.getFunctionKeyBySource(
    Modules.ImageModalModule,
    ".Messages.OPEN_IN_BROWSER",
  );

  PluginInjector.after(ImageModalModule, ImageModal, (_args, res: Types.ReactTree) => {
    const container = Utils.findInReactTree(
      res,
      (c: Types.ReactTree) =>
        c?.type === "div" && c?.props?.className?.includes?.("optionsContainer"),
    ) as Types.ReactTree;
    const Image = Utils.findInReactTree(
      res,
      (c: Types.ReactTree) =>
        c?.type?.toString?.()?.includes?.("Types.ATTACHMENT") && c?.props?.src,
    ) as Types.ReactTree;
    if (!Image || !container) return res;
    container.props.children = (
      <ImageDetails src={Image.props.src} children={container.props.children} />
    );
    return res;
  });
};
