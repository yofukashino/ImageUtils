import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.MediaModal ??= await webpack
    .waitForModule<Types.MediaModal>(webpack.filters.bySource("/\\.gif($|\\?|#)/i"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find MediaModal Module");
    });

  Modules.IconUtils ??= await webpack
    .waitForProps<Types.IconUtils>(["getUserAvatarURL"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find IconUtils Module");
    });

  Modules.ImageModalClasses ??= await webpack
    .waitForModule<Types.ImageModalClasses>(webpack.filters.bySource(/{modal:"[\w_\d-]+?"}/), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find ImageModalClasses Module");
    });

  Modules.MaskedLink ??= await webpack
    .waitForModule<React.ComponentType<unknown>>(webpack.filters.bySource("MASKED_LINK)"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find MaskedLink Module");
    });

  Modules.ImageModalLazy ??= await webpack
    .waitForModule<Types.ImageModalLazy>(
      webpack.filters.bySource(/hasMediaOptions:!\w+\.shouldHideMediaOptions/),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find ImageModalLazy Module");
    });

  Modules.ImageModalModulePromise ??= webpack
    .waitForModule<{ exports: Types.ImageModalModule }>(
      webpack.filters.bySource(".zoomedMediaFitWrapper"),
      {
        raw: true,
      },
    )
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find ImageModalModule Module");
    });
  Modules.ApplicationStreamPreviewStore ??= await webpack
    .waitForModule<Types.ApplicationStreamPreviewStore>(
      webpack.filters.bySource('"ApplicationStreamPreviewStore"'),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find ApplicationStreamPreviewStore Module");
    });

  Modules.GuildMemberStore ??= webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");
  Modules.ApplicationStreamingStore ??= webpack.getByStoreName<Types.ApplicationStreamingStore>(
    "ApplicationStreamingStore",
  );

  Modules.StickersStore ??= webpack.getByStoreName<Types.StickersStore>("StickersStore");
};

export default Modules;
