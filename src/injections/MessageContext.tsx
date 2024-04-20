import { PluginInjectorUtils, SettingValues } from "../index";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  const { StickersStore } = Modules;
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.Message,
    ({ message }: { message: Types.Message }, menu) => {
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
          {message?.stickerItems?.length
            ? message?.stickerItems.map((sticker) =>
                StickersStore.getStickerById(sticker.id)?.format_type === 3 ? null : (
                  <ContextMenu.MenuItem
                    id="imageUtils-sticker"
                    label={`View ${sticker.name}`}
                    {...Utils.mapMenuItem(
                      `https://cdn.discordapp.com/stickers/${sticker.id}.${StickersStore.getStickerById(sticker.id)?.format_type === 1 ? "png" : "png?passtrough=true"}`,
                    )}
                  />
                ),
              )
            : null}
        </ContextMenu.MenuGroup>,
      );
    },
  );
};
