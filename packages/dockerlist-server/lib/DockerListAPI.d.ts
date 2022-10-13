interface DockerContainerInfo {
    Id: string;
    Names: string[];
    State: string;
    Status: string;
}
export interface DockerListArgs {
    socketPath?: string;
}
export interface DockerListResponse {
    status: "received" | "error";
    containers?: DockerContainerInfo[];
}
export declare const getDockerList: (args?: DockerListArgs) => Promise<DockerListResponse>;
export declare const startContainer: (containerId: string) => Promise<DockerListResponse>;
export declare const stopContainer: (containerId: string) => Promise<DockerListResponse>;
export {};
