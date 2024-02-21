import { React } from "replugged/common";
import {
  Category,
  CheckboxItem,
  Flex,
  FormItem,
  SliderItem,
  SwitchItem,
} from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings, searchEngines } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const Settings = (): React.ReactElement => {
  return (
    <div>
      <Category title="Lens Settings">
        <SwitchItem
          note="Disable the ability to zoom and all things related to it."
          {...Utils.useSetting(SettingValues, "hideLens", defaultSettings.hideLens)}>
          Disable Lens
        </SwitchItem>
        <SwitchItem
          note="Darken background Image when zooming."
          {...Utils.useSetting(SettingValues, "darkenImage", defaultSettings.darkenImage)}>
          Darken Image
        </SwitchItem>
        <SwitchItem
          note="Save zoom and lens size when using scroll wheel."
          {...Utils.useSetting(SettingValues, "darkenImage", defaultSettings.darkenImage)}>
          Save Modifications
        </SwitchItem>
        <SwitchItem
          note="Pixelated Image Rendering Sample, Refer to googlechrome.github.io/samples/image-rendering-pixelated/index.html for more info."
          {...Utils.useSetting(SettingValues, "pixelZoom", defaultSettings.pixelZoom)}>
          Pixel Zoom
        </SwitchItem>
        <SwitchItem
          note="Invert the effect of scroll when using it to change lens size/zoom."
          {...Utils.useSetting(SettingValues, "invertScroll", defaultSettings.invertScroll)}>
          Invert Scrool
        </SwitchItem>
        <SwitchItem
          note="Use a square lens. (Default: Round)"
          {...Utils.useSetting(SettingValues, "square", defaultSettings.square)}>
          Square Lens
        </SwitchItem>
        <SliderItem
          {...Utils.useSetting(SettingValues, "zoom", defaultSettings.zoom)}
          note="The strength of zoom with lens."
          minValue={1}
          maxValue={50}
          onValueRender={(value: number) => `${value.toFixed(0)}x`}>
          Zoom
        </SliderItem>
        <SliderItem
          {...Utils.useSetting(SettingValues, "size", defaultSettings.size)}
          note="The size of lens for zoom."
          minValue={50}
          maxValue={1000}
          onValueRender={(value: number) => `${value.toFixed(0)}x`}>
          Lens Size
        </SliderItem>
        <SliderItem
          {...Utils.useSetting(SettingValues, "scrollSpeed", defaultSettings.scrollSpeed)}
          note="How much each step of scroll wheel changes the lens size/zoom."
          minValue={0.1}
          maxValue={5}
          onValueRender={(value: number) => `${value.toFixed(3)}x`}>
          Scroll Speed
        </SliderItem>
      </Category>
      <Category title="Image Details">
        <SwitchItem
          note="Show Hex code in image footer of wherever on image your cursor is. (Buddy on Animated Stickers)"
          {...Utils.useSetting(SettingValues, "hex", defaultSettings.hex)}>
          Hex Color Code
        </SwitchItem>
        <SwitchItem
          note="Show Height and width in image footer. (Height*Width)"
          {...Utils.useSetting(SettingValues, "dimensions", defaultSettings.dimensions)}>
          Dimensions
        </SwitchItem>
        <SwitchItem
          note="Show Host website in image footer."
          {...Utils.useSetting(SettingValues, "host", defaultSettings.host)}>
          Image Host
        </SwitchItem>
      </Category>
      <Category title="Context Menu">
        <SwitchItem
          note="Show options for guild/server's icon/banner/splash."
          {...Utils.useSetting(SettingValues, "guild", defaultSettings.guild)}>
          Guild/Server Context
        </SwitchItem>
        <SwitchItem
          note="Show options for user/member's avatar/banner."
          {...Utils.useSetting(SettingValues, "user", defaultSettings.user)}>
          User/Member Context
        </SwitchItem>
        <SwitchItem
          note="Show options for group dm's icon."
          {...Utils.useSetting(SettingValues, "gdm", defaultSettings.gdm)}>
          Group DM Context
        </SwitchItem>
        <SwitchItem
          note="Show options for USRBG icon if user have any."
          {...Utils.useSetting(SettingValues, "userbg", defaultSettings.userbg)}>
          USRBG Icon
        </SwitchItem>
        <SwitchItem
          note="Show options for stream preview if any."
          {...Utils.useSetting(SettingValues, "stream", defaultSettings.stream)}>
          Stream Preview
        </SwitchItem>
        <SwitchItem
          note="Show options for stickers if any."
          {...Utils.useSetting(SettingValues, "stream", defaultSettings.stream)}>
          Sticker Context
        </SwitchItem>
        <FormItem
          title="Icon Sizes"
          note="What options should it give for icon sizes in context menus"
          notePosition={"after"}
          divider={true}>
          <Flex
            direction={Flex.Direction.HORIZONTAL}
            wrap={Flex.Wrap.WRAP}
            justify={Flex.Justify.CENTER}
            align={Flex.Align.CENTER}>
            {defaultSettings.iconSize.map((size) => {
              const [value, setValue] = React.useState(
                SettingValues.get("iconSize", defaultSettings.iconSize).includes(size),
              );
              return (
                <CheckboxItem
                  value={value}
                  onChange={() => {
                    const iconSize = SettingValues.get("iconSize", defaultSettings.iconSize);
                    if (value) {
                      SettingValues.set(
                        "iconSize",
                        iconSize.filter((c) => c !== size),
                      );
                      setValue(false);
                    } else {
                      iconSize.push(size);
                      SettingValues.set("iconSize", iconSize);
                      setValue(true);
                    }
                  }}>
                  {size}px
                </CheckboxItem>
              );
            })}
          </Flex>
        </FormItem>
        <FormItem
          title="Icon Type"
          note="What options should it give for icon type in context menus"
          notePosition={"after"}
          divider={true}
          style={{ paddingTop: "8px" }}>
          <Flex
            direction={Flex.Direction.HORIZONTAL}
            wrap={Flex.Wrap.WRAP}
            justify={Flex.Justify.CENTER}
            align={Flex.Align.CENTER}>
            {defaultSettings.iconType.map((type) => {
              const [value, setValue] = React.useState(
                SettingValues.get("iconType", defaultSettings.iconType).includes(type),
              );
              return (
                <CheckboxItem
                  value={value}
                  onChange={() => {
                    const iconType = SettingValues.get("iconType", defaultSettings.iconType);
                    if (value) {
                      SettingValues.set(
                        "iconType",
                        iconType.filter((c) => c !== type),
                      );
                      setValue(false);
                    } else {
                      iconType.push(type);
                      SettingValues.set("iconType", iconType);
                      setValue(true);
                    }
                  }}>
                  {type}
                </CheckboxItem>
              );
            })}
          </Flex>
        </FormItem>
      </Category>
      <FormItem
        title="Search Engines"
        note="Search Engines for reverse searching images"
        notePosition={"after"}
        divider={true}
        style={{ paddingTop: "8px" }}>
        <Flex
          direction={Flex.Direction.HORIZONTAL}
          wrap={Flex.Wrap.WRAP}
          justify={Flex.Justify.CENTER}
          align={Flex.Align.CENTER}>
          {defaultSettings.engines.map((engine) => {
            const [value, setValue] = React.useState(
              SettingValues.get("engines", defaultSettings.engines).includes(engine),
            );
            return (
              <CheckboxItem
                value={value}
                onChange={() => {
                  const engines = SettingValues.get("engines", defaultSettings.engines);
                  if (value) {
                    SettingValues.set(
                      "engines",
                      engines.filter((c) => c !== engine),
                    );
                    setValue(false);
                  } else {
                    engines.push(engine);
                    SettingValues.set("iconType", engines);
                    setValue(true);
                  }
                }}>
                <Flex style={{ gap: "4px" }}>
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
                  {engine}
                </Flex>
              </CheckboxItem>
            );
          })}
        </Flex>
      </FormItem>
    </div>
  );
};
