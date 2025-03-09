import { webpack } from "replugged";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import ImageDetails from "../Components/ImageDetails";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const ImageModalModule = await Modules.ImageModalModulePromise;
  const ImageModal = webpack.getFunctionKeyBySource(ImageModalModule, ".zoomedMediaFitWrapper");

  PluginInjector.after(ImageModalModule, ImageModal, ([props], res: Types.ReactTree) => {
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

    const isImage =
      props?.items?.find?.(
        (i) =>
          i.original === Image.props.src ||
          i.url === Image.props.src ||
          i.proxyUrl === Image.props.src,
      )?.type !== "VIDEO";
    if (!isImage || !Image || !container) return res;

    container.props.children = (
      <ImageDetails src={Image.props.src} children={container.props.children} />
    );
    return res;
  });
};
