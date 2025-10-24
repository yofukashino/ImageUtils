import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import {
  ApplicationStreamPreviewStore,
  ApplicationStreamingStore,
  GuildMemberStore,
  IconUtils,
} from "@lib/RequiredModules";
import USRDB from "@USRDB";
import Utils from "@Utils";
import Types from "@Types";

const ContextMenuEntry = (
  { user, guildId }: Record<string, unknown> & { user: Types.User; guildId: string },
  menu,
): void => {
  if (!SettingValues.get("user", DefaultSettings.user)) return;
  menu.children = (menu?.children as React.ReactElement[]).filter(
    (c) =>
      !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
      !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
  );
  const member = GuildMemberStore.getMember(guildId, user.id);
  const usrbg = SettingValues.get("userbg", DefaultSettings.userbg) && USRDB.get(user.id);
  const stream =
    SettingValues.get("stream", DefaultSettings.stream) &&
    ApplicationStreamingStore.getAnyStreamForUser(user.id);
  const streamPreviewUrl = ApplicationStreamPreviewStore.getPreviewURL(
    stream?.guildId,
    stream?.channelId,
    stream?.ownerId,
  );
  const index = (menu?.children as React.ReactElement[]).findIndex(
    (c) => c?.props?.id === "replugged",
  );
  (menu?.children as React.ReactElement[])?.splice?.(
    index,
    0,
    <ContextMenu.MenuGroup label="Image Utils">
      {user?.avatar ? (
        <ContextMenu.MenuItem
          id="imageUtils-userAvatar"
          label="View Avatar"
          {...Utils.mapMenuItem(
            IconUtils.getUserAvatarURL(
              {
                id: user?.id,
                avatar: user?.avatar,
                canAnimate: true,
              },
              true,
            ),
          )}
        />
      ) : null}
      {user?.banner ? (
        <ContextMenu.MenuItem
          id="imageUtils-userBanner"
          label="View Banner"
          {...Utils.mapMenuItem(IconUtils.getUserBannerURL(user, true))}
        />
      ) : null}
      {member?.avatar ? (
        <ContextMenu.MenuItem
          id="imageUtils-memberAvatar"
          label="View Guild Member Avatar"
          {...Utils.mapMenuItem(IconUtils.getGuildMemberAvatarURL(member, true))}
        />
      ) : null}
      {member?.banner ? (
        <ContextMenu.MenuItem
          id="imageUtils-memberBanner"
          label="View Guild Member Banner"
          {...Utils.mapMenuItem(IconUtils.getGuildMemberBannerURL(member, true))}
        />
      ) : null}
      {usrbg ? (
        <ContextMenu.MenuItem
          id="imageUtils-usrBg"
          label="View USRBG Banner"
          {...Utils.mapMenuItem(usrbg)}
        />
      ) : null}
      {streamPreviewUrl ? (
        <ContextMenu.MenuItem
          id="imageUtils-stream"
          label="View Stream Preview"
          {...Utils.mapMenuItem(streamPreviewUrl)}
        />
      ) : null}
    </ContextMenu.MenuGroup>,
  );
};

PluginInjectorUtils.addMenuItem(Types.DefaultTypes.ContextMenuTypes.UserContext, ContextMenuEntry);
PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.UserProfileActions,
  ContextMenuEntry,
);
PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.UserProfileOverflowMenu,
  ContextMenuEntry,
);
