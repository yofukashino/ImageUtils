import { util } from "replugged";
import { marginStyles } from "replugged/common";
import { Category, Checkbox, Flex, FormControl, Slider, Stack, Switch } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings, SearchEngines } from "@consts";

export const registerSettings = (): void => {
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const Settings = (): React.ReactElement => {
  const [iconSizes, setIconSizes] = util.useSettingArray(
    SettingValues,
    "iconSize",
    DefaultSettings.iconSize,
  );
  const [iconTypes, setIconTypes] = util.useSettingArray(
    SettingValues,
    "iconType",
    DefaultSettings.iconType,
  );

  const [engines, setEngines] = util.useSettingArray(
    SettingValues,
    "engines",
    DefaultSettings.engines,
  );

  return (
    <Stack gap={24} className={marginStyles.marginTop20}>
      <Category label="Lens Settings">
        <Stack gap={16} className={marginStyles.marginTop20}>
          <Switch
            label="Disable Lens"
            description="Disable the ability to zoom and all things related to it."
            {...util.useSetting(SettingValues, "hideLens", DefaultSettings.hideLens)}
          />
          <Switch
            label="Darken Image"
            description="Darken background Image when zooming."
            {...util.useSetting(SettingValues, "darkenImage", DefaultSettings.darkenImage)}
          />

          <Switch
            label="Save Modifications"
            description="Save zoom and lens size when using scroll wheel."
            {...util.useSetting(SettingValues, "darkenImage", DefaultSettings.darkenImage)}
          />

          <Switch
            label="Pixel Zoom"
            description="Pixelated Image Rendering Sample, Refer to googlechrome.github.io/samples/image-rendering-pixelated/index.html for more info."
            {...util.useSetting(SettingValues, "pixelZoom", DefaultSettings.pixelZoom)}
          />

          <Switch
            label="Invert Scroll"
            description="Invert the effect of scroll when using it to change lens size/zoom."
            {...util.useSetting(SettingValues, "invertScroll", DefaultSettings.invertScroll)}
          />

          <Switch
            label="Square Lens"
            description="Use a square lens. (Default: Round)"
            {...util.useSetting(SettingValues, "square", DefaultSettings.square)}
          />
          <Slider
            label={" Zoom"}
            description="The strength of zoom with lens."
            minValue={1}
            maxValue={50}
            onValueRender={(value: number) => `${value.toFixed(0)}x`}
            {...util.useSetting(SettingValues, "zoom", DefaultSettings.zoom)}
          />

          <Slider
            label="Lens Size"
            description="The size of lens for zoom."
            minValue={50}
            maxValue={1000}
            onValueRender={(value: number) => `${value.toFixed(0)}x`}
            {...util.useSetting(SettingValues, "size", DefaultSettings.size)}
          />

          <Slider
            label="Scroll Speed"
            description="How much each step of scroll wheel changes the lens size/zoom."
            minValue={0.1}
            maxValue={5}
            onValueRender={(value: number) => `${value.toFixed(3)}x`}
            {...util.useSetting(SettingValues, "scrollSpeed", DefaultSettings.scrollSpeed)}
          />
        </Stack>
      </Category>

      <Category label="Image Details">
        <Stack gap={16} className={marginStyles.marginTop20}>
          <Switch
            label="Hex Color Code"
            description="Show Hex code in image footer of wherever on image your cursor is. (Buddy on Animated Stickers)"
            {...util.useSetting(SettingValues, "hex", DefaultSettings.hex)}
          />

          <Switch
            label="Dimensions"
            description="Show Height and width in image footer. (Height*Width)"
            {...util.useSetting(SettingValues, "dimensions", DefaultSettings.dimensions)}
          />

          <Switch
            label="Image Host"
            description="Show Host website in image footer."
            {...util.useSetting(SettingValues, "host", DefaultSettings.host)}
          />
        </Stack>
      </Category>

      <Category label="Context Menu">
        <Stack gap={16} className={marginStyles.marginTop20}>
          <Switch
            label="Guild/Server Context"
            description="Show options for guild/server's icon/banner/splash."
            {...util.useSetting(SettingValues, "guild", DefaultSettings.guild)}
          />

          <Switch
            label="User/Member Context"
            description="Show options for user/member's avatar/banner."
            {...util.useSetting(SettingValues, "user", DefaultSettings.user)}
          />

          <Switch
            label="Group DM Context"
            description="Show options for group dm's icon."
            {...util.useSetting(SettingValues, "gdm", DefaultSettings.gdm)}
          />

          <Switch
            label="USRBG Icon"
            description="Show options for USRBG icon if user have any."
            {...util.useSetting(SettingValues, "userbg", DefaultSettings.userbg)}
          />
          <Switch
            label="Stream Preview"
            description="Show options for stream preview if any."
            {...util.useSetting(SettingValues, "stream", DefaultSettings.stream)}
          />

          <Switch
            label="Sticker Context"
            description="Show options for stickers if any."
            {...util.useSetting(SettingValues, "stream", DefaultSettings.stream)}
          />

          <FormControl
            label="Icon Sizes"
            helperText="What options should it give for icon sizes in context menus">
            <Flex
              direction={Flex.Direction.HORIZONTAL}
              wrap={Flex.Wrap.WRAP}
              justify={Flex.Justify.CENTER}
              align={Flex.Align.CENTER}>
              {DefaultSettings.iconSize.map((size) => {
                return (
                  <Checkbox
                    key={size}
                    label={`${size}px`}
                    type="inverted"
                    checked={iconSizes.includes(size)}
                    onChange={(v) => {
                      if (v) setIconSizes([...iconSizes, size]);
                      else setIconSizes(iconSizes.filter((c) => c !== size));
                    }}
                  />
                );
              })}
            </Flex>
          </FormControl>

          <FormControl
            label="Icon Type"
            helperText="What options should it give for icon type in context menus">
            <Flex
              direction={Flex.Direction.HORIZONTAL}
              wrap={Flex.Wrap.WRAP}
              justify={Flex.Justify.CENTER}
              align={Flex.Align.CENTER}>
              {DefaultSettings.iconType.map((type) => {
                return (
                  <Checkbox
                    key={type}
                    label={type}
                    type="inverted"
                    checked={iconTypes.includes(type)}
                    onChange={(v) => {
                      if (v) setIconTypes([...iconTypes, type]);
                      else setIconTypes(iconTypes.filter((c) => c !== type));
                    }}
                  />
                );
              })}
            </Flex>
          </FormControl>
        </Stack>
      </Category>

      <FormControl label="Search Engines" helperText="Search Engines for reverse searching images">
        <Flex
          direction={Flex.Direction.HORIZONTAL}
          wrap={Flex.Wrap.WRAP}
          justify={Flex.Justify.CENTER}
          align={Flex.Align.CENTER}>
          {DefaultSettings.engines.map((engine: keyof typeof SearchEngines) => {
            return (
              <Checkbox
                key={engine}
                label={
                  <Flex style={{ gap: "4px" }}>
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
                    {engine}
                  </Flex>
                }
                type="inverted"
                checked={engines.includes(engine)}
                onChange={(v) => {
                  if (v) setEngines([...engines, engine]);
                  else setEngines(engines.filter((c) => c !== engine));
                }}
              />
            );
          })}
        </Flex>
      </FormControl>
    </Stack>
  );
};

export default { registerSettings, Settings };
