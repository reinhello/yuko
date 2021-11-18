import { EventEmitter } from "events";

/**
 * A Discord Library Written In JavaScript
 */
declare module "yuko";

type ActionRowComponents = Button | SelectMenu;
type ActivityType = 0 | 1 | 2 | 3 | 5;
type AnyChannel = TextChannel | DMChannel | GuildChannel | Channel;
type AnyGuildChannel = TextChannel | GuildChannel;
type ChannelTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13;
type ContentType = string | "application/json";
type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
type GatewayIntentOptions = "Guilds" | "GuildMembers" | "GuildBans" | "GuildEmojis" | "GuildIntegrations" | "GuildWebhooks" | "GuildInvites" | "GuildVoiceStates" | "GuildPresences" | "GuildMessages" | "GuildMessageReactions" | "GuildMessageTyping" | "DirectMessages" | "DirectMessageReactions" | "DirectMessageTyping" | "AllPrivileged" | "AllNonPrivileged" | "AllGuild" | "AllDM" | "All";
type PresenceStatusOptions = "online" | "dnd" | "idle" | "offline" | "invisible";

interface ActionRow {
    components: ActionRowComponents[];
    type: 1
}

interface AllowedMentions {
    everyone?: boolean;
    repliedUser?: boolean;
    roles?: boolean | string[];
    users?: boolean | string[];
}

interface Button {
    custom_id: string;
    disabled?: boolean;
    emoji?: EmojiOptions;
    label?: string;
    style: 1 | 2 | 3 | 4 | 5;
    type: 2;
    url?: string;
}

interface ClientEvents {
    error: [error: string, shardID?: number];
    gatewayReady: [];
    gatewayResumed: [];
    guildAvailable: [guild: Guild];
    guildCreate: [guild: Guild];
    messageCreate: [message: Message];
    rawWebsocket: [packet: RawPacket];
    shardPreReady: [shardID: number];
}

interface ClientOptions {
    allowedMentions?: AllowedMentions;
    autoReconnect?: boolean;
    intents: GatewayIntentOptions[];
    messageCacheLimit?: number;
    shardCount?: number | "auto";
}

interface Constants {
    ChannelTypes: {
        GUILD_TEXT: 0;
        DM: 1;
        GUILD_VOICE: 2;
        GROUP_DM: 3;
        GUILD_CATEGORY: 4;
        GUILD_NEWS: 5;
        GUILD_STORE: 6;
        GUILD_NEWS_THREAD: 10;
        GUILD_THREAD: 11;
        GUILD_PRIVATE_THREAD: 12;
        GUILD_STAGE_VOICE: 13;
    };
    GatewayIntents: {
        Guilds: 1;
        GuildMembers: 2;
        GuildBans: 4;
        GuildEmojis: 8;
        GuildIntegrations: 16;
        GuildWebhooks: 32;
        GuildInvites: 64;
        GuildVoiceStates: 128;
        GuildPresences: 256;
        GuildMessages: 512;
        GuildMessageReactions: 1024;
        GuildMessageTyping: 2048;
        DirectMessages: 4096;
        DirectMessageReaction: 8192;
        DirectMessageTyping: 16384;
        AllPrivileged: 258;
        AllNonPrivileged: 32509;
        AllGuild: 4095;
        AllDM: 28672;
        All: 32767;
    };
    GatewayOPCodes: {
        EVENT: 0;
        HEARTBEAT: 1;
        IDENTIFY: 2;
        PRESENCE_UPDATE: 3;
        VOICE_STATE_UPDATE: 4;
        VOICE_SERVER_PING: 5;
        RESUME: 6;
        RECONNECT: 7;
        GET_GUILD_MEMBERS: 8;
        INVALID_SESSION: 9;
        HELLO: 10;
        HEARTBEAT_ACK: 11;
        SYNC_GUILD: 12;
        SYNC_CALL: 13;
    };
    ImageFormatTypes: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif"
    ],
    ImageSizes: {
        MAXIMUM: 4096;
        MINIMUM: 16;
    };
    MessageActivityFlags: {
        INSTANCE: 1;
        JOIN: 2;
        SPECTATE: 4;
        JOIN_REQUEST: 8;
        SYNC: 16;
        PLAY: 32;
        PARTY_PRIVACY_FRIENDS: 64;
        PARTY_PRIVACY_VOICE_CHANNEL: 128;
        EMBEDDED: 256;
    };
    MessageActivityTypes: {
        JOIN: 1;
        SPECTATE: 2;
        LISTEN: 3;
        JOIN_REQUEST: 5;
    };
    MessageFlags: {
        CROSSPOSTED: 1;
        IS_CROSSPOST: 2;
        SUPPRESS_EMBEDS: 4;
        SOURCE_MESSAGE_DELETED: 8;
        URGENT: 16;
        HAS_THREAD: 32;
        EPHEMERAL: 64;
        LOADING: 128;
    };
    MessageTypes: {
        DEFAULT: 0;
        RECIPIENT_ADD: 1;
        RECIPIENT_REMOVE: 2;
        CALL: 3;
        CHANNEL_NAME_CHANGE: 4;
        CHANNEL_ICON_CHANGE: 5;
        CHANNEL_PINNED_MESSAGE: 6;
        GUILD_MEMBER_JOIN: 7;
        USER_PREMIUM_GUILD_SUBSCRIPTION: 8;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1: 9;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2: 10;
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3: 11;
        CHANNEL_FOLLOW_ADD: 12;

        GUILD_DISCOVERY_DISQUALIFIED: 14;
        GUILD_DISCOVERY_REQUALIFIED: 15;
        GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16;
        GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17;
        THREAD_CREATED: 18;
        REPLY: 19;
        CHAT_INPUT_COMMAND: 20;
        THREAD_STARTER_MESSAGE: 21;
        GUILD_INVITE_REMINDER: 22;
        CONTEXT_MENU_COMMAND: 23;
    };
}

