import patchExpressionPickerContext from "./ExpressionPickerContext";
import patchGdmContext from "./GdmContext";
import patchGuildContext from "./GuildContext";
import patchImageContext from "./ImageContext";
import patchImageModal from "./ImageModal";
import patchMediaModals from "./MediaModals";
import patchMessageContext from "./MessageContext";
import patchStreamContext from "./StreamContext";
import patchUserContext from "./UserContext";
export const applyInjections = (): void => {
  patchExpressionPickerContext();
  patchGdmContext();
  patchGuildContext();
  patchImageContext();
  patchImageModal();
  patchMediaModals();
  patchMessageContext();
  patchStreamContext();
  patchUserContext();
};

export default { applyInjections };
