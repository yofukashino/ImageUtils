import { React } from "replugged/common";
import Utils from "@Utils";

export interface VideoInstance
  extends React.Component<
      { src: string; height: string; width: string; type: string; poster?: string },
      Partial<{ playing: boolean }>
    >,
    Record<string, unknown> {
  mediaRef: React.RefObject<HTMLVideoElement>;
}

export default ({
  instance,
  FullScreen,
  FullScreenProps,
}: {
  instance: VideoInstance;
  FullScreen: React.FC<unknown>;
  FullScreenProps: Record<string, unknown>;
}): React.ReactElement => {
  const {
    mediaRef,
    props: { src, type },
  } = instance;
  const expandedSourceRef = React.useRef(
    document.querySelector<HTMLVideoElement>('[image-utils-video-expanded="true"]'),
  );
  const expandedInstanceRef = React.useRef<VideoInstance>();

  React.useEffect(() => {
    if (expandedSourceRef.current) {
      mediaRef.current.currentTime = expandedSourceRef.current.currentTime;
      expandedInstanceRef.current = Utils.getOwnerInstance(
        expandedSourceRef.current,
      ) as VideoInstance;
      instance.setState(expandedInstanceRef.current.state);
      expandedInstanceRef.current.setState({ playing: false });
    }
    return () => {
      if (expandedSourceRef.current) {
        expandedSourceRef.current.removeAttribute("image-utils-video-expanded");
        expandedInstanceRef.current.setState(instance.state);
      }
    };
  }, []);

  React.useEffect(() => {
    if (expandedSourceRef.current) {
      expandedSourceRef.current.currentTime = mediaRef.current.currentTime;
    }
  }, [mediaRef.current?.currentTime]);

  if (expandedSourceRef.current) return null;

  return (
    <>
      {type === "VIDEO" && (
        <div
          key="expand"
          className="imgUtils-expandVideo"
          onClick={(): void => {
            mediaRef.current.pause();
            mediaRef.current.setAttribute("image-utils-video-expanded", "true");
            void Utils.openModal(src, {
              proxyUrl: src,
              height: mediaRef.current.videoHeight,
              width: mediaRef.current.videoWidth,
              type,
            });
          }}>
          expand
        </div>
      )}
      <FullScreen key="fullscreen" {...FullScreenProps} />
    </>
  );
};