interface EditMemberOptions {
    channelID?: string;
    deaf?: boolean;
    mute?: boolean;
    nick?: string;
    roles?: string[];
}

interface EmbedAuthorOptions {
    icon_url?: string;
    name: string;
    url?: string;
}

interface EmbedFieldOptions {
    inline?: boolean;
    name: string;
    value: string;
}

interface EmbedFooterOptions {
    icon_url?: string;
    text?: string;
}

interface EmbedImageOptions {
    url?: string;
}

interface EmbedOptions {
    author?: EmbedAuthorOptions;
    color?: number;
    description?: string;
    fields: EmbedFieldOptions[];
    footer?: EmbedFooterOptions;
    image?: EmbedImageOptions;
    thumbnail?: EmbedImageOptions;
    timestamps?: string | Date;
    title?: string;
    url?: string;
}

interface EmojiOptions {
    animated?: boolean;
    name: string;
    id?: string;
}

interface PresenceActivityOptions {
    name?: string;
    type?: ActivityType;
    url?: string;
}

interface MessageOptions {
    allowedMentions?: AllowedMentions;
    components?: ActionRow[];
    content?: string;
    embeds?: EmbedOptions[];
    flags?: number;
    messageReference?: MessageReferenceOptions;
    tts?: boolean;
}

interface MessageReferenceOptions {
    channelID?: string;
    failIfNotExists?: boolean;
    guildID?: string;
    messageID: string;
}

interface Ratelimit {
    delay: number;
    limit: number;
    remaining: number;
    reset: number;
}

interface RawPacket {
    d?: unknown;
    op: number;
    s?: number;
    t?: string;
}

interface SelectMenu {
    custom_id: string;
    disabled: boolean;
    max_values?: number;
    min_values?: number;
    options: SelectMenuOptions[];
    placeholder?: string;
    type: 3;
}

interface SelectMenuOptions {
    default?: boolean;
    description?: string;
    emoji?: EmojiOptions;
    label: string;
    value: string;
}

export class Base {
    constructor(id?: string);

    createdAt: number;
    id: string;
    getCreatedAt(id: string): number;
    toJSON(props: string[]): { id: string, createdAt: number };
    toString(): string;
}

export class Channel extends Base {
    constructor(client: Client, data: any);

    id: string;
    type: ChannelTypes;
    from(client: Client, data: any): AnyChannel;
}

export class Client extends EventEmitter {
    constructor(token: string, options: ClientOptions);

    channels: Collection<Channel>;
    connected: boolean;
    gateway: Shard;
    guilds: Collection<Guild>;
    messages: Collection<Message>;
    options: ClientOptions;
    rest: RESTManager;
    shards: Collection<Shard>;
    startupTimestamp: number;
    token: string;
    uptime: number;
    user: ClientUser;
    users: Collection<User>
    addGuildMemberRole(guildID: string, memberID: string, roleID: string): Promise<void>;
    bulkDeleteMessages(channelID: string, messageIDs: string[]): Promise<void>;
    connect(): Promise<void>;
    createMessage(channelID: string, options: MessageOptions): Promise<Message>;
    createUserDM(userID: string): Promise<DMChannel>;
    deleteMessage(channelID: string, messageID: string): Promise<void>;
    editGuildMember(guildID: string, memberID: string, options: EditMemberOptions): Promise<Member>;
    editMessage(channelID: string, messageID: string, options: MessageOptions): Promise<Message>;
    getMessages(channelID: string): Promise<Message[]>;
    removeGuildMemberRole(guildID: string, memberID: string, roleID: string): Promise<void>;
    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
    on<S extends string | symbol>(
        event: Exclude<S, keyof ClientEvents>,
        listener: (...args: any[]) => void,
    ): this;
    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
    once<S extends string | symbol>(
        event: Exclude<S, keyof ClientEvents>,
        listener: (...args: any[]) => void,
    ): this;
    emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
    emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: any[]): boolean;
    off<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
    off<S extends string | symbol>(
        event: Exclude<S, keyof ClientEvents>,
        listener: (...args: any[]) => void,
    ): this;
    removeAllListeners<K extends keyof ClientEvents>(event?: K): this;
    removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>): this;
}

