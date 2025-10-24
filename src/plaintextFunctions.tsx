import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import ImageDetails from "@components/ImageDetails";
import ExpandVideo, { type VideoInstance } from "@components/ExpandVideo";

export const _zoom = (zoomJsx: React.FC): React.FC => {
  if (SettingValues.get("hideLens", DefaultSettings.hideLens)) return zoomJsx;
  return () => null;
};

export const _details = ({
  original,
  src,
  type,
}: {
  src?: string;
  original?: string;
  type?: string;
}): React.ReactElement => {
  if ((!src && !original) || type === "VIDEO") return null;
  return <ImageDetails src={src || original} />;
};

export const _expandVideo = (
  instance: VideoInstance,
  FullScreen: React.FC<unknown>,
  FullScreenProps: Record<string, unknown>,
): React.ReactElement => {
  return (
    <ExpandVideo instance={instance} FullScreen={FullScreen} FullScreenProps={FullScreenProps} />
  );
};
