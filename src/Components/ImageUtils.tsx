import { contextMenu as ContextMenuApi, React } from "replugged/common";
import { SettingValues } from "..";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";

export default React.memo((props: Types.ImageUtilsProps): React.ReactElement => {
  // To prevent re-renders of OriginalComponent when lensPosition, mediaPosition, or opacity change

  const [ready, setReady] = React.useState(false);

  const [lensPosition, setLensPosition] = React.useState({ x: 0, y: 0 });
  const [mediaPosition, setMediaPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const zoom = React.useRef(SettingValues.get("zoom", defaultSettings.zoom));
  const size = React.useRef(SettingValues.get("size", defaultSettings.size));
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

    setLensPosition({
      x:
        Number(
          e.clientX < element.current!.getBoundingClientRect().left
            ? element.current!.getBoundingClientRect().left
            : e.clientX > element.current!.getBoundingClientRect().right
              ? element.current!.getBoundingClientRect().right
              : e.clientX,
        ) -
        element.current!.getBoundingClientRect().left -
        size.current / 2,
      y:
        Number(
          e.clientY < element.current!.getBoundingClientRect().top
            ? element.current!.getBoundingClientRect().top
            : e.clientY > element.current!.getBoundingClientRect().bottom
              ? element.current!.getBoundingClientRect().bottom
              : e.clientY,
        ) -
        element.current!.getBoundingClientRect().top -
        size.current / 2,
    });
    setMediaPosition({
      x: -(
        (e.pageX - element.current!.getBoundingClientRect().left) * zoom.current -
        size.current / 2
      ),
      y: -(
        (e.pageY - element.current!.getBoundingClientRect().top) * zoom.current -
        size.current / 2
      ),
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
        const gifs = elem?.querySelectorAll('img[src*=".gif"]') as NodeListOf<HTMLImageElement>;
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
      syncGifs();
    }
  }, [props.ready]);
  React.useEffect(() => {
    const onTimeUpdate = (): void => {
      if (currentVideoElementRef.current && originalVideoElementRef.current)
        currentVideoElementRef.current!.currentTime = originalVideoElementRef.current!.currentTime;
    };
    if (originalVideoElementRef.current && props.animated) {
      originalVideoElementRef.current.addEventListener("timeupdate", onTimeUpdate);
      if (
        SettingValues.get("darkenImage", defaultSettings.darkenImage) &&
        !originalVideoElementRef.current.classList.contains("imageUtils-backdrop")
      )
        originalVideoElementRef.current.classList.add("imageUtils-backdrop");
      if (
        !SettingValues.get("darkenImage", defaultSettings.darkenImage) &&
        originalVideoElementRef.current.classList.contains("imageUtils-backdrop")
      )
        originalVideoElementRef.current.classList.remove("imageUtils-backdrop");
      currentVideoElementRef.current.src = originalVideoElementRef.current.src;
    }

    return () => {
      originalVideoElementRef.current?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [originalVideoElementRef.current]);
  React.useEffect(() => {
    zoom.current = SettingValues.get("zoom", defaultSettings.zoom);
    size.current = SettingValues.get("size", defaultSettings.size);
  }, [JSON.stringify(SettingValues.all())]);
  const box = element.current?.getBoundingClientRect();

  if (!box) return null;

  return ready ? (
    <div
      onWheel={(e) => {
        if (mouseOver.current && !shiftDown.current) {
          const val =
            zoom.current +
            (e.deltaY / 100) *
              (SettingValues.get("invertScroll", defaultSettings.invertScroll) ? -1 : 1) *
              SettingValues.get("scrollSpeed", defaultSettings.scrollSpeed);
          zoom.current = val <= 1 ? 1 : val;
        }
        if (mouseOver.current && shiftDown.current) {
          const val =
            size.current +
            e.deltaY *
              (SettingValues.get("invertScroll", defaultSettings.invertScroll) ? -1 : 1) *
              SettingValues.get("scrollSpeed", defaultSettings.scrollSpeed);
          size.current = val <= 50 ? 50 : val;
        }
        if (SettingValues.get("saveValues", defaultSettings.saveValues)) {
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
        ContextMenuApi.close();
        if (e.button === 0) {
          mouseDown.current = true;
          zoom.current = SettingValues.get("zoom", defaultSettings.zoom);
          size.current = SettingValues.get("size", defaultSettings.size);

          lensChange(e);
          setOpacity(1);
        }
      }}
      ref={(ref) => {
        const videoRef = ref?.querySelector("video[class*=embedVideo]") as HTMLVideoElement;
        if (!ref || !videoRef || originalVideoElementRef.current === videoRef) return;
        originalVideoElementRef.current = videoRef;
      }}>
      <div
        className={`imgUtils-lens${SettingValues.get("square", defaultSettings.square) ? " square" : ""}${SettingValues.get("pixelZoom", defaultSettings.pixelZoom) ? " pixelZoom" : ""}`}
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
      {props.children}
    </div>
  ) : (
    props.children
  );
});
