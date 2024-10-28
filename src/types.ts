import { types } from "replugged";
import type util from "replugged/util";
import { Store } from "replugged/dist/renderer/modules/common/flux";
import { ContextMenuProps } from "replugged/dist/renderer/modules/components/ContextMenu";
import GeneralDiscordTypes from "discord-types/general";

export namespace Types {
  export import DefaultTypes = types;
  export type MenuProps = ContextMenuProps["ContextMenu"];
  export type Guild = GeneralDiscordTypes.Guild;
  export type Channel = GeneralDiscordTypes.Channel;
  export type User = GeneralDiscordTypes.User;
  export type Message = GeneralDiscordTypes.Message;
  export type UtilTree = util.Tree;
  export type ReactTree = util.Tree & React.ReactElement;
  export interface MediaModal {
    IMAGE_GIF_RE: string;
    default: DefaultTypes.AnyFunction;
  }
  export interface OriginalCompoenntProps {
    alt: string;
    className: string;
    mediaLayoutType: string;
    size: { width: number; height: number };
    src: string;
  }
  export interface MediaModalsInstance extends DefaultTypes.ObjectExports {
    props: {
      animated: boolean;
      autoPlay: boolean;
      children: DefaultTypes.AnyFunction & React.ComponentType<OriginalCompoenntProps>;
      height: number;
      maxHeight: number;
      maxWidth: number;
      minHeight: number;
      minWidth: number;
      onContextMenu: DefaultTypes.AnyFunction;
      placeholder: number;
      responsive: boolean;
      shouldLink: boolean;
      shouldRenderAccessory: boolean;
      src: string;
      width: number;
    };
    state: { readyState: string };
  }
  export interface ImageUtilsProps {
    animated: boolean;
    autoPlay: boolean;
    children: DefaultTypes.AnyFunction & React.ComponentType;
    height: number;
    maxHeight: number;
    maxWidth: number;
    minHeight: number;
    minWidth: number;
    onContextMenu: DefaultTypes.AnyFunction;
    placeholder: number;
    responsive: boolean;
    shouldLink: boolean;
    shouldRenderAccessory: boolean;
    src: string;
    width: number;
    childProps: OriginalCompoenntProps;
    ready: boolean;
  }

