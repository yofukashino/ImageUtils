import { webpack } from "replugged";

export interface ImageZoomWrapper {
  $$typeof: "Symbol(react.memo)";
  type: (props: unknown) => React.ReactElement;
  compare?: (props: unknown) => React.ReactElement;
}

export default await webpack
  .waitForModule<ImageZoomWrapper>(webpack.filters.bySource('"zoom-out":"zoom-in"'), {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find ImageZoomWrapper Module");
  });
