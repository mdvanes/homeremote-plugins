import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Ports } from "../packages/streamplayer-client/lib/StreamPlayer";
import StreamPlayer from "../packages/streamplayer-client/src/StreamPlayer";

type AudioElemWrapperProps = Parameters<typeof StreamPlayer>[0];

// type HandleSubscribe = (status: "Play" | "Pause") => void;

// interface Ports {
//     setPlayPauseStatusPort?: {
//         subscribe: (handleSubscribe: HandleSubscribe) => void;
//     };
//     receivePlayPauseStatusPort?: {
//         send: (status: "Play" | "Pause") => void;
//     };
// }

const AudioElemWrapper: FC<AudioElemWrapperProps> = (props) => {
    // const [audioElem, setAudioElem] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [ports, setPorts] = useState<Ports | null>(null);

    // const foo = useMemo(() => {

    //     return ports;
    // }, [ports]);
    useEffect(() => {
        const subscribe = ports?.setPlayPauseStatusPort?.subscribe;
        if (subscribe) {
            subscribe((newStatus) => {
                setIsPlaying(newStatus === "Play" ? true : false);
            });
        }
    }, [ports]);

    // useEffect(
    //     () => {
    //         if (!audioElem) {
    //             return;
    //         }
    //         const onPlay = () => {
    //             console.log("playback has begun");
    //             setIsPlaying(true);
    //         };
    //         const onPause = () => {
    //             console.log("playback has paused");
    //             setIsPlaying(false);
    //         };
    //         audioElem.addEventListener("play", onPlay);
    //         audioElem.addEventListener("pause", onPause);

    //         return () => {
    //             setIsPlaying(false);
    //             audioElem.removeEventListener("play", onPlay);
    //             audioElem.removeEventListener("pause", onPause);
    //         };
    //     },
    //     [audioElem]
    //     /* when audioElem is listed here, the eventListeners are lost */
    // );

    // const handleClick = () => {
    //     // if (!audioElem) {
    //     //     return;
    //     // }
    //     // isPlaying ? audioElem.pause() : audioElem.play();
    // };

    return (
        <div>
            <StreamPlayer {...props} setPorts={setPorts} />

            <button
                style={{ marginTop: "1rem" }}
                onClick={() => {
                    console.log(ports, ports?.receivePlayPauseStatusPort);
                    if (ports?.receivePlayPauseStatusPort?.send) {
                        ports.receivePlayPauseStatusPort.send(
                            isPlaying ? "Pause" : "Play"
                        );
                    }
                }}
            >
                External toggle: {isPlaying ? "playing" : "paused"}
            </button>
        </div>
    );
};

export default AudioElemWrapper;
