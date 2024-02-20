import { PluginInjectorUtils, SettingValues } from "../index";
import { components as DiscordComponents } from "replugged/common";
import { ContextMenu } from "replugged/components";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings, searchEngines } from "../lib/consts";
const { MenuSliderControl } = DiscordComponents as typeof DiscordComponents & {
  MenuSliderControl: React.ComponentType<{
    ref: unknown;
    minValue: number;
    maxValue: number;
    value: number;
    onChange(value: number): void;
    renderValue?(value: number): string;
  }>;
};
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.ImageContext,
    ({ src }: { src: string }, menu) => {
      menu.children = (menu?.children as React.ReactElement[]).filter(
        (c) =>
          !c?.props?.children?.props?.id?.includes?.("imageUtils") &&
          !c?.props?.children?.some?.((i) => i?.props?.id?.includes?.("imageUtils")),
      );
      const [square, setSquare] = Utils.useSettingArray(
        SettingValues,
        "square",
        defaultSettings.square,
      );
      const [pixelZoom, setPixelZoom] = Utils.useSettingArray(
        SettingValues,
        "pixelZoom",
        defaultSettings.pixelZoom,
      );

      (menu?.children as React.ReactElement[])?.unshift?.(
        <ContextMenu.MenuGroup>
          <ContextMenu.MenuCheckboxItem
            id="imageUtils-square"
            label="Square Lens"
            checked={square}
            action={() => setSquare(!square)}
          />
          <ContextMenu.MenuCheckboxItem
            id="imageUtils-pixelZoom"
            label="Pixel Zoom"
            checked={pixelZoom}
            action={() => setPixelZoom(!pixelZoom)}
          />
          <ContextMenu.MenuControlItem
            id="imageUtils-zoom"
            label="Zoom"
            control={(props, ref) => (
              <MenuSliderControl
                ref={ref}
                {...props}
                minValue={1}
                maxValue={50}
                {...Utils.useSetting(SettingValues, "zoom", defaultSettings.zoom)}
                renderValue={(value: number) => `${value.toFixed(0)}x`}
              />
            )}
          />
          <ContextMenu.MenuControlItem
            id="imageUtils-size"
            label="Lens Size"
            control={(props, ref) => (
              <MenuSliderControl
                ref={ref}
                {...props}
                minValue={50}
                maxValue={1000}
                {...Utils.useSetting(SettingValues, "size", defaultSettings.size)}
                renderValue={(value: number) => `${value.toFixed(0)}px`}
              />
            )}
          />
          <ContextMenu.MenuControlItem
            id="imageUtils-speed"
            label="Scroll Speed"
            control={(props, ref) => (
              <MenuSliderControl
                ref={ref}
                {...props}
                minValue={0.1}
                maxValue={5}
                {...Utils.useSetting(SettingValues, "scrollSpeed", defaultSettings.scrollSpeed)}
                renderValue={(value: number) => `${value.toFixed(3)}x`}
              />
            )}
          />
          {SettingValues.get("engines", defaultSettings.engines).length > 0 && (
            <ContextMenu.MenuItem
              label="Search Image"
              id="imageUtils-search-image"
              action={() => {
                for (const [, engine] of Object.entries(searchEngines).filter(([engine]) =>
                  SettingValues.get("engines", defaultSettings.engines).includes(engine),
                )) {
                  open(`${engine}${encodeURIComponent(src)}`, "_blank");
                }
              }}>
              {SettingValues.get("engines", defaultSettings.engines).length > 1 &&
                Object.keys(searchEngines)
                  .filter((engine) =>
                    SettingValues.get("engines", defaultSettings.engines).includes(engine),
                  )
                  .map((engine) => (
                    <ContextMenu.MenuItem
                      id={`search-image-${engine}`}
                      icon={() => (
                        <img
                          style={{
                            borderRadius: "50%",
                          }}
                          aria-hidden="true"
                          height={16}
                          width={16}
                          src={new URL("/favicon.ico", searchEngines[engine])
                            .toString()
                            .replace("lens.", "")}
                        />
                      )}
                      label={engine}
                      action={() => open(`${engine}${encodeURIComponent(src)}`, "_blank")}
                    />
                  ))}
            </ContextMenu.MenuItem>
          )}
        </ContextMenu.MenuGroup>,
      );
    },
  );
};
