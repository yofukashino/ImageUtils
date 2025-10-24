import type Types from "@Types";
import { webpack } from "replugged";
export interface ApplicationStreamPreviewStore extends Types.Store, Record<string, unknown> {
  getPreviewURL: (guildId: string, channelId: string, ownerId: string) => string;
}
export default await webpack
  .waitForStore<ApplicationStreamPreviewStore>("ApplicationStreamPreviewStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find ApplicationStreamPreviewStore");
  });
