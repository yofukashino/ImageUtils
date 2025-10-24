import type Types from "@Types";
import { webpack } from "replugged";

export interface ApplicationStreamingStore extends Types.Store, Record<string, unknown> {
  getAnyStreamForUser: (userId: string) => {
    guildId: string;
    channelId: string;
    ownerId: string;
  };
}

export default await webpack
  .waitForStore<ApplicationStreamingStore>("ApplicationStreamingStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find ApplicationStreamingStore");
  });
