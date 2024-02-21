import { PluginInjectorUtils, SettingValues } from "../index";
import { ContextMenu } from "replugged/components";
import { StickersStore } from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.ExpressionPicker,
    ({ target }: { target: HTMLElement }, menu) => {
      if (!SettingValues.get("stickers", defaultSettings.stickers)) return;

      menu.children = (menu?.children as React.ReactElement[]).filter(
        (c) =>
          !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
          !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
      );

      const index = (menu?.children as React.ReactElement[]).findIndex(
        (c) => c.props.id === "replugged",
      );

      (menu?.children as React.ReactElement[])?.splice?.(
        index,
        0,
        <ContextMenu.MenuGroup label="Image Utils">
          {target.getAttribute("data-type") === "sticker" &&
          StickersStore.getStickerById(target.getAttribute("data-id"))?.format_type !== 3 ? (
            <ContextMenu.MenuItem
              id="imageUtils-sticker"
              label="View"
              {...Utils.mapMenuItem(
                `https://cdn.discordapp.com/stickers/${target.getAttribute("data-id")}.${StickersStore.getStickerById(target.getAttribute("data-id"))?.format_type === 1 ? "png" : "png?passtrough=true"}`,
              )}
            />
          ) : null}
        </ContextMenu.MenuGroup>,
      );
    },
  );
};
