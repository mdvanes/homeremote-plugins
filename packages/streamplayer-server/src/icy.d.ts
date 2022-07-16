interface Response {
    headers: any;
    on: (eventType: string, then: (metadata: string) => void) => void;
}

interface Parsed {
    StreamTitle: string;
}

declare module "icy" {
    const get = (
        url: string,
        callback: (response: Response) => void
    ): string => {
        /* */
    };
    const parse = (input: string): Parsed => {
        /* */
    };
}
