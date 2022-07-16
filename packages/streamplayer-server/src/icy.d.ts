interface Response {
    headers: any;
    on: (eventType: string, then: (metadata: string) => void) => void;
}

interface Parsed {
    StreamTitle: string;
}

declare module "icy" {
    export const get = (
        url: string,
        callback: (response: Response) => void
    ): string => {
        /* */
    };
    export const parse = (input: string): Parsed => {
        /* */
    };

    const fakeDefault = {};

    export default fakeDefault;
}
