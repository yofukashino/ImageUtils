import { types } from "replugged";
import type util from "replugged/util";
import { Store } from "replugged/dist/renderer/modules/common/flux";
import GeneralDiscordTypes from "discord-types/general";

export namespace Types {
  export import DefaultTypes = types;
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
  export interface IconUtils {
    DEFAULT_AVATARS: string[];
    SUPPORTS_WEBP: boolean;
    default: {
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
    };
    getAvatarDecorationURL: DefaultTypes.AnyFunction;
    getEmojiURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURL: DefaultTypes.AnyFunction;
    getGuildMemberAvatarURLSimple: DefaultTypes.AnyFunction;
    getGuildMemberBannerURL: DefaultTypes.AnyFunction;
    getUserAvatarURL: DefaultTypes.AnyFunction;
    getUserBannerURL: DefaultTypes.AnyFunction;
    getVideoFilterAssetURL: DefaultTypes.AnyFunction;
    isAnimatedIconHash: DefaultTypes.AnyFunction;
    isAnimatedImageURL: DefaultTypes.AnyFunction;
    isVideoAssetHash: DefaultTypes.AnyFunction;
  }
  export interface ImageModalClasses {
    image: string;
    modal: string;
  }
  export interface ImageModalModule {
    ImageModal: DefaultTypes.AnyFunction &
      React.ComponentType<
        Partial<{
          className: string;
          original: string;
          placeholder: string;
          src: string;
          children: (...args: unknown[]) => React.ReactElement;
          renderLinkComponent: (...args: unknown[]) => React.ReactElement;
          shouldHideMediaOption: boolean;
          shouldAnimate: boolean;
        }>
      >;
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
  export interface USRBD_USER {
    img: string;
    uid: string;
    _id: string;
  }

