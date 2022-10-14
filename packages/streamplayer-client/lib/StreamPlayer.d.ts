import { FC, ReactElement } from "react";

export type PlayingStatus = "Play" | "Pause";

export type HandleSubscribe = (status: PlayingStatus) => void;

export interface Ports {
    setPlayPauseStatusPort?: {
        subscribe: (handleSubscribe: HandleSubscribe) => void;
    };
    receivePlayPauseStatusPort?: {
        send: (status: PlayingStatus) => void;
    };
}

export interface HomeremoteStreamPlayerProps {
    url: string;
    setPorts?: (ports: Ports) => void;
}

declare const HomeremoteStreamPlayer: FC<HomeremoteStreamPlayerProps>;
export default HomeremoteStreamPlayer;
