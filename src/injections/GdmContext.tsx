import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { IconUtils } from "@lib/RequiredModules";
import Utils from "@Utils";
import Types from "@Types";

PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.GdmContext,
  ({ channel }: { channel: Types.Channel }, menu) => {
    if (!SettingValues.get("gdm", DefaultSettings.gdm)) return;

    menu.children = (menu?.children as React.ReactElement[]).filter(
      (c) =>
        !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
        !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
    );

    const index = menu?.children.findIndex((c) => c.props.id === "replugged");
    menu?.children?.splice?.(
      index,
      0,
      <ContextMenu.MenuGroup label="Image Utils">
        {channel?.icon ? (
          <ContextMenu.MenuItem
            id="imageUtils-gdmIcon"
            label="View Icon"
            {...Utils.mapMenuItem(
              IconUtils.getChannelIconURL(
                {
                  id: channel?.id,
                  icon: channel?.icon,
                  canAnimate: true,
                },
                true,
              ),
            )}
          />
        ) : null}
      </ContextMenu.MenuGroup>,
    );
  },
);
