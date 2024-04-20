import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.MediaModal ??= await webpack.waitForProps<Types.MediaModal>("IMAGE_GIF_RE");
  Modules.IconUtils ??= await webpack.waitForProps<Types.IconUtils>("getUserAvatarURL");
  Modules.ImageModalClasses ??= await webpack.waitForModule<Types.ImageModalClasses>(
    webpack.filters.bySource(/{image:.+,modal:.+?}/),
  );
  Modules.MaskedLink ??= await webpack.waitForModule<React.ComponentType<unknown>>(
    webpack.filters.bySource("MASKED_LINK)"),
  );
  Modules.ImageModalModule ??= await webpack.waitForProps<Types.ImageModalModule>("ImageModal");
  Modules.ApplicationStreamPreviewStore ??=
    await webpack.waitForModule<Types.ApplicationStreamPreviewStore>(
      webpack.filters.bySource('="ApplicationStreamPreviewStore"'),
    );
  Modules.GuildMemberStore ??= webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");
  Modules.ApplicationStreamingStore ??= webpack.getByStoreName<Types.ApplicationStreamingStore>(
    "ApplicationStreamingStore",
  );

  Modules.StickersStore ??= webpack.getByStoreName<Types.StickersStore>("StickersStore");
};

export default Modules;
