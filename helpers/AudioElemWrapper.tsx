import React, { useEffect, useState } from "react";
import { FC } from "react";
import StreamPlayer from "../packages/streamplayer-client/src/StreamPlayer";

type AudioElemWrapperProps = Parameters<typeof StreamPlayer>[0];

const AudioElemWrapper: FC<AudioElemWrapperProps> = (props) => {
    const [audioElem, setAudioElem] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!audioElem) {
            return;
        }
        const onPlay = () => {
            console.log("playback has begun");
            setIsPlaying(true);
        };
        const onPause = () => {
            console.log("playback has paused");
            setIsPlaying(false);
        };
        audioElem.addEventListener("play", onPlay);
        audioElem.addEventListener("pause", onPause);
    }, [audioElem]);

    const handleClick = () => {
        if (!audioElem) {
            return;
        }
        isPlaying ? audioElem.pause() : audioElem.play();
    };

    return (
        <div>
            <StreamPlayer {...props} setAudioElem={setAudioElem} />

            <button style={{ marginTop: "1rem" }} onClick={handleClick}>
                External toggle: {isPlaying ? "playing" : "paused"}
            </button>
        </div>
    );
};

export default AudioElemWrapper;
