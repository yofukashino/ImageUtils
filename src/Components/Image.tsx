import { i18n } from "replugged/common";

export default ({ src, size, alt, className, mediaLayoutType }): React.ReactElement => (
  <img
    className={className}
    alt={alt || i18n.intl.formatToPlainString(i18n.t.IMAGE)}
    src={src}
    style={{
      display: "block",
      ...(mediaLayoutType === "MOSAIC"
        ? {
            objectFit: "cover",
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: (window.devicePixelRatio ?? 1) === 1 ? "calc(100% + 1px)" : "100%",
          }
        : mediaLayoutType === "RESPONSIVE"
          ? {
              maxWidth: size.width,
              maxHeight: size.height,
              width: "100%",
              aspectRatio: `${size.width} / ${size.height}`,
            }
          : size),
    }}
  />
);
