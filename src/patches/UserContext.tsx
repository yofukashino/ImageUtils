import { PluginInjectorUtils, SettingValues, USRDB } from "../index";
import { ContextMenu } from "replugged/components";
import {
  ApplicationStreamPreviewStore,
  ApplicationStreamingStore,
  GuildMemberStore,
  IconUtils,
} from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.UserContext,
    ({ user, guildId }: { user: Types.User; guildId: string }, menu) => {
      if (!SettingValues.get("user", defaultSettings.user)) return;
      menu.children = (menu?.children as React.ReactElement[]).filter(
        (c) =>
          !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
          !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
      );
      const member = GuildMemberStore.getMember(guildId, user.id) as Types.GuildMember;
      const usrbg = SettingValues.get("userbg", defaultSettings.userbg) && USRDB.get(user.id);
      const stream =
        SettingValues.get("stream", defaultSettings.stream) &&
        (ApplicationStreamingStore.getAnyStreamForUser(user.id) as {
          guildId: string;
          channelId: string;
          ownerId: string;
        });
      const index = (menu?.children as React.ReactElement[]).findIndex(
        (c) => c.props.id === "replugged",
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
                IconUtils.default.getUserAvatarURL(
                  {
                    id: user?.id,
                    avatar: user?.avatar,
                    canAnimate: true,
                  },
                  true,
                ) as string,
              )}
            />
          ) : null}
          {user?.banner ? (
            <ContextMenu.MenuItem
              id="imageUtils-userBanner"
              label="View Banner"
              {...Utils.mapMenuItem(IconUtils.default.getUserBannerURL(user, true) as string)}
            />
          ) : null}
          {member?.avatar ? (
            <ContextMenu.MenuItem
              id="imageUtils-memberAvatar"
              label="View Guild Member Avatar"
              {...Utils.mapMenuItem(
                IconUtils.default.getGuildMemberAvatarURL(member, true) as string,
              )}
            />
          ) : null}
          {member?.banner ? (
            <ContextMenu.MenuItem
              id="imageUtils-memberBanner"
              label="View Guild Member Banner"
              {...Utils.mapMenuItem(
                IconUtils.default.getGuildMemberBannerURL(member, true) as string,
              )}
            />
          ) : null}
          {usrbg?.img ? (
            <ContextMenu.MenuItem
              id="imageUtils-usrBg"
              label="View USRBG Banner"
              {...Utils.mapMenuItem(usrbg.img)}
            />
          ) : null}
          {stream ? (
            <ContextMenu.MenuItem
              id="imageUtils-stream"
              label="View Stream Preview"
              {...Utils.mapMenuItem(
                ApplicationStreamPreviewStore.getPreviewURL(
                  stream.guildId,
                  stream.channelId,
                  stream.ownerId,
                ) as string,
              )}
            />
          ) : null}
        </ContextMenu.MenuGroup>,
      );
    },
  );
};
