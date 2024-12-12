import Modules from "../lib/requiredModules";
import injectExpressionPickerContext from "./ExpressionPickerContext";
import injectGdmContext from "./GdmContext";
import injectGuildContext from "./GuildContext";
import injectImageContext from "./ImageContext";
import injectImageModal from "./ImageModal";
import injectMediaModals from "./MediaModals";
import injectMessageContext from "./MessageContext";
import injectStreamContext from "./StreamContext";
import injectUserContext from "./UserContext";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectExpressionPickerContext();
  injectGdmContext();
  injectGuildContext();
  injectImageContext();
  void injectImageModal();
  injectMediaModals();
  injectMessageContext();
  injectStreamContext();
  injectUserContext();
};

export default { applyInjections };
