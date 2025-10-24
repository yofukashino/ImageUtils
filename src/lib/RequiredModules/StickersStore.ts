import type Types from "@Types";
import { webpack } from "replugged";

export interface StickersStore extends Types.Store, Record<string, unknown> {
  getStickerById: (...args: unknown[]) => { format_type: number };
}

export default await webpack
  .waitForStore<StickersStore>("StickersStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find StickersStore");
  });
