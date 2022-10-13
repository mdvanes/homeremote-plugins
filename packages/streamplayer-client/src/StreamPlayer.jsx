import React, { useRef } from "react";
import "./StreamPlayer.css";
import Elm from "react-elm-components";
import Audio from "./Elm/Audio.elm";

// NOTE: findDomNode has been deprecated
const getAudioElem = (containerRef) =>
    containerRef.current.children[0].querySelector("audio");

const setupPorts = (containerRef, setPorts) => (ports) => {
    ports.setPlayPauseStatusPort.subscribe((newStatus) => {
        const audioElem = getAudioElem(containerRef);
        // Wait to let the audio elem be updated with a new cachebusting timestamp in Audio.elm `Cmd.batch [ Task.perform UpdateTimestamp Time.now, Cmd.map MsgControls controlsCmds ]`
        setTimeout(() => {
            if (newStatus === "Play") {
                audioElem.play();
            } else {
                audioElem.pause();
            }
        }, 50);
    });

    setPorts(ports);
};

const StreamPlayer = ({
    url,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPorts = (_) => {
        /* set default to make this prop optional in jsx */
    },
}) => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef}>
            <Elm
                src={Audio.Elm.Elm.Audio}
                flags={{ url }}
                ports={setupPorts(containerRef, setPorts)}
            />
        </div>
    );
};

export default StreamPlayer;
