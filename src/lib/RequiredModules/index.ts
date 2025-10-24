import type Types from "@Types";

const Modules: Types.Modules = {
  Proxy: new Proxy({} as Types.Modules["Proxy"], {
    get(_, prop: Exclude<keyof Types.Modules, "loadModules" | "Proxy">) {
      return proxyModule(prop);
    },
  }),
};

function proxyModule<K extends Exclude<keyof Types.Modules, "loadModules" | "Proxy">>(
  key: K,
): Types.Modules[K] {
  return new Proxy({} as Types.Modules[K], {
    get(_, prop: string | symbol, receiver) {
      return Reflect.get(Modules[key], prop, receiver);
    },
    set(_, prop: string | symbol, value, receiver) {
      return Reflect.set(Modules[key], prop, value, receiver);
    },
    has(_, prop: string | symbol) {
      return Reflect.has(Modules[key], prop);
    },
    deleteProperty(_, prop: string | symbol) {
      return Reflect.deleteProperty(Modules[key], prop);
    },
    ownKeys(_) {
      return Reflect.ownKeys(Modules[key]);
    },
    getOwnPropertyDescriptor(_, prop: string | symbol) {
      return Reflect.getOwnPropertyDescriptor(Modules[key], prop);
    },
    defineProperty(_, prop: string | symbol, descriptor: PropertyDescriptor) {
      return Reflect.defineProperty(Modules[key], prop, descriptor);
    },
  });
}

const ModuleNames = [
  "MediaModal",
  "IconUtils",
  "ImageZoomWrapper",
  "MediaModalLazy",
  "GuildMemberStore",
  "ApplicationStreamingStore",
  "ApplicationStreamPreviewStore",
  "StickersStore",
] as const;

Modules.loadModules = async function (): Promise<void> {
  await Promise.all(
    ModuleNames.map(async (name) => {
      const mod = await import(`./${name}.ts`);
      Modules[name] = mod.default;
    }),
  );
};

export const {
  MediaModal,
  IconUtils,
  ImageZoomWrapper,
  MediaModalLazy,
  GuildMemberStore,
  ApplicationStreamingStore,
  ApplicationStreamPreviewStore,
  StickersStore,
} = Modules.Proxy;

export default Modules;