export class ClientUser extends User {
    constructor(client: Client, data: any);

    locale: string;
    mfaEnabled: boolean;
    verified: boolean;
    editStatus(status: PresenceStatusOptions, activity?: PresenceActivityOptions): void;
}

export class Collection<T extends { id: string | number }> extends Map<string | number, T> {
    base: new (...args: any[]) => T;
    limit?: number;
    constructor(base: new (...args: any[]) => T, limit?: number);
    add(obj: T, extra?: unknown, replace?: boolean): T;
    every(func: (i: T) => boolean): boolean;
    filter(func: (i: T) => boolean): T[];
    find(func: (i: T) => boolean): T | undefined;
    map<R>(func: (i: T) => R): R[];
    random(): T | undefined;
    reduce<U>(func: (accumulator: U, val: T) => U, initialValue?: U): U;
    remove(obj: T): T | null;
    some(func: (i: T) => boolean): boolean;
    update(obj: T, extra?: unknown, replace?: boolean): T;
}

export class DMChannel extends Channel {
    constructor(client: Client, data: any);

    lastMessageID: string;
    createMessage(options: MessageOptions): Promise<Message>;
    deleteMessage(messageID: string): Promise<void>;
    editMessage(channelID: string, options: MessageOptions): Promise<Message>;
    getMessages(): Promise<Message[]>;
}

export class Guild extends Base {
    constructor(client: Client, data: any);

    bannerURL?: string;
    channels: Collection<Channel>;
    client: Client;
    icon?: string;
    iconURL?: string;
    memberCount: number;
    members: Collection<Member>;
    name: string;
    nsfwLevel: number;
    id: string;
    region: string;
    roles: Collection<Role>;
}

export class GuildChannel extends Channel {
    constructor(client: Client, data: any);

    client: Client;
    guild: Guild;
    id: string;
    name: string;
    position: number;
}

export class Member extends User {
    constructor(client: Client, guild: Guild, data: any);

    deafened: boolean;
    guild: Guild;
    joinedAt: number;
    muted: boolean;
    nick: string;
    roles: string[];
    user: User;
    addRole(roleID: string): Promise<void>;
    edit(options: EditMemberOptions): Promise<Member>;
    removeRole(roleID: stirng): Promise<void>;
    toUser(): User;
}

export class Message extends Base {
    constructor(client: Client, data: any);

    attachments: object[];
    author: User;
    channelID: string;
    channel: TextChannel;
    client: Client;
    components: ActionRow[];
    content: string;
    editedTimestamp: number;
    embeds: EmbedOptions[];
    guild: Guild;
    guildID: string;
    id: string;
    member: Member;
    messageReference: MessageReferenceOptions;
    pinned: boolean;
    timestamp: number;
    tts: boolean;
    type: number;
    delete(): Promise<void>;
    edit(options: MessageOptions): Promise<Message>;
}

export class RESTManager {
    constructor(client: Client);

    client: Client;
    globallyLimited: boolean;
    locallyLimited: boolean;
    ratelimited: boolean;
    ratelimit: Ratelimit;
    requesters: Map<string, Route>;
    running: boolean;
    retries: Map<string, Route>;
    userAgent: string;
    request(method: HTTPMethod, endpoint: string, payload?: unknown, contentType?: ContentType): Promise<any>;
    route(method: HTTPMethod, route: string);
}

export class Role extends Base {
    constructor(client: Client, guild: Guild, data: any);

    client: Client;
    color: string;
    guild: Guild;
    hoist: boolean;
    iconURL?: string;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    position: number;
}

export class Route {
    constructor(method: HTTPMethod, route: string);

    url: string;
}

export class Shard {
    constructor(client: Client, shardID?: number);

    client: Client;
    connected: boolean;
    id: number;
    lastPing: number;
    latencies: number[];
    latency: number;
    sequence: object;
    sessionID: string;
    socketURL: string;
    heartbeat(): Promise<void>;
    processWebsocketData(rawData: RawPacket): Promise<void>;
    send(data: object[]): Promise<any>;
    setupWebsocket(): Promise<void>;
    start(): Promise<void>;

}

export class TextChannel extends GuildChannel {
    constructor(client: Client, data: any);

    lastMessageID: string;
    name: string;
    nsfw: boolean;
    topic: string;
    createMessage(options: MessageOptions): Promise<Message>;
    deleteMessage(messageID: string): Promise<void>;
    editMessage(channelID: string, options: MessageOptions): Promise<Message>;
    getMessages(): Promise<Message[]>;
}

export class User extends Base {
    constructor(client: Client, data: any);

    bot: boolean;
    client: Client;
    discriminator: string;
    id: string;
    publicFlags: number;
    system: boolean;
    username: string;
    createDM(): Promise<DMChannel>;
}

export const Constants: Constants;
export const VERSION: string;