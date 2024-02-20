import { util } from "replugged";
import { modal as ModalUtils, React, toast as ToastUtils } from "replugged/common";
import { ContextMenu, Modal } from "replugged/components";
import { SettingValues } from "../index";
import { ImageModalClasses, ImageModalModule, MaskedLink } from "./requiredModules";
import Types from "../types";
import { defaultSettings } from "./consts";

export const getImageHex = (url: string, { x, y }: { x: number; y: number }): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const [R, G, B] = ctx.getImageData(x, y, 1, 1).data;
      resolve(`#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`);
    };
    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });

export const getVideoHex = (
  videoElemment: HTMLVideoElement,
  { x, y }: { x: number; y: number },
): string => {
  const canvas = document.createElement("canvas");
  canvas.width = videoElemment.width;
  canvas.height = videoElemment.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElemment, 0, 0, videoElemment.width, videoElemment.height);
  const [R, G, B] = ctx.getImageData(x, y, 1, 1).data;
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};
export const getImageDimensions = (url: string): Promise<{ height: number; width: number }> =>
  new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      const aspectRatio = img.width / img.height;
      let newWidth = img.width;
      let newHeight = img.height;
      if (newHeight > 512) {
        newHeight = 512;
        newWidth = newHeight * aspectRatio;
      }
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const dimensions = { width: newWidth, height: newHeight };
      resolve(dimensions);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });

export const openImageModal = async (url: string, imgProps?: object): Promise<string> => {
  const { modal, image } = (await ImageModalClasses) ?? ({} as Types.ImageModalClasses);
  const dimensions = await getImageDimensions(url);
  return ModalUtils.openModal((props) => (
    <Modal.ModalRoot {...props} className={modal} size="dynamic">
      <ImageModalModule.ImageModal
        className={image}
        original={url}
        placeholder={url}
        src={url}
        children={(props) => <img {...props} src={url} {...dimensions} />}
        renderLinkComponent={(props) => <MaskedLink {...props} />}
        shouldHideMediaOptions={false}
        {...imgProps}
        {...dimensions}
      />
    </Modal.ModalRoot>
  ));
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
  if (url?.includes("discordapp.com/streams")) return { action: () => openIcon(url) };
  const animated = url?.includes("gif");
  const formats = url?.includes("discordapp.com/stickers")
    ? ["png"]
    : SettingValues.get("iconType", defaultSettings.iconType).filter((c) =>
        animated ? true : c !== "gif",
      );
  const sizes = url.includes("discord")
    ? SettingValues.get("iconSize", defaultSettings.iconSize)
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

export default {
  ...util,
  getImageHex,
  getVideoHex,
  getImageDimensions,
  openIcon,
  openImageModal,
  mapMenuItem,
};
