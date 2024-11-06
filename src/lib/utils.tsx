import { util, webpack } from "replugged";
import { toast as ToastUtils } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { PluginLogger, SettingValues, USRDB } from "../index";
import Modules from "./requiredModules";
import { USRBG_URL, defaultSettings } from "./consts";
import Types from "../types";

export const getElementHex = (
  element: HTMLVideoElement | HTMLImageElement,
  { x, y }: { x: number; y: number },
): string => {
  const canvas = document.createElement("canvas");
  canvas.width = element.width;
  canvas.height = element.height;
  const ctx = canvas.getContext("2d");
  if (!element.src?.includes("blob") && element.crossOrigin != "anonymous") {
    element.crossOrigin = "anonymous";
    element.src = `${element.src}`;
  }
  ctx.drawImage(element, 0, 0, element.width, element.height);
  const [R, G, B] = ctx.getImageData(x, y, 1, 1).data;
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};

export const getImageDimensions = (url: string): Promise<{ height: number; width: number }> =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const dimensions = {
        width: img.width,
        height: img.height,
      };
      resolve(dimensions);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });

export const resizeToFit = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): { width: number; height: number } => {
  const maxHeight = Math.min(Math.round(0.65 * window.innerHeight), 2e3);
  const maxWidth = Math.min(Math.round(0.75 * window.innerWidth), 2e3);
  if (width !== maxWidth || height !== maxHeight) {
    const scaledWidth = width > maxWidth ? maxWidth / width : 1;
    width = Math.max(Math.round(width * scaledWidth), 0);
    height = Math.max(Math.round(height * scaledWidth), 0);
    const scaledHeight = height > maxHeight ? maxHeight / height : 1;
    width = Math.max(Math.round(width * scaledHeight), 0);
    height = Math.max(Math.round(height * scaledHeight), 0);
  }
  return {
    width,
    height,
  };
};

export const openImageModal = async (url: string, imgProps?: object): Promise<void> => {
  const dimensions = await getImageDimensions(url);
  const openImageModal = webpack.getFunctionBySource<Types.ImageModalLazy["openModal"]>(
    Modules.ImageModalLazy,
    ".openModalLazy",
  );

  openImageModal({
    className: Modules.ImageModalClasses.modal,
    items: [
      {
        url,
        original: url,
        zoomThumbnailPlaceholder: url,
        type: "IMAGE",
        ...imgProps,
        ...dimensions,
      },
    ],
  });
};

export const openIcon = (url: string, format?: string, size?: string): void => {
  format = url.startsWith("/") ? "png" : format;

  const href = new URL(url, window.location.href);
  if (format && size) {
    href.searchParams.set("size", size);
    if (format) href.pathname = href.pathname.replace(/\.(png|jpe?g|webp|gif)$/, `.${format}`);
    url = href.toString();
  }

  href.searchParams.set("size", "4096");
  const originalUrl = href.toString();
  openImageModal(url, {
    original: originalUrl,
    height: 512,
    width: 512,
    animated: format === "gif",
    shouldAnimate: format === "gif",
  });
};

export const mapMenuItem = (
  url?: string,
):
  | { action: Types.DefaultTypes.AnyFunction }
  | { children: React.ReactElement[]; action: Types.DefaultTypes.AnyFunction }
  | null => {
  if (!url || /data:image\/\w+;base64,/.test(url))
    return {
      action: () =>
        ToastUtils.toast("Error Fetching Image, Try again later.", ToastUtils.Kind.FAILURE, {
          duration: 5000,
        }),
    };
  if (url?.includes("discordapp.com/streams") || url?.includes("usrbg.is-hardly.online/usrbg"))
    return { action: () => openIcon(url) };
  const animated = url?.includes("gif");
  const formats = url?.includes("discordapp.com/stickers")
    ? ["png"]
    : SettingValues.get("iconType", defaultSettings.iconType).filter((c) =>
        animated ? true : c !== "gif",
      );
  const sizes = url.includes("discord")
    ? SettingValues.get("iconSize", defaultSettings.iconSize).sort(
        (a: string, b: string) => Number(a) - Number(b),
      )
    : ["512"];

  if (formats.length === 0 || sizes.length === 0) {
    return null;
  }
  const renderMenuItem = (format, size, onlySize?: boolean): React.ReactElement => (
    <ContextMenu.MenuItem
      id={`imageUtils${onlySize ? "" : `-format-${format}`}-${size}`}
      label={`${onlySize ? "" : format} ${onlySize ? "" : "-"} ${size}px`}
      action={() => openIcon(url, format, size)}
    />
  );

  if (formats.length === 1 && sizes.length === 1) {
    return { action: () => openIcon(url, formats[0], sizes[0]) };
  }

  if (formats.length === 1 && sizes.length > 1) {
    return {
      action: () => openIcon(url),
      children: sizes.map((s) => renderMenuItem(formats[0], s)),
    };
  }

  if (sizes.length === 1 && formats.length > 1) {
    return {
      action: () => openIcon(url),
      children: formats.map((f) => renderMenuItem(f, sizes[0])),
    };
  }

  return {
    action: () => openIcon(url),
    children: formats.map((f) => (
      <ContextMenu.MenuItem id={`imageUtils-${f}`} label={`${f}`}>
        {sizes.map((s) => renderMenuItem(f, s, true))}
      </ContextMenu.MenuItem>
    )),
  };
};

export const loadUSRBD = async (reload?: boolean): Promise<void> => {
  const fetchStart = performance.now();
  const USRBG_RESPONSE = await fetch(USRBG_URL);
  const USRBG_JSON = await USRBG_RESPONSE.json();
  for (const [USRBG_USERID, USRBG_ETAG] of Object.entries(USRBG_JSON.users))
    USRDB.set(
      USRBG_USERID,
      `${USRBG_JSON.endpoint}/${USRBG_JSON.bucket}/${USRBG_JSON.prefix}${USRBG_USERID}?${
        USRBG_ETAG as string
      }`,
    );
  const fetchEnd = performance.now();
  PluginLogger.log(
    `${reload ? "Reloaded" : "Loaded"} USRBG Database in ${(fetchEnd - fetchStart).toFixed(2)}ms.`,
  );
};

export default {
  ...util,
  getElementHex,
  getImageDimensions,
  resizeToFit,
  openIcon,
  openImageModal,
  mapMenuItem,
  loadUSRBD,
};
