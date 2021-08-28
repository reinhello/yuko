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
type ContentType = string | "application/json"
type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
type IntentOptions = "guilds" | "guildMembers" | "guildBans" | "guildEmojis" | "guildIntegrations" | "guildWebhooks" | "guildInvites" | "guildVoiceStates" | "guildPresences" | "guildMessages" | "guildMessageReactions" | "guildMessageTyping" | "directMessages" | "directMessageReactions" | "directMessageTyping";
type Status = "online" | "idle" | "dnd" | "invisible";

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
    emoji?: object;
    label?: string;
    style: 1 | 2 | 3 | 4 | 5;
    type: 2;
    url?: string;
}

interface ClientEvents {
    ready: [];
    guildAvailable: [guild: Guild];
    guildCreate: [guild: Guild];
    messageCreate: [message: Message];
    shardPreReady: [shardID: number];
}

interface ClientOptions {
    allowedMentions?: AllowedMentions;
    intents: IntentOptions[];
    shard?: boolean;
    shardCount?: number | "auto";
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

interface GameActivity {
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
    emoji?: object;
    label: string;
    value: string;
}

export class Base {
    constructor(id: string);

    createdAt: number;
    id: string;
    getCreatedAt(id: string): number;
    toJSON(props: string[]): { id: string, createdAt: number };
    toString(): string;
}

export class Channel extends Base {
    constructor(client: Client, data: object);

    id: string;
    type: ChannelTypes;
    from(client: Client, data: object): AnyChannel;
}

export class Client extends EventEmitter {
    constructor(token: string, options: ClientOptions);

    channels: Collection<Channel>;
    connected: boolean;
    guilds: Collection<Guild>;
    isSharded: boolean;
    messages: Collection<Message>;
    options: ClientOptions;
    rest: RESTManager;
    shards: Collection<Websocket>;
    startupTimestamp: number;
    token: string;
    uptime: number;
    user: ClientUser;
    users: Collection<User>
    ws: Websocket;
    connect(): Promise<void>;
    createDM(userID: string): Promise<DMChannel>;
    createMessage(channelID: string, content: MessageOptions): Promise<Message>;
    deleteMessage(channelID: string, messageID: string, reason?: string): Promise<void>;
    editMessage(channelID: string, messageID: string, content: MessageOptions): Promise<Message>;
    
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
    constructor(client: Client, data: object);

    locale: string;
    mfaEnabled: boolean;
    verified: boolean;
    editStatus(status: Status, activity?: GameActivity): void;
}

export class Collection<T> extends Map<string | number, T> {
    constructor(...args: T[]);

    add(...objects: T[]): T;
    filter(predicate: (i: T) => boolean): T | Array<Base>;
    find(predicate: (i: T) => boolean): T | Base;
    map<R>(predicate: (i: T) => R): R[];

}

export class DMChannel extends Channel {
    constructor(client: Client, data: object);

    lastMessageID: string;
    createMessage(content: MessageOptions): Promise<Message>;
}

export class Guild extends Base {
    constructor(client: Client, data: object);

    channels: Collection<Channel>;
    client: Client;
    icon: string;
    memberCount: number;
    members: Collection<Member>;
    name: string;
    nsfwLevel: number;
    id: string;
    region: string;
}

export class GuildChannel extends Channel {
    constructor(client: Client, data: object);

    client: Client;
    guild: Guild;
    id: string;
    name: string;
    position: number;
}

export class Member extends User {
    constructor(client: Client, guild: Guild, data: object);

    deafened: boolean;
    guild: Guild;
    joinedAt: number;
    muted: boolean;
    nick: string;
    user: User;
    toUser(): User;
}

export class Message extends Base {
    constructor(client: Client, data: object);

    author: User;
    channelID: string;
    channel: TextChannel;
    content: string;
    embeds: EmbedOptions[];
    guild: Guild;
    guildID: string;
    id: string;
    member: Member;
    pinned: boolean;
    tts: boolean;
    type: number;
    delete(): Promise<void>;
    edit(content: MessageOptions): Promise<Message>;
}

export class User extends Base {
    constructor(client: Client, data: object);

    bot: boolean;
    client: Client;
    discriminator: string;
    id: string;
    system: boolean;
    tag: string;
    username: string;
}

export class RESTManager {
    constructor(client: Client);

    client: Client;
    globallyLimited: boolean;
    locallyLimited: boolean;
    ratelimited: boolean;
    ratelimit: Ratelimit;
    requesters: Map;
    running: boolean;
    retries: Map;
    token: string;
    userAgent: string;
    request(route: Route, payload?: unknown, contentType?: ContentType): Promise<unknown>;
    route(method: HTTPMethod, route: string);
}

export class Route {
    constructor(method: HTTPMethod, route: string);

    url: string;
}

export class TextChannel extends GuildChannel {
    constructor(client: Client, data: object);

    lastMessageID: string;
    name: string;
    nsfw: boolean;
    topic: string;
    createMessage(content: MessageOptions): Promise<Message>;
}

export class Websocket {
    constructor(client: Client, shardID: number);

    client: Client;
    id: number;
    lastPing: number;
    latencies: number[];
    latency: number;
    sequence: object;
    sessionID: number;
    shardID: number;
    socketURL: string;
    doHeartBeat(): Promise<void>;
    processWebsocketData(rawData: RawPacket): Promise<void>;
    send(...args: object[]): Promise<void>;
    setupWebsocket(): Promise<void>;
    start(): Promise<void>;

}

export const VERSION: string;