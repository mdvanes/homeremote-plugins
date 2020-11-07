import React, { FC, ReactNode } from "react";
import StreamPlayer from "./StreamPlayer";
import packageJson from "../package.json";

export default {
    title: `Elm/StreamPlayer v${packageJson.version}`,
    component: StreamPlayer,
};

const Wrapper: FC<{ width?: number }> = ({ width = 600, children }) => {
    return (
        <div
            style={{
                minWidth: "375px",
                maxWidth: `${width}px`,
            }}
        >
            {children}
        </div>
    );
};

const url =
    process.env.STORYBOOK_MODE === "PROD"
        ? `https://${window.location.host}/${window.top.location.pathname}`
        : "http://localhost:3100";

export const Default = ({ width }: { width: number }): ReactNode => (
    <Wrapper width={width}>
        <StreamPlayer url={url} />
    </Wrapper>
);

// See https://github.com/storybookjs/storybook/blob/next/addons/controls/README.md#knobs-to-manually-configured-args
Default.args = { width: 600 };
Default.argTypes = {
    width: { control: { type: "range", min: 375, max: 775, step: "100" } },
};

export const WithSquarePicture = (): ReactNode => (
    <Wrapper>
        <StreamPlayer url={`${url}/mock/square`} />
    </Wrapper>
);

export const WithLandscapePicture = (): ReactNode => (
    <Wrapper>
        <StreamPlayer url={`${url}/mock/landscape`} />
    </Wrapper>
);
