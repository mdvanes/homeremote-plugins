import got from "got";
// Only for types!
import { get as IcyGet, parse as IcyParse } from "icy";

// Must use require or will break on build, because of ICY export method
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icy = require("icy");

export interface NowPlayingResponse {
    artist: string;
    title: string;
    last_updated: string;
    songImageUrl: string;
    name: string;
    imageUrl: string;
}

export enum ChannelName {
    RADIO2,
    RADIO3,
    SKY,
    PINGUIN,
}

interface TracksResponse {
    data: [
        {
            artist: string;
            title: string;
            image_url_400x400?: string;
            enddatetime: string;
        }
    ];
}

interface BroadcastResponse {
    data: [{ title: string; presenters?: string; image_url_400x400?: string }];
}

const getMetadata = (name: string, url: string) =>
    new Promise<NowPlayingResponse>((resolve) => {
        (icy.get as typeof IcyGet)(url, function (res) {
            const getStaticData = () => {
                const now = Date.now();
                const imageName = name.replace(/\s/g, "-").toLowerCase();
                return {
                    name,
                    imageUrl: `/metadata/${imageName}.jpg`,
                    songImageUrl: "",
                    last_updated: now.toString(),
                };
            };

            res.on("metadata", function (metadata) {
                const parsed = (icy.parse as typeof IcyParse)(metadata);
                const [artist, title] = parsed.StreamTitle.split(" - ");

                const staticData = getStaticData();

                resolve({
                    ...staticData,
                    title,
                    artist,
                });
            });

            // Return some values when no metadata within interval
            setTimeout(() => {
                const staticData = getStaticData();
                resolve({
                    ...staticData,
                    title: "[timeout]",
                    artist: "[timeout]",
                });
            }, 1000);
        });
    });

// Export for use by other apps
export const getNowPlaying = async (
    channelName: ChannelName
): Promise<NowPlayingResponse | undefined> => {
    if (channelName === ChannelName.RADIO2) {
        const nowonairResponse = await got(
            "https://www.nporadio2.nl/api/tracks"
        ).json<TracksResponse>();
        const {
            artist,
            title,
            image_url_400x400: songImg,
            enddatetime,
        } = nowonairResponse.data[0];
        const broadcastResponse = await got(
            "https://www.nporadio2.nl/api/broadcasts"
        ).json<BroadcastResponse>();
        const {
            title: name,
            presenters,
            image_url_400x400: presenterImg,
        } = broadcastResponse.data[0];
        const presentersSuffix = presenters ? ` / ${presenters}` : "";
        return {
            artist,
            title,
            last_updated: enddatetime,
            songImageUrl: songImg ?? "",
            name: `${name}${presentersSuffix}`,
            imageUrl: presenterImg ?? "",
        };
    }
    if (channelName === ChannelName.RADIO3) {
        const nowonairResponse = await got(
            "https://www.npo3fm.nl/api/tracks"
        ).json<TracksResponse>();
        const {
            artist,
            title,
            image_url_400x400: songImg,
            enddatetime,
        } = nowonairResponse.data[0];
        const broadcastResponse = await got(
            "https://www.npo3fm.nl/api/broadcasts"
        ).json<BroadcastResponse>();
        const {
            title: name,
            presenters,
            image_url_400x400: presenterImg,
        } = broadcastResponse.data[0];
        const presentersSuffix = presenters ? ` / ${presenters}` : "";
        return {
            artist,
            title,
            last_updated: enddatetime,
            songImageUrl: songImg ?? "",
            name: `${name}${presentersSuffix}`,
            imageUrl: presenterImg ?? "",
        };
    }
    if (channelName === ChannelName.SKY) {
        // console.log("icy", icy);
        // console.log("icy.get", icy.get);
        // return;
        return getMetadata(
            "Sky Radio",
            "https://19993.live.streamtheworld.com/SKYRADIO.mp3"
        );
    }
    if (channelName === ChannelName.PINGUIN) {
        // return;
        return getMetadata(
            "Pinguin Radio",
            "https://streams.pinguinradio.com/PinguinRadio320.mp3"
        );
    }
};
