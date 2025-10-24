import { webpack } from "replugged";
import type Types from "@Types";

export interface IconUtils {
  getChannelIconURL: (channel: Partial<Types.Channel>, animated?: boolean) => string;
  getGuildIconURL: (guild: Partial<Types.Guild>, animated?: boolean) => string;
  getGuildBannerURL: (guild: Partial<Types.Guild>, animated?: boolean) => string;
  getGuildSplashURL: (guild: Partial<Types.Guild>, animated?: boolean) => string;
  getUserAvatarURL: (user: Partial<Types.User>, animated?: boolean) => string;
  getUserBannerURL: (user: Partial<Types.User>, animated?: boolean) => string;
  getGuildMemberAvatarURL: (member: Partial<Types.GuildMember>, animated?: boolean) => string;
  getGuildMemberBannerURL: (member: Partial<Types.GuildMember>, animated?: boolean) => string;
}

export default await webpack
  .waitForProps<IconUtils>(["getUserAvatarURL"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find IconUtils Module");
  });
