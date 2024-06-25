import { PluginInjectorUtils, SettingValues } from "../index";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";

export default (): void => {
  const { IconUtils } = Modules;
  const ContextMenuEntry = (
    { guild }: Record<string, unknown> & { guild: Types.Guild },
    menu: Types.MenuProps,
  ): void => {
    if (!SettingValues.get("guild", defaultSettings.guild)) return;

    menu.children = (menu?.children as React.ReactElement[]).filter(
      (c) =>
        !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
        !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
    );

    const index = (menu?.children as React.ReactElement[]).findIndex(
      (c) => c?.props?.id === "replugged",
    );
    (menu?.children as React.ReactElement[])?.splice?.(
      index,
      0,
      <ContextMenu.MenuGroup label="Image Utils">
        {guild?.icon ? (
          <ContextMenu.MenuItem
            id="imageUtils-guildIcon"
            label="View Icon"
            {...Utils.mapMenuItem(
              IconUtils.getGuildIconURL({
                id: guild?.id,
                icon: guild?.icon,
                canAnimate: true,
              }) as string,
            )}
          />
        ) : null}
        {guild?.banner ? (
          <ContextMenu.MenuItem
            id="imageUtils-guildBanner"
            label="View Banner"
            {...Utils.mapMenuItem(
              IconUtils.getGuildBannerURL(
                {
                  id: guild?.id,
                  banner: guild?.banner,
                  canAnimate: true,
                },
                true,
              ) as string,
            )}
          />
        ) : null}
        {guild?.splash ? (
          <ContextMenu.MenuItem
            id="imageUtils-guildSplash"
            label="View Splash"
            {...Utils.mapMenuItem(IconUtils.getGuildSplashURL(guild, true) as string)}
          />
        ) : null}
      </ContextMenu.MenuGroup>,
    );
  };
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.GuildContext,
    ContextMenuEntry,
  );
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.GuildHeaderPopout,
    ContextMenuEntry,
  );
};
