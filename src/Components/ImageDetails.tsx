import { React, toast } from "replugged/common";
import { Flex, Text, Tooltip } from "replugged/components";
import APNGParse, { type APNG } from "apng-js";
import { decompressFrames, parseGIF } from "gifuct-js";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import Icons from "@Icons";
import Utils from "@Utils";

import "./ImageDetails.css";

export interface ImageDetailsProps {
  details?: React.ReactElement[] | React.ReactElement;
  src: string;
}

export default React.memo((props: ImageDetailsProps): React.ReactElement => {
  const [host, setHost] = React.useState(location.host);
  const [hex, setHex] = React.useState("#000000");
  const [dimensions, setDimensions] = React.useState("0x0");
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  const hexRef = React.useRef("#000000");
  const [mouseOver, setMouseOver] = React.useState(false);
  const element = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const apngRef = React.useRef<APNG | null>(null);
  const gifRef = React.useRef<{ duration: number; frames: HTMLImageElement[] } | null>(null);
  React.useEffect(() => {
    const elem = document.getElementById("image-utils-modal");
    element.current = elem as HTMLDivElement;
    const waitForElement = async (): Promise<void> => {
      while (
        !element.current?.querySelector("img") &&
        !element.current?.querySelector("video[class*=embedVideo]")
      ) {
        await Utils.sleep(100);
      }
    };
    const waitForVideo = async (): Promise<void> => {
      await waitForElement();
      videoRef.current = element.current?.querySelector("video[class*=embedVideo]");
    };
    const getAndSetDimensions = async (): Promise<void> => {
      const { height, width } = await Utils.getImageDimensions(props.src);
      setDimensions(`${height.toFixed(0)}*${width.toFixed(0)}`);
    };
    const getAndSetHost = (): void => {
      const url = new URL(props.src);
      setHost(url.host);
    };
    const getAndSetApng = async (): Promise<void> => {
      const imgBuffer = await fetch(props.src).then((response) => response.arrayBuffer());
      const apng = APNGParse(imgBuffer);
      if (apng instanceof Error) {
        return;
      }
      await waitForElement();
      apngRef.current = apng;
    };
    const getAndSetGif = async (): Promise<void> => {
      const imgBuffer = await fetch(props.src).then((response) => response.arrayBuffer());
      const gif = decompressFrames(parseGIF(imgBuffer), true);

      if (!gif.length) {
        return;
      }
      const duration = gif.at(-1)?.delay;

      const frames = gif.map((frame) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = frame.dims.width;
        canvas.height = frame.dims.height;

        const patch = new Uint8ClampedArray(frame.patch);
        const imageData = new ImageData(patch, frame.dims.width, frame.dims.height);

        ctx.putImageData(imageData, 0, 0);
        const img = new Image();
        img.src = canvas.toDataURL();
        img.crossOrigin = "anonymous";
        return img;
      });
      await waitForElement();
      gifRef.current = { duration, frames };
    };
    const onMouseMove = (e): void => {
      const boundingRect = element.current.getBoundingClientRect();
      setCursorPosition({
        x:
          Number(
            e.clientX < boundingRect.left
              ? boundingRect.left
              : e.clientX > boundingRect.right
                ? boundingRect.right
                : e.clientX,
          ) -
          boundingRect.left -
          0.5,
        y:
          Number(
            e.clientY < boundingRect.top
              ? boundingRect.top
              : e.clientY > boundingRect.bottom
                ? boundingRect.bottom
                : e.clientY,
          ) -
          boundingRect.top -
          0.5,
      });
    };
    const onKeyDown = (e): void => {
      if (e.key === "C" && e.getModifierState("Shift")) {
        DiscordNative.clipboard.copy(hexRef.current);
        toast.toast("Hex Copied to Clipboard.", toast.Kind.SUCCESS);
      }
    };
    const onMouseOver = (): void => {
      setMouseOver(true);
    };
    const onMouseOut = (): void => {
      setMouseOver(false);
    };

    document.addEventListener("keydown", onKeyDown);
    element.current.addEventListener("mousemove", onMouseMove);
    element.current.addEventListener("mouseover", onMouseOver);
    element.current.addEventListener("mouseout", onMouseOut);
    getAndSetHost();
    void waitForVideo();
    void getAndSetDimensions();
    void getAndSetApng();
    void getAndSetGif();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      element.current.removeEventListener("mousemove", onMouseMove);
      element.current.removeEventListener("mouseover", onMouseOver);
      element.current.removeEventListener("mouseout", onMouseOut);
    };
  }, [props.src]);

  React.useEffect(() => {
    const resetHex = (): void => {
      setHex("#000000");
      hexRef.current = "#000000";
    };
    const getAndSetHex = (): void => {
      const img: HTMLImageElement = element.current?.querySelector("img:not(.imgUtils-lens>img)");
      if (!img) return;
      if (!mouseOver) {
        resetHex();
        return;
      }

      const hex = Utils.getElementHex(img, cursorPosition);
      setHex(hex);
      hexRef.current = hex;
    };

    const onTimeUpdate = (): void => {
      if (!mouseOver) {
        resetHex();
        return;
      }
      const hex = Utils.getElementHex(videoRef.current, cursorPosition);
      setHex(hex);
      hexRef.current = hex;
    };
    const setApngInterval = (): (() => void) => {
      if (!apngRef.current) return () => void 0;
      const duration = apngRef.current.playTime / apngRef.current.frames.length;

      const interval = setInterval(async () => {
        const frame = apngRef.current.frames.shift();
        await frame.createImage();
        apngRef.current.frames.push(frame);
        if (!mouseOver) {
          resetHex();
          return;
        }
        const hex = Utils.getElementHex(frame.imageElement, cursorPosition);
        setHex(hex);
        hexRef.current = hex;
      }, duration);
      return () => {
        clearInterval(interval);
      };
    };
    const setGifInterval = (): (() => void) => {
      if (!gifRef.current) return () => void 0;
      const interval = setInterval(() => {
        const frame = gifRef.current.frames.shift();
        gifRef.current.frames.push(frame);
        if (!mouseOver) {
          resetHex();
          return;
        }
        const hex = Utils.getElementHex(frame, cursorPosition);
        setHex(hex);
        hexRef.current = hex;
      }, gifRef.current.duration);
      return () => {
        clearInterval(interval);
      };
    };
    getAndSetHex();
    const clearApngInterval = setApngInterval();
    const clearGifInterval = setGifInterval();
    videoRef.current?.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      videoRef.current?.removeEventListener("timeupdate", onTimeUpdate);
      clearApngInterval?.();
      clearGifInterval?.();
    };
  }, [mouseOver, videoRef.current, apngRef.current, cursorPosition]);

  return (
    <>
      {SettingValues.get("hex", DefaultSettings.hex) && (
        <Tooltip text="Shift+C To Copy">
          <Flex
            direction={Flex.Direction.HORIZONTAL}
            justify={Flex.Justify.CENTER}
            style={{
              height: "28px",
              marginBottom: "2px",
              marginTop: "2px",
              width: "64px",
              backgroundColor: hex,
              borderRadius: "10px",
            }}>
            <Text.Eyebrow
              style={{
                textAlign: "center",
                lineHeight: "28px",
                fontSize: "13px",
                color: hex,
                filter: "invert(1)",
              }}>
              {hex}
            </Text.Eyebrow>
          </Flex>
        </Tooltip>
      )}
      {SettingValues.get("dimensions", DefaultSettings.dimensions) && (
        <Tooltip text={`${dimensions} (Height*Width)`}>
          <Flex
            direction={Flex.Direction.HORIZONTAL}
            justify={Flex.Justify.CENTER}
            style={{
              height: "32px",
              width: "32px",
              alignItems: "center",
              color: "var(--interactive-normal)",
            }}>
            <Icons.info />
          </Flex>
        </Tooltip>
      )}
      {SettingValues.get("host", DefaultSettings.host) && (
        <Tooltip text={`Host: ${host}`}>
          <Flex
            direction={Flex.Direction.HORIZONTAL}
            justify={Flex.Justify.CENTER}
            style={{
              height: "32px",
              width: "32px",
              alignItems: "center",
              color: "var(--interactive-normal)",
            }}>
            <Icons.host />
          </Flex>
        </Tooltip>
      )}
    </>
  );
});
