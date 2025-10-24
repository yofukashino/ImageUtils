import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { StickersStore } from "@lib/RequiredModules";
import Utils from "@Utils";
import Types from "@Types";

PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.Message,
  ({ message }: { message: Types.Message }, menu) => {
    if (!SettingValues.get("stickers", DefaultSettings.stickers)) return;

    menu.children = (menu?.children as React.ReactElement[]).filter(
      (c) =>
        !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
        !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
    );

    const index = menu?.children.findIndex((c) => c?.props?.id === "replugged");

    menu?.children?.splice?.(
      index,
      0,
      <ContextMenu.MenuGroup label="Image Utils">
        {message?.stickerItems?.length
          ? message?.stickerItems.map((sticker) =>
              StickersStore.getStickerById(sticker?.id)?.format_type === 3 ? null : (
                <ContextMenu.MenuItem
                  key={sticker.name}
                  id="imageUtils-sticker"
                  label={`View ${sticker.name}`}
                  {...Utils.mapMenuItem(
                    `https://cdn.discordapp.com/stickers/${sticker?.id}.${StickersStore.getStickerById(sticker?.id)?.format_type === 1 ? "png" : "png?passtrough=true"}`,
                  )}
                />
              ),
            )
          : null}
      </ContextMenu.MenuGroup>,
    );
  },
);
