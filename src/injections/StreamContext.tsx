import { PluginInjectorUtils, SettingValues } from "../index";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  const { ApplicationStreamPreviewStore } = Modules;
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
      if (!SettingValues.get("stream", defaultSettings.stream)) return;

      menu.children = (menu?.children as React.ReactElement[]).filter(
        (c) =>
          !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
          !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
      );

      const index = (menu?.children as React.ReactElement[]).findIndex(
        (c) => c.props.id === "replugged",
      );
      const streamPreviewUrl = ApplicationStreamPreviewStore.getPreviewURL(
        stream?.guildId,
        stream?.channelId,
        stream?.ownerId,
      ) as string;
      (menu?.children as React.ReactElement[])?.splice?.(
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
};
