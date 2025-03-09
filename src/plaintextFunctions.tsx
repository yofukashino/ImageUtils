import { SettingValues } from "./index";
import { defaultSettings } from "./lib/consts";
import ImageDetails from "./Components/ImageDetails";
import Types from "./types";

export const _zoom = (comp: Types.DefaultTypes.AnyFunction): Types.DefaultTypes.AnyFunction => {
  if (SettingValues.get("hideLens", defaultSettings.hideLens)) return comp;
  return () => null;
};

export const _details = (props?: { src?: string; original?: string }): React.ReactElement => {
  if (!props?.src && !props?.original) return null;
  return <ImageDetails src={props?.src || props?.original} redesigned={true} />;
};
