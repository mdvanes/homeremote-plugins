import React, { useEffect, useRef, useState } from "react";
import "./StreamPlayer.css";
import Elm from "react-elm-components";
import Audio from "./Elm/Audio.elm";

// NOTE: findDomNode has been deprecated
const getAudioElem = (containerRef) =>
    containerRef.current.children[0].querySelector("audio");

const setupPorts = (containerRef, setPorts) => (ports) => {
    ports.setPlayPauseStatusPort.subscribe((newStatus) => {
        const audioElem = getAudioElem(containerRef);
        // console.log("newstatus", newStatus); // TODO remove
        // setAudioElem(audioElem);
        // Wait to let the audio elem be updated with a new cachebusting timestamp in Audio.elm `Cmd.batch [ Task.perform UpdateTimestamp Time.now, Cmd.map MsgControls controlsCmds ]`
        setTimeout(() => {
            if (newStatus === "Play") {
                audioElem.play();
            } else {
                audioElem.pause();
            }
        }, 50);
    });

    // setTimeout(() => {
    //     console.log("msg start");
    //     ports.messageReceiver.send("Play");
    // }, 3000);
    setPorts(ports);
};

const StreamPlayer = ({
    url,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // setAudioElem = (_) => {
    //     /* set default to make this prop optional in jsx */
    // },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPorts = (_) => {
        /* set default to make this prop optional in jsx */
    },
}) => {
    const containerRef = useRef(null);
    // const audioElem = getAudioElem(containerRef);
    // const [ports, setPorts] = useState();

    // useEffect(() => {
    //     setAudioElem(audioElem);
    // }, [audioElem, setAudioElem]);

    // useEffect(() => {
    //     if (foo > 2 && ports) {
    //         console.log("foo changed to ", foo);
    //         ports.receivePlayPauseStatusPort.send("Play");
    //     }
    // }, [foo, ports]);

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
