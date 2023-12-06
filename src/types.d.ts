export interface Playback<T extends Track | Episode> {
    timestamp: number;
    is_playing: boolean;
    item: T;
    type: T extends Track ? "track" : "episode";
}

export type Track = {
    album: {
        name: string;
        external_urls: {
            spotify: string;
        };
    };
    artists: {
        name: string;
    }[];
    name: string;
    popularity: number;
    preview_url: string | null;
    external_urls: {
        spotify: string;
    };
};

export type Episode = {
    audio_preview_url: string | null;
    name: string;
    external_urls: {
        spotify: string;
    };
    show: {
        name: string;
        external_urls: {
            spotify: string;
        };
    };
};
