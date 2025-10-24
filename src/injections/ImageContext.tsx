import { webpack } from "replugged";
import { components } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { PluginInjectorUtils, SettingValues } from "@this";
import { DefaultSettings, SearchEngines } from "@consts";
import Utils from "@Utils";
import Types from "@Types";

const MenuSliderControl = webpack.getComponentBySource<Types.SliderControl>(components, "slider");

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
      DefaultSettings.square,
    );
    const [pixelZoom, setPixelZoom] = Utils.useSettingArray(
      SettingValues,
      "pixelZoom",
      DefaultSettings.pixelZoom,
    );

    const engines = SettingValues.useValue("engines", DefaultSettings.engines);
    const hideLens = SettingValues.useValue("hideLens", DefaultSettings.hideLens);

    menu?.children?.unshift?.(
      <ContextMenu.MenuGroup>
        {hideLens ? null : (
          <>
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
                  {...Utils.useSetting(SettingValues, "zoom", DefaultSettings.zoom)}
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
                  {...Utils.useSetting(SettingValues, "size", DefaultSettings.size)}
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
                  {...Utils.useSetting(SettingValues, "scrollSpeed", DefaultSettings.scrollSpeed)}
                  renderValue={(value: number) => `${value.toFixed(3)}x`}
                />
              )}
            />
          </>
        )}
        {engines.length > 0 && (
          <ContextMenu.MenuItem
            label="Search Image"
            id="imageUtils-search-image"
            action={() => {
              for (const [, engine] of Object.entries(SearchEngines).filter(([engine]) =>
                engines.includes(engine),
              )) {
                open(`${engine}${encodeURIComponent(src)}`, "_blank");
              }
            }}>
            {engines.length > 1 &&
              Object.keys(SearchEngines)
                .filter((engine) => engines.includes(engine))
                .map((engine: keyof typeof SearchEngines) => (
                  <ContextMenu.MenuItem
                    key={engine}
                    id={`search-image-${engine}`}
                    icon={() => (
                      <img
                        style={{
                          borderRadius: "50%",
                        }}
                        aria-hidden="true"
                        height={16}
                        width={16}
                        src={new URL("/favicon.ico", SearchEngines[engine])
                          .toString()
                          .replace("lens.", "")}
                      />
                    )}
                    label={engine}
                    action={() =>
                      open(`${SearchEngines[engine]}${encodeURIComponent(src)}`, "_blank")
                    }
                  />
                ))}
          </ContextMenu.MenuItem>
        )}
      </ContextMenu.MenuGroup>,
    );
  },
);
