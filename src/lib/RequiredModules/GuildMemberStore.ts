import type Types from "@Types";
import { webpack } from "replugged";
export interface GuildMemberStore extends Types.Store, Record<string, unknown> {
  /*    getCommunicationDisabledUserMap: DefaultTypes.AnyFunction;
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
    memberOf: DefaultTypes.AnyFunction; */
  getMember: (guildId: string, userId: string) => Types.GuildMember;
}
export default await webpack
  .waitForStore<GuildMemberStore>("GuildMemberStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find GuildMemberStore");
  });