  export interface ImageDetailsProps {
    children: React.ReactElement[] | React.ReactElement;
    src: string;
  }
  export interface IconUtils {
    getAnimatableSourceWithFallback: DefaultTypes.AnyFunction;
    getApplicationIconSource: DefaultTypes.AnyFunction;
    getApplicationIconURL: DefaultTypes.AnyFunction;
    getAvatarDecorationURL: DefaultTypes.AnyFunction;
    getChannelIconSource: DefaultTypes.AnyFunction;
    getChannelIconURL: DefaultTypes.AnyFunction;
    getDefaultAvatarURL: DefaultTypes.AnyFunction;
    getEmojiURL: DefaultTypes.AnyFunction;
    getGameAssetSource: DefaultTypes.AnyFunction;
    getGameAssetURL: DefaultTypes.AnyFunction;
    getGuildBannerSource: DefaultTypes.AnyFunction;
    getGuildBannerURL: DefaultTypes.AnyFunction;
    getGuildDiscoverySplashSource: DefaultTypes.AnyFunction;
    getGuildDiscoverySplashURL: DefaultTypes.AnyFunction;
    getGuildHomeHeaderSource: DefaultTypes.AnyFunction;
    getGuildHomeHeaderURL: DefaultTypes.AnyFunction;
    getGuildIconSource: DefaultTypes.AnyFunction;
    getGuildIconURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarSource: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURLSimple: DefaultTypes.AnyFunction;
    getGuildMemberBannerURL: DefaultTypes.AnyFunction;
    getGuildSplashSource: DefaultTypes.AnyFunction;
    getGuildSplashURL: DefaultTypes.AnyFunction;
    getGuildTemplateIconSource: DefaultTypes.AnyFunction;
    getGuildTemplateIconURL: DefaultTypes.AnyFunction;
    getUserAvatarColor: DefaultTypes.AnyFunction;
    getUserAvatarSource: DefaultTypes.AnyFunction;
    getUserAvatarURL: DefaultTypes.AnyFunction;
    getUserBannerURL: DefaultTypes.AnyFunction;
    getVideoFilterAssetURL: DefaultTypes.AnyFunction;
    hasAnimatedGuildIcon: DefaultTypes.AnyFunction;
    isAnimatedIconHash: DefaultTypes.AnyFunction;
    makeSource: DefaultTypes.AnyFunction;
  }
  export interface ImageModalClasses {
    image: string;
    modal: string;
  }
  export interface ImageModalModule {
    ImageModal: DefaultTypes.AnyFunction &
      React.ComponentType<
        Partial<{
          items: Array<{
            className: string;
            original: string;
            zoomThumbnailPlaceholder: string;
            type: string;
            src: string;
            children?: (...args: unknown[]) => React.ReactElement;
            shouldHideMediaOption: boolean;
          }>;
        }>
      >;
  }
  export interface ImageModalLazy {
    openModal: (props: React.ComponentProps<ImageModalModule["ImageModal"]>) => void;
  }
  export interface GuildMemberStore extends Store {
    getCommunicationDisabledUserMap: DefaultTypes.AnyFunction;
    getCommunicationDisabledVersion: DefaultTypes.AnyFunction;
    getMember: DefaultTypes.AnyFunction;
    getMemberIds: DefaultTypes.AnyFunction;
    getMemberRoleWithPendingUpdates: DefaultTypes.AnyFunction;
    getMembers: DefaultTypes.AnyFunction;
    getMutableAllGuildsAndMembers: DefaultTypes.AnyFunction;
    getNick: DefaultTypes.AnyFunction;
    getNicknameGuildsMapping: DefaultTypes.AnyFunction;
    getNicknames: DefaultTypes.AnyFunction;
    getPendingRoleUpdates: DefaultTypes.AnyFunction;
    getSelfMember: DefaultTypes.AnyFunction;
    getTrueMember: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isMember: DefaultTypes.AnyFunction;
    memberOf: DefaultTypes.AnyFunction;
  }
  export interface ApplicationStreamingStore extends Store {
    getActiveStreamForApplicationStream: DefaultTypes.AnyFunction;
    getActiveStreamForStreamKey: DefaultTypes.AnyFunction;
    getActiveStreamForUser: DefaultTypes.AnyFunction;
    getAllActiveStreams: DefaultTypes.AnyFunction;
    getAllActiveStreamsForChannel: DefaultTypes.AnyFunction;
    getAllApplicationStreams: DefaultTypes.AnyFunction;
    getAllApplicationStreamsForChannel: DefaultTypes.AnyFunction;
    getAnyStreamForUser: DefaultTypes.AnyFunction;
    getCurrentAppIntent: DefaultTypes.AnyFunction;
    getCurrentUserActiveStream: DefaultTypes.AnyFunction;
    getLastActiveStream: DefaultTypes.AnyFunction;
    getRTCStream: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    getStreamForUser: DefaultTypes.AnyFunction;
    getStreamerActiveStreamMetadata: DefaultTypes.AnyFunction;
    getViewerIds: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isSelfStreamHidden: DefaultTypes.AnyFunction;
  }
  export interface ApplicationStreamPreviewStore extends Store {
    getIsPreviewLoading: DefaultTypes.AnyFunction;
    getPreviewURL: DefaultTypes.AnyFunction;
    getPreviewURLForStreamKey: DefaultTypes.AnyFunction;
  }
  export interface StickersStore extends Store {
    getAllGuildStickers: DefaultTypes.AnyFunction;
    getAllStickersIterator: DefaultTypes.AnyFunction;
    getPremiumPacks: DefaultTypes.AnyFunction;
    getRawStickersByGuild: DefaultTypes.AnyFunction;
    getStickerById: (...args: unknown[]) => { format_type: number };
    getStickerPack: DefaultTypes.AnyFunction;
    getStickersByGuildId: DefaultTypes.AnyFunction;
    hasLoadedStickerPacks: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isFetchingStickerPacks: DefaultTypes.AnyFunction;
    isLoaded: DefaultTypes.AnyFunction;
    isPremiumPack: DefaultTypes.AnyFunction;
    loadState: DefaultTypes.AnyFunction;
    stickerMetadata: DefaultTypes.AnyFunction;
  }
  export interface GuildMember {
    avatar?: string;
    color: number;
    colorRoleId?: string;
    colorString?: string;
    communicationDisabledUntil?: string;
    flags?: number;
    fullProfileLoadedTimestamp?: string;
    guildId?: string;
    highestRoleId?: string;
    hoistRoleId?: string;
    iconRoleId?: string;
    isPending: boolean;
    joinedAt?: string;
    nick?: string;
    premiumSince?: string;
    roles?: string[];
    unusualDMActivityUntil?: string;
    userId?: string;
    banner?: string;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    MediaModal?: MediaModal;
    IconUtils?: IconUtils;
    ImageModalClasses?: ImageModalClasses;
    MaskedLink?: React.ComponentType<unknown>;
    ImageModalLazy?: ImageModalLazy;
    ImageModalModulePromise?: Promise<ImageModalModule>;
    GuildMemberStore?: GuildMemberStore;
    ApplicationStreamingStore?: ApplicationStreamingStore;
    ApplicationStreamPreviewStore?: ApplicationStreamPreviewStore;
    StickersStore?: StickersStore;
  }
  export interface Settings {
    hideLens: boolean;
    darkenImage: boolean;
    saveValues: boolean;
    pixelZoom: boolean;
    invertScroll: boolean;
    square: boolean;
    zoom: number;
    size: number;
    scrollSpeed: number;
    iconSize: string[];
    iconType: string[];
    guild: boolean;
    user: boolean;
    gdm: boolean;
    userbg: boolean;
    stream: boolean;
    stickers: boolean;
    hex: boolean;
    host: boolean;
    dimensions: boolean;
    engines: string[];
  }
}
export default Types;

