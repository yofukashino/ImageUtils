import { PluginInjector } from "../index";
import { ImageModalModule } from "../lib/requiredModules";
import ImageDetails from "../Components/ImageDetails";
export default (): void => {
  PluginInjector.before(ImageModalModule, "ImageModal", (args) => {
    const [{ renderLinkComponent: OriginalCompoennt, ...props }] = args;

    if (!OriginalCompoennt || OriginalCompoennt?.toString?.()?.includes?.("childProps"))
      return args;
    args[0].renderLinkComponent = (childProps) => (
      <ImageDetails {...props} childProps={childProps} children={OriginalCompoennt} />
    );
    return args;
  });
};
