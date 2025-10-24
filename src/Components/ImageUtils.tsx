import { React, classNames, contextMenu } from "replugged/common";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import Utils from "@Utils";

import type { ImageChildrenProps } from "@lib/RequiredModules/MediaModal";

import "./ImageUtils.css";
export interface ImageUtilsProps {
  animated: boolean;
  autoPlay: boolean;
  ImageComponent: React.FC<ImageChildrenProps>;
  height: number;
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
  onContextMenu: (e: React.MouseEvent) => void;
  placeholder: number;
  responsive: boolean;
  shouldLink: boolean;
  shouldRenderAccessory: boolean;
  src: string;
  width: number;
  childProps: ImageChildrenProps;
  ready: boolean;
}

export default React.memo(({ ImageComponent, ...props }: ImageUtilsProps): React.ReactElement => {
  const [ready, setReady] = React.useState(false);

  const [lensPosition, setLensPosition] = React.useState({ x: 0, y: 0 });
  const [mediaPosition, setMediaPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const saveValues = React.useRef(SettingValues.useValue("saveValues", DefaultSettings.saveValues));
  const darkenImage = React.useRef(
    SettingValues.useValue("darkenImage", DefaultSettings.darkenImage),
  );
  const invertScroll = React.useRef(
    SettingValues.useValue("invertScroll", DefaultSettings.invertScroll),
  );
  const scrollSpeed = React.useRef(
    SettingValues.useValue("scrollSpeed", DefaultSettings.scrollSpeed),
  );

  const zoom = React.useRef(SettingValues.useValue("zoom", DefaultSettings.zoom));
  const size = React.useRef(SettingValues.useValue("size", DefaultSettings.size));
  const mouseOver = React.useRef(false);
  const mouseDown = React.useRef(false);
  const shiftDown = React.useRef(false);
  const element = React.useRef<HTMLDivElement | null>(null);
  const currentVideoElementRef = React.useRef<HTMLVideoElement | null>(null);
  const originalVideoElementRef = React.useRef<HTMLVideoElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  const lensChange = (e): void => {
    if (!mouseOver.current || !mouseDown.current) {
      setOpacity(0);
      return;
    }
    const boundingClientRect = element.current.getBoundingClientRect();

    setLensPosition({
      x:
        Number(
          e.clientX < boundingClientRect.left
            ? boundingClientRect.left
            : e.clientX > boundingClientRect.right
              ? boundingClientRect.right
              : e.clientX,
        ) -
        boundingClientRect.left -
        size.current / 2,
      y:
        Number(
          e.clientY < boundingClientRect.top
            ? boundingClientRect.top
            : e.clientY > boundingClientRect.bottom
              ? boundingClientRect.bottom
              : e.clientY,
        ) -
        boundingClientRect.top -
        size.current / 2,
    });
    setMediaPosition({
      x: -((e.pageX - boundingClientRect.left) * zoom.current - size.current / 2),
      y: -((e.pageY - boundingClientRect.top) * zoom.current - size.current / 2),
    });
    setOpacity(1);
  };
  React.useEffect(() => {
    const onMouseMove = (e): void => {
      e.preventDefault();
      e.stopPropagation();
      lensChange(e);
    };

    const onMouseUp = (e): void => {
      e.preventDefault();
      e.stopPropagation();
      mouseDown.current = false;
      setOpacity(0);
    };

    const onKeyDown = (e): void => {
      if (e.key === "Shift") {
        shiftDown.current = true;
      }
    };

    const onKeyUp = (e): void => {
      if (e.key === "Shift") {
        shiftDown.current = false;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  React.useEffect(() => {
    if (props.ready) {
      const elem = document.getElementById("image-utils-modal") as HTMLDivElement;
      element.current = elem;
      const syncGifs = async (): Promise<void> => {
        const gifs: NodeListOf<HTMLImageElement> = elem?.querySelectorAll('img[src*=".gif"]');
        for (const gif of gifs) {
          const reader = new FileReader();
          const blob = await fetch(props.src).then((response) => response.blob());
          reader.onload = function () {
            if (gif?.src && reader.result) gif.src = reader.result as string;
          };
          reader.readAsDataURL(blob);
        }
      };

      elem.querySelector("img,video")?.setAttribute("draggable", "false");

      setReady(true);
      void syncGifs();
    }
  }, [props.ready, props.childProps]);

  React.useEffect(() => {
    const onTimeUpdate = (): void => {
      if (currentVideoElementRef.current && originalVideoElementRef.current)
        currentVideoElementRef.current.currentTime = originalVideoElementRef.current.currentTime;
    };

    if (originalVideoElementRef.current && props.animated) {
      originalVideoElementRef.current.addEventListener("timeupdate", onTimeUpdate);
      if (
        darkenImage.current &&
        !originalVideoElementRef.current.classList.contains("imageUtils-backdrop")
      )
        originalVideoElementRef.current.classList.add("imageUtils-backdrop");

      if (
        !darkenImage.current &&
        originalVideoElementRef.current.classList.contains("imageUtils-backdrop")
      )
        originalVideoElementRef.current.classList.remove("imageUtils-backdrop");
      currentVideoElementRef.current.src = originalVideoElementRef.current.src;
    }
    return () => {
      originalVideoElementRef.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [originalVideoElementRef.current]);

  const box = element.current?.getBoundingClientRect();

  if (!box) return null;

  return ready ? (
    <div
      onWheel={(e) => {
        if (mouseOver.current && !shiftDown.current) {
          const val =
            zoom.current + (e.deltaY / 100) * (invertScroll.current ? -1 : 1) * scrollSpeed.current;
          zoom.current = val <= 1 ? 1 : val;
        }
        if (mouseOver.current && shiftDown.current) {
          const val = size.current + e.deltaY * (invertScroll ? -1 : 1) * scrollSpeed.current;
          size.current = val <= 50 ? 50 : val;
        }
        if (saveValues.current) {
          SettingValues.set("zoom", zoom.current);
          SettingValues.set("size", size.current);
        }
        lensChange(e);
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseOver.current = true;
      }}
      onMouseOut={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseOver.current = false;
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        contextMenu.close();
        if (e.button === 0) {
          mouseDown.current = true;
          zoom.current = SettingValues.get("zoom", DefaultSettings.zoom);
          size.current = SettingValues.get("size", DefaultSettings.size);
          lensChange(e);
          setOpacity(1);
        }
      }}
      ref={(ref) => {
        const videoRef: HTMLVideoElement = ref?.querySelector("video[class*=embedVideo]");
        if (!ref || !videoRef || originalVideoElementRef.current === videoRef) return;
        originalVideoElementRef.current = videoRef;
      }}>
      <div
        className={classNames("imgUtils-lens", {
          square: SettingValues.get("square", DefaultSettings.square),
          pixelZoom: SettingValues.get("pixelZoom", DefaultSettings.pixelZoom),
        })}
        style={{
          opacity,
          width: `${size.current}px`,
          height: `${size.current}px`,
          transform: `translate(${lensPosition.x}px, ${lensPosition.y}px)`,
        }}>
        {props.animated ? (
          <video
            ref={currentVideoElementRef}
            style={{
              position: "absolute",
              left: `${mediaPosition.x}px`,
              top: `${mediaPosition.y}px`,
            }}
            width={`${box.width * zoom.current}px`}
            height={`${box.height * zoom.current}px`}
            poster={props.src}
            src={Utils.resizeURL(originalVideoElementRef.current?.src ?? props.src)}
            autoPlay
            loop
          />
        ) : (
          <img
            crossOrigin="anonymous"
            ref={imageRef}
            style={{
              position: "absolute",
              transform: `translate(${mediaPosition.x}px, ${mediaPosition.y}px)`,
            }}
            width={`${box.width * zoom.current}px`}
            height={`${box.height * zoom.current}px`}
            src={Utils.resizeURL(props.src)}
            alt=""
          />
        )}
      </div>

      <ImageComponent {...props.childProps} />
    </div>
  ) : (
    <ImageComponent {...props.childProps} />
  );
});
