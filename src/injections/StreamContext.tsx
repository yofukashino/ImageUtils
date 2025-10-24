import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { ApplicationStreamPreviewStore } from "@lib/RequiredModules";
import Utils from "@Utils";
import Types from "@Types";

PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.StreamContext,
  (
    {
      stream,
    }: {
      stream: {
        channelId: string;
        guildId: string;
        ownerId: string;
        streamType: string;
      };
    },
    menu,
  ) => {
    if (!SettingValues.get("stream", DefaultSettings.stream)) return;

    menu.children = (menu?.children as React.ReactElement[]).filter(
      (c) =>
        !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
        !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
    );

    const index = menu?.children.findIndex((c) => c.props.id === "replugged");
    const streamPreviewUrl = ApplicationStreamPreviewStore.getPreviewURL(
      stream?.guildId,
      stream?.channelId,
      stream?.ownerId,
    );
    menu?.children?.splice?.(
      index,
      0,
      <ContextMenu.MenuGroup label="Image Utils">
        {streamPreviewUrl ? (
          <ContextMenu.MenuItem
            id="imageUtils-stream"
            label="View Stream Preview"
            {...Utils.mapMenuItem(streamPreviewUrl)}
          />
        ) : null}
      </ContextMenu.MenuGroup>,
    );
  },
);
