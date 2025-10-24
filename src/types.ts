import { types } from "replugged";
import type util from "replugged/util";
import type { WebpackChunkGlobal } from "replugged/dist/types";
import type * as Flux from "replugged/dist/renderer/modules/common/flux";

import type * as Design from "discord-client-types/discord_app/design/web";

import type GeneralDiscordTypes from "discord-types/general";

import type { MediaModal } from "@lib/RequiredModules/MediaModal";
import type { IconUtils } from "@lib/RequiredModules/IconUtils";
import type { MediaModalLazy } from "@lib/RequiredModules/MediaModalLazy";
import type { ImageZoomWrapper } from "@lib/RequiredModules/ImageZoomWrapper";
import type { StickersStore } from "@lib/RequiredModules/StickersStore";
import type { ApplicationStreamingStore } from "@lib/RequiredModules/ApplicationStreamingStore";
import type { GuildMemberStore } from "@lib/RequiredModules/GuildMemberStore";
import type { ApplicationStreamPreviewStore } from "@lib/RequiredModules/ApplicationStreamPreviewStore";

export namespace Types {
  export import DefaultTypes = types;
  export type Store = Flux.Store;
  export type Guild = GeneralDiscordTypes.Guild & { canAnimate?: true };
  export type Channel = GeneralDiscordTypes.Channel & { canAnimate?: true };
  export type User = GeneralDiscordTypes.User & { canAnimate?: true };
  export type GuildMember = GeneralDiscordTypes.GuildMember;
  export type Message = GeneralDiscordTypes.Message;
  export type ReactTree = util.Tree & React.ReactElement;
  export type SliderControl = Design.MenuSliderControl;

  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    MediaModal?: MediaModal;
    IconUtils?: IconUtils;
    MediaModalLazy?: MediaModalLazy;
    ImageZoomWrapper?: ImageZoomWrapper;

    GuildMemberStore?: GuildMemberStore;
    ApplicationStreamingStore?: ApplicationStreamingStore;
    ApplicationStreamPreviewStore?: ApplicationStreamPreviewStore;
    StickersStore?: StickersStore;
  }
}
export default Types;
declare global {
  export const webpackChunkdiscord_app: WebpackChunkGlobal;

  export const DiscordNative: {
    clipboard: {
      copy: (content: string) => void;
    };
  };
}