declare global {
  export const DiscordNative: {
    accessibility: {
      isAccessibilitySupportEnabled: Types.DefaultTypes.AnyFunction;
    };
    app: {
      dock: {
        setBadge: Types.DefaultTypes.AnyFunction;
        bounce: Types.DefaultTypes.AnyFunction;
        cancelBounce: Types.DefaultTypes.AnyFunction;
      };
      getBuildNumber: Types.DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: Types.DefaultTypes.AnyFunction;
      getModuleVersions: Types.DefaultTypes.AnyFunction;
      getPath: Types.DefaultTypes.AnyFunction;
      getReleaseChannel: Types.DefaultTypes.AnyFunction;
      getVersion: Types.DefaultTypes.AnyFunction;
      registerUserInteractionHandler: Types.DefaultTypes.AnyFunction;
      relaunch: Types.DefaultTypes.AnyFunction;
      setBadgeCount: Types.DefaultTypes.AnyFunction;
    };
    clipboard: {
      copy: Types.DefaultTypes.AnyFunction;
      copyImage: Types.DefaultTypes.AnyFunction;
      cut: Types.DefaultTypes.AnyFunction;
      paste: Types.DefaultTypes.AnyFunction;
      read: Types.DefaultTypes.AnyFunction;
    };
    clips: {
      deleteClip: Types.DefaultTypes.AnyFunction;
      loadClip: Types.DefaultTypes.AnyFunction;
      loadClipsDirectory: Types.DefaultTypes.AnyFunction;
    };
    crashReporter: {
      getMetadata: Types.DefaultTypes.AnyFunction;
      updateCrashReporter: Types.DefaultTypes.AnyFunction;
    };
    desktopCapture: {
      getDesktopCaptureSources: Types.DefaultTypes.AnyFunction;
    };
    features: {
      declareSupported: Types.DefaultTypes.AnyFunction;
      supports: Types.DefaultTypes.AnyFunction;
    };
    fileManager: {
      basename: Types.DefaultTypes.AnyFunction;
      cleanupTempFiles: Types.DefaultTypes.AnyFunction;
      dirname: Types.DefaultTypes.AnyFunction;
      extname: Types.DefaultTypes.AnyFunction;
      getModuleDataPathSync: Types.DefaultTypes.AnyFunction;
      getModulePath: Types.DefaultTypes.AnyFunction;
      join: Types.DefaultTypes.AnyFunction;
      openFiles: Types.DefaultTypes.AnyFunction;
      readLogFiles: Types.DefaultTypes.AnyFunction;
      readTimeSeriesLogFiles: Types.DefaultTypes.AnyFunction;
      saveWithDialog: Types.DefaultTypes.AnyFunction;
      showItemInFolder: Types.DefaultTypes.AnyFunction;
      showOpenDialog: Types.DefaultTypes.AnyFunction;
    };
    gpuSettings: {
      getEnableHardwareAcceleration: Types.DefaultTypes.AnyFunction;
      setEnableHardwareAcceleration: Types.DefaultTypes.AnyFunction;
    };
    http: {
      getAPIEndpoint: Types.DefaultTypes.AnyFunction;
      makeChunkedRequest: Types.DefaultTypes.AnyFunction;
    };
    ipc: {
      invoke: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      send: Types.DefaultTypes.AnyFunction;
    };
    isRenderer: boolean;
    nativeModules: {
      canBootstrapNewUpdater: boolean;
      ensureModule: Types.DefaultTypes.AnyFunction;
      requireModule: Types.DefaultTypes.AnyFunction;
    };
    os: {
      arch: string;
      release: string;
    };
    powerMonitor: {
      getSystemIdleTimeMs: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeAllListeners: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
    };
    powerSaveBlocker: {
      blockDisplaySleep: Types.DefaultTypes.AnyFunction;
      cleanupDisplaySleep: Types.DefaultTypes.AnyFunction;
      unblockDisplaySleep: Types.DefaultTypes.AnyFunction;
    };
    process: {
      arch: string;
      env: object;
      platform: string;
    };
    processUtils: {
      flushCookies: Types.DefaultTypes.AnyFunction;
      flushDNSCache: Types.DefaultTypes.AnyFunction;
      flushStorageData: Types.DefaultTypes.AnyFunction;
      getCPUCoreCount: Types.DefaultTypes.AnyFunction;
      getCurrentCPUUsagePercent: Types.DefaultTypes.AnyFunction;
      getCurrentMemoryUsageKB: Types.DefaultTypes.AnyFunction;
      getLastCrash: Types.DefaultTypes.AnyFunction;
      getMainArgvSync: Types.DefaultTypes.AnyFunction;
      purgeMemory: Types.DefaultTypes.AnyFunction;
    };
    remoteApp: {
      dock: {
        setBadge: Types.DefaultTypes.AnyFunction;
        bounce: Types.DefaultTypes.AnyFunction;
        cancelBounce: Types.DefaultTypes.AnyFunction;
      };
      getBuildNumber: Types.DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: Types.DefaultTypes.AnyFunction;
      getModuleVersions: Types.DefaultTypes.AnyFunction;
      getPath: Types.DefaultTypes.AnyFunction;
      getReleaseChannel: Types.DefaultTypes.AnyFunction;
      getVersion: Types.DefaultTypes.AnyFunction;
      registerUserInteractionHandler: Types.DefaultTypes.AnyFunction;
      relaunch: Types.DefaultTypes.AnyFunction;
      setBadgeCount: Types.DefaultTypes.AnyFunction;
    };
    remotePowerMonitor: {
      getSystemIdleTimeMs: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeAllListeners: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
    };
    safeStorage: {
      decryptString: Types.DefaultTypes.AnyFunction;
      encryptString: Types.DefaultTypes.AnyFunction;
      isEncryptionAvailable: Types.DefaultTypes.AnyFunction;
    };
    setUncaughtExceptionHandler: Types.DefaultTypes.AnyFunction;
    settings: {
      get: Types.DefaultTypes.AnyFunction;
      getSync: Types.DefaultTypes.AnyFunction;
      set: Types.DefaultTypes.AnyFunction;
    };
    spellCheck: {
      getAvailableDictionaries: Types.DefaultTypes.AnyFunction;
      on: Types.DefaultTypes.AnyFunction;
      removeListener: Types.DefaultTypes.AnyFunction;
      replaceMisspelling: Types.DefaultTypes.AnyFunction;
      setLearnedWords: Types.DefaultTypes.AnyFunction;
      setLocale: Types.DefaultTypes.AnyFunction;
    };
    thumbar: { setThumbarButtons: Types.DefaultTypes.AnyFunction };
    userDataCache: {
      cacheUserData: Types.DefaultTypes.AnyFunction;
      deleteCache: Types.DefaultTypes.AnyFunction;
      getCached: Types.DefaultTypes.AnyFunction;
    };
    window: {
      USE_OSX_NATIVE_TRAFFIC_LIGHTS: boolean;
      blur: Types.DefaultTypes.AnyFunction;
      close: Types.DefaultTypes.AnyFunction;
      flashFrame: Types.DefaultTypes.AnyFunction;
      focus: Types.DefaultTypes.AnyFunction;
      fullscreen: Types.DefaultTypes.AnyFunction;
      isAlwaysOnTop: Types.DefaultTypes.AnyFunction;
      maximize: Types.DefaultTypes.AnyFunction;
      minimize: Types.DefaultTypes.AnyFunction;
      restore: Types.DefaultTypes.AnyFunction;
      setAlwaysOnTop: Types.DefaultTypes.AnyFunction;
      setBackgroundThrottling: Types.DefaultTypes.AnyFunction;
      setDevtoolsCallbacks: Types.DefaultTypes.AnyFunction;
      setProgressBar: Types.DefaultTypes.AnyFunction;
      setZoomFactor: Types.DefaultTypes.AnyFunction;
    };
  };
}
