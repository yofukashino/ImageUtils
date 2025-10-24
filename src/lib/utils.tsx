import { util } from "replugged";
import { toast as ToastUtils } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { MediaModalLazy } from "@lib/RequiredModules";
import type { MediaItem } from "@lib/RequiredModules/MediaModalLazy";
import type Types from "@Types";

export const getElementHex = (
  element: HTMLVideoElement | HTMLImageElement,
  { x, y }: { x: number; y: number },
): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const { src, crossOrigin, width, height } = element;
  canvas.width = width;
  canvas.height = height;

  if (!src?.includes("blob") && crossOrigin !== "anonymous") {
    element.crossOrigin = "anonymous";
    element.src = src;
  }
  ctx.drawImage(element, 0, 0, width, height);
  const [R, G, B] = ctx.getImageData(x, y, 1, 1).data;
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};

export const getImageDimensions = (url: string): Promise<{ height: number; width: number }> =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
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

export const resizeURL = (url: string): string => {
  if (url.includes("size=")) url = url.replaceAll(/size=\d+/g, "size=4096");
  return url.replaceAll(/&(height|width)=\d+/g, "");
};

export const openModal = async (url: string, imgProps?: MediaItem): Promise<void> => {
  const dimensions = imgProps?.type !== "VIDEO" ? await getImageDimensions(url) : {};
  MediaModalLazy.openModal({
    className: "imageUtils-modal",
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

  void openModal(url, {
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
        ToastUtils.toast("Error Fetching Image, Try again later.", ToastUtils.Kind.FAILURE),
    };
  if (url?.includes("discordapp.com/streams") || url?.includes("usrbg.is-hardly.online"))
    return { action: () => openIcon(url) };

  const animated = url?.includes("gif");
  const formats = url?.includes("discordapp.com/stickers")
    ? ["png"]
    : SettingValues.get("iconType", DefaultSettings.iconType).filter((c) =>
        animated ? true : c !== "gif",
      );
  const sizes = url.includes("discord")
    ? SettingValues.get("iconSize", DefaultSettings.iconSize).sort(
        (a: string, b: string) => Number(a) - Number(b),
      )
    : ["512"];

  if (formats.length === 0 || sizes.length === 0) {
    return null;
  }
  const renderMenuItem = (format: string, size: string, onlySize?: boolean): React.ReactElement => (
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
      <ContextMenu.MenuItem key={f} id={`imageUtils-${f}`} label={f}>
        {sizes.map((s) => renderMenuItem(f, s, true))}
      </ContextMenu.MenuItem>
    )),
  };
};

export default {
  ...util,
  getElementHex,
  getImageDimensions,
  resizeToFit,
  resizeURL,
  openIcon,
  openModal,
  mapMenuItem,
};