  export interface DiscordNative {
    accessibility: {
      isAccessibilitySupportEnabled: DefaultTypes.AnyFunction;
    };
    app: {
      dock: {
        setBadge: DefaultTypes.AnyFunction;
        bounce: DefaultTypes.AnyFunction;
        cancelBounce: DefaultTypes.AnyFunction;
      };
      getBuildNumber: DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: DefaultTypes.AnyFunction;
      getModuleVersions: DefaultTypes.AnyFunction;
      getPath: DefaultTypes.AnyFunction;
      getReleaseChannel: DefaultTypes.AnyFunction;
      getVersion: DefaultTypes.AnyFunction;
      registerUserInteractionHandler: DefaultTypes.AnyFunction;
      relaunch: DefaultTypes.AnyFunction;
      setBadgeCount: DefaultTypes.AnyFunction;
    };
    clipboard: {
      copy: DefaultTypes.AnyFunction;
      copyImage: DefaultTypes.AnyFunction;
      cut: DefaultTypes.AnyFunction;
      paste: DefaultTypes.AnyFunction;
      read: DefaultTypes.AnyFunction;
    };
    clips: {
      deleteClip: DefaultTypes.AnyFunction;
      loadClip: DefaultTypes.AnyFunction;
      loadClipsDirectory: DefaultTypes.AnyFunction;
    };
    crashReporter: {
      getMetadata: DefaultTypes.AnyFunction;
      updateCrashReporter: DefaultTypes.AnyFunction;
    };
    desktopCapture: {
      getDesktopCaptureSources: DefaultTypes.AnyFunction;
    };
    features: {
      declareSupported: DefaultTypes.AnyFunction;
      supports: DefaultTypes.AnyFunction;
    };
    fileManager: {
      basename: DefaultTypes.AnyFunction;
      cleanupTempFiles: DefaultTypes.AnyFunction;
      dirname: DefaultTypes.AnyFunction;
      extname: DefaultTypes.AnyFunction;
      getModuleDataPathSync: DefaultTypes.AnyFunction;
      getModulePath: DefaultTypes.AnyFunction;
      join: DefaultTypes.AnyFunction;
      openFiles: DefaultTypes.AnyFunction;
      readLogFiles: DefaultTypes.AnyFunction;
      readTimeSeriesLogFiles: DefaultTypes.AnyFunction;
      saveWithDialog: DefaultTypes.AnyFunction;
      showItemInFolder: DefaultTypes.AnyFunction;
      showOpenDialog: DefaultTypes.AnyFunction;
    };
    gpuSettings: {
      getEnableHardwareAcceleration: DefaultTypes.AnyFunction;
      setEnableHardwareAcceleration: DefaultTypes.AnyFunction;
    };
    http: {
      getAPIEndpoint: DefaultTypes.AnyFunction;
      makeChunkedRequest: DefaultTypes.AnyFunction;
    };
    ipc: {
      invoke: DefaultTypes.AnyFunction;
      on: DefaultTypes.AnyFunction;
      send: DefaultTypes.AnyFunction;
    };
    isRenderer: boolean;
    nativeModules: {
      canBootstrapNewUpdater: boolean;
      ensureModule: DefaultTypes.AnyFunction;
      requireModule: DefaultTypes.AnyFunction;
    };
    os: {
      arch: string;
      release: string;
    };
    powerMonitor: {
      getSystemIdleTimeMs: DefaultTypes.AnyFunction;
      on: DefaultTypes.AnyFunction;
      removeAllListeners: DefaultTypes.AnyFunction;
      removeListener: DefaultTypes.AnyFunction;
    };
    powerSaveBlocker: {
      blockDisplaySleep: DefaultTypes.AnyFunction;
      cleanupDisplaySleep: DefaultTypes.AnyFunction;
      unblockDisplaySleep: DefaultTypes.AnyFunction;
    };
    process: {
      arch: string;
      env: object;
      platform: string;
    };
    processUtils: {
      flushCookies: DefaultTypes.AnyFunction;
      flushDNSCache: DefaultTypes.AnyFunction;
      flushStorageData: DefaultTypes.AnyFunction;
      getCPUCoreCount: DefaultTypes.AnyFunction;
      getCurrentCPUUsagePercent: DefaultTypes.AnyFunction;
      getCurrentMemoryUsageKB: DefaultTypes.AnyFunction;
      getLastCrash: DefaultTypes.AnyFunction;
      getMainArgvSync: DefaultTypes.AnyFunction;
      purgeMemory: DefaultTypes.AnyFunction;
    };
    remoteApp: {
      dock: {
        setBadge: DefaultTypes.AnyFunction;
        bounce: DefaultTypes.AnyFunction;
        cancelBounce: DefaultTypes.AnyFunction;
      };
      getBuildNumber: DefaultTypes.AnyFunction;
      getDefaultDoubleClickAction: DefaultTypes.AnyFunction;
      getModuleVersions: DefaultTypes.AnyFunction;
      getPath: DefaultTypes.AnyFunction;
      getReleaseChannel: DefaultTypes.AnyFunction;
      getVersion: DefaultTypes.AnyFunction;
      registerUserInteractionHandler: DefaultTypes.AnyFunction;
      relaunch: DefaultTypes.AnyFunction;
      setBadgeCount: DefaultTypes.AnyFunction;
    };
    remotePowerMonitor: {
      getSystemIdleTimeMs: DefaultTypes.AnyFunction;
      on: DefaultTypes.AnyFunction;
      removeAllListeners: DefaultTypes.AnyFunction;
      removeListener: DefaultTypes.AnyFunction;
    };
    safeStorage: {
      decryptString: DefaultTypes.AnyFunction;
      encryptString: DefaultTypes.AnyFunction;
      isEncryptionAvailable: DefaultTypes.AnyFunction;
    };
    setUncaughtExceptionHandler: DefaultTypes.AnyFunction;
    settings: {
      get: DefaultTypes.AnyFunction;
      getSync: DefaultTypes.AnyFunction;
      set: DefaultTypes.AnyFunction;
    };
    spellCheck: {
      getAvailableDictionaries: DefaultTypes.AnyFunction;
      on: DefaultTypes.AnyFunction;
      removeListener: DefaultTypes.AnyFunction;
      replaceMisspelling: DefaultTypes.AnyFunction;
      setLearnedWords: DefaultTypes.AnyFunction;
      setLocale: DefaultTypes.AnyFunction;
    };
    thumbar: { setThumbarButtons: DefaultTypes.AnyFunction };
    userDataCache: {
      cacheUserData: DefaultTypes.AnyFunction;
      deleteCache: DefaultTypes.AnyFunction;
      getCached: DefaultTypes.AnyFunction;
    };
    window: {
      USE_OSX_NATIVE_TRAFFIC_LIGHTS: boolean;
      blur: DefaultTypes.AnyFunction;
      close: DefaultTypes.AnyFunction;
      flashFrame: DefaultTypes.AnyFunction;
      focus: DefaultTypes.AnyFunction;
      fullscreen: DefaultTypes.AnyFunction;
      isAlwaysOnTop: DefaultTypes.AnyFunction;
      maximize: DefaultTypes.AnyFunction;
      minimize: DefaultTypes.AnyFunction;
      restore: DefaultTypes.AnyFunction;
      setAlwaysOnTop: DefaultTypes.AnyFunction;
      setBackgroundThrottling: DefaultTypes.AnyFunction;
      setDevtoolsCallbacks: DefaultTypes.AnyFunction;
      setProgressBar: DefaultTypes.AnyFunction;
      setZoomFactor: DefaultTypes.AnyFunction;
    };
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
