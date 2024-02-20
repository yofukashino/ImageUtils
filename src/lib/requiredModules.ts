import { webpack } from "replugged";
import Types from "../types";

export const MediaModal = webpack.getByProps<Types.MediaModal>("IMAGE_GIF_RE");

export const IconUtils = webpack.getByProps<Types.IconUtils>("getUserAvatarURL");

export const ImageModalClasses =
  webpack.getBySource<Types.ImageModalClasses>(/{image:.+,modal:.+?}/);

export const MaskedLink = webpack.getBySource<React.ComponentType<unknown>>("MASKED_LINK)");

export const ImageModalModule = webpack.getByProps<Types.ImageModalModule>("ImageModal");

export const GuildMemberStore = webpack.getByStoreName<Types.GuildMemberStore>("GuildMemberStore");

export const ApplicationStreamingStore = webpack.getByStoreName<Types.ApplicationStreamingStore>(
  "ApplicationStreamingStore",
);

export const ApplicationStreamPreviewStore =
  webpack.getByStoreName<Types.ApplicationStreamPreviewStore>("ApplicationStreamPreviewStore");

export const StickersStore = webpack.getByStoreName<Types.StickersStore>("StickersStore");

export const DiscordNative = webpack.getByProps<Types.DiscordNative>("clipboard", "process");
