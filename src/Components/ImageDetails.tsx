import { React, toast as ToastUtils } from "replugged/common";
import { Flex, Text } from "replugged/components";
import { SettingValues } from "../index";
import { DiscordNative } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";
import apngParse, { APNG } from "apng-js";
export default React.memo((props: Types.ImageUtilsProps): React.ReactElement => {
  const OriginalComponent = props.children.bind(null, props.childProps);
  const originalComponentRef = React.useRef(OriginalComponent);
  const [host, setHost] = React.useState(location.host);
  const [hex, setHex] = React.useState("#000000");
  const [dimensions, setDimensions] = React.useState("0x0");
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  const hexRef = React.useRef("#000000");
  const mouseOver = React.useRef(false);
  const element = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const apngRef = React.useRef<APNG | null>(null);
  React.useEffect(() => {
    const elem = document.getElementById("image-utils-modal") as HTMLDivElement;
    element.current = elem;

    originalComponentRef.current = OriginalComponent;
    const waitForVideo = async (): Promise<void> => {
      while (
        !element.current?.querySelector("img") &&
        !element.current?.querySelector("video[class*=embedVideo]")
      ) {
        await Utils.sleep(100);
      }

      videoRef.current = element.current?.querySelector(
        "video[class*=embedVideo]",
      ) as HTMLVideoElement;
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
      const apng = apngParse(imgBuffer);
      if (apng instanceof Error) {
        return;
      }
      while (
        !element.current?.querySelector("img") &&
        !element.current?.querySelector("video[class*=embedVideo]")
      ) {
        await Utils.sleep(100);
      }
      apngRef.current = apng;
    };

    const onMouseMove = (e): void => {
      setCursorPosition({
        x:
          Number(
            e.clientX < element.current!.getBoundingClientRect().left
              ? element.current!.getBoundingClientRect().left
              : e.clientX > element.current!.getBoundingClientRect().right
                ? element.current!.getBoundingClientRect().right
                : e.clientX,
          ) -
          element.current!.getBoundingClientRect().left -
          0.5,
        y:
          Number(
            e.clientY < element.current!.getBoundingClientRect().top
              ? element.current!.getBoundingClientRect().top
              : e.clientY > element.current!.getBoundingClientRect().bottom
                ? element.current!.getBoundingClientRect().bottom
                : e.clientY,
          ) -
          element.current!.getBoundingClientRect().top -
          0.5,
      });
    };
    const onKeyDown = (e): void => {
      if (e.key === "C" && e.getModifierState("Shift")) {
        DiscordNative.clipboard.copy(hexRef.current);
        ToastUtils.toast("Hex Copied to Clipboard.", ToastUtils.Kind.SUCCESS, {
          duration: 5000,
        });
      }
    };
    const onMouseOver = (): void => {
      mouseOver.current = true;
    };
    const onMouseOut = (): void => {
      mouseOver.current = false;
    };

    document.addEventListener("keydown", onKeyDown);
    element.current.addEventListener("mousemove", onMouseMove);
    element.current.addEventListener("mouseover", onMouseOver);
    element.current.addEventListener("mouseout", onMouseOut);
    waitForVideo();
    getAndSetDimensions();
    getAndSetHost();
    getAndSetApng();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      element.current.removeEventListener("mousemove", onMouseMove);
      element.current.removeEventListener("mouseover", onMouseOver);
      element.current.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
  React.useEffect(() => {
    const getAndSetHex = async (): Promise<void> => {
      if (!mouseOver.current) {
        setHex("#000000");
        hexRef.current = "#000000";
        return;
      }
      const hex = await Utils.getImageHex(props.src, cursorPosition);
      setHex(hex);
      hexRef.current = hex;
    };
    const onTimeUpdate = (): void => {
      if (!mouseOver.current) {
        setHex("#000000");
        hexRef.current = "#000000";
        return;
      }
      const hex = Utils.getElementHex(videoRef.current, cursorPosition);
      setHex(hex);
      hexRef.current = hex;
    };
    const setApngInterval = (): (() => void) => {
      if (!apngRef.current) return () => {};
      const duration = apngRef.current.playTime / apngRef.current.frames.length;

      const interval = setInterval(async () => {
        const frame = apngRef.current.frames.shift();
        await frame.createImage();
        apngRef.current.frames.push(frame);
        if (!mouseOver.current) {
          setHex("#000000");
          hexRef.current = "#000000";
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
    const clearApngInterval = setApngInterval();
    videoRef.current?.addEventListener("timeupdate", onTimeUpdate);
    getAndSetHex();
    return () => {
      videoRef.current?.removeEventListener("timeupdate", onTimeUpdate);
      clearApngInterval?.();
    };
  }, [videoRef.current, apngRef.current, cursorPosition]);
  return (
    <div className={`${props.childProps.className} imageUtils-details`}>
      <Flex direction={Flex.Direction.HORIZONTAL} justify={Flex.Justify.BETWEEN}>
        {originalComponentRef.current()}
        <span>
          <Flex
            direction={Flex.Direction.VERTICAL}
            justify={Flex.Justify.START}
            style={{ paddingTop: "5px" }}>
            {SettingValues.get("hex", defaultSettings.hex) && (
              <Text.Normal className="imageUtils-detailsText">{hex} (Shift+C To Copy)</Text.Normal>
            )}
            {SettingValues.get("dimensions", defaultSettings.dimensions) && (
              <Text.Normal className="imageUtils-detailsText">
                {dimensions} (Height*Width)
              </Text.Normal>
            )}
            {SettingValues.get("host", defaultSettings.host) && (
              <Text.Normal className="imageUtils-detailsText">Host: {host}</Text.Normal>
            )}
          </Flex>
        </span>
      </Flex>
    </div>
  );
});
