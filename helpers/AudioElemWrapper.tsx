import React, { useEffect, useState } from "react";
import { FC } from "react";
import {
    HomeremoteStreamPlayerProps,
    Ports,
} from "../packages/streamplayer-client/lib/StreamPlayer";
import StreamPlayer from "../packages/streamplayer-client/src/StreamPlayer";

type AudioElemWrapperProps = Omit<HomeremoteStreamPlayerProps, "setPorts">;

const AudioElemWrapper: FC<AudioElemWrapperProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ports, setPorts] = useState<Ports | null>(null);

    useEffect(() => {
        const subscribe = ports?.setPlayPauseStatusPort?.subscribe;
        if (subscribe) {
            subscribe((newStatus) => {
                setIsPlaying(newStatus === "Play" ? true : false);
            });
        }
    }, [ports]);

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
