import { webpack } from "replugged";

export type MediaItem = Partial<{
  className: string;
  original: string;
  zoomThumbnailPlaceholder: string;
  type: "VIDEO" | "IMAGE";
  url: string;
  proxyUrl: string;
  height?: number;
  width?: number;
  animated?: boolean;
  shouldAnimate?: boolean;
  children?: React.ReactNode;
}>;

export type MediaModalProps = Partial<{
  hasMediaOptions?: boolean;
  shouldHideMediaOptions?: boolean;
  className?: string;
  items: MediaItem[];
  fit?: string;
  onCloseCallback?: () => void;
}>;

export type OpenModel = (props: MediaModalProps) => void;

export interface MediaModalLazy {
  openModal: OpenModel;
  key: string;
}

const MediaModelModule = await webpack
  .waitForModule<MediaModalLazy>(
    webpack.filters.bySource(/hasMediaOptions:!\w+\.shouldHideMediaOptions/),
    {
      timeout: 10000,
    },
  )
  .catch(() => {
    throw new Error("Failed To Find MediaModalLazy Module");
  });

export default {
  openModal: webpack.getFunctionBySource<OpenModel>(MediaModelModule, ".MEDIA_VIEWER"),
};
