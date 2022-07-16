export interface NowPlayingResponse {
    artist: string;
    title: string;
    last_updated: string;
    songImageUrl: string;
    name: string;
    imageUrl: string;
}
export declare enum ChannelName {
    RADIO2 = 0,
    RADIO3 = 1,
    SKY = 2,
    PINGUIN = 3
}
export declare const getNowPlaying: (channelName: ChannelName) => Promise<NowPlayingResponse | undefined>;
