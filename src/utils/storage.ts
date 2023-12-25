import { kv } from "@vercel/kv";

export enum KEYS {
    SPOTIFY_ACCESS_TOKEN = "SPOTIFY_ACCESS_TOKEN",
    SPOTIFY_REFRESH_TOKEN = "SPOTIFY_REFRESH_TOKEN",
    RECENT_PLAYBACK = "RECENT_PLAYBACK",
}

class StorageService {
    spotify_access_token: string | null;
    spotify_refresh_token: string | null;
    recent_playback: null | string;

    constructor() {
        this.spotify_access_token = null;
        this.spotify_refresh_token = null;
        this.recent_playback = null;
    }

    async setAccessToken(token: string) {
        await kv.set(KEYS.SPOTIFY_ACCESS_TOKEN, token);
        this.spotify_access_token = token;
    }

    async getAccessToken(): Promise<string | null> {
        return await kv.get(KEYS.SPOTIFY_ACCESS_TOKEN);
    }

    async getRefreshToken(): Promise<string | null> {
        return await kv.get(KEYS.SPOTIFY_REFRESH_TOKEN);
    }

    async setRefreshToken(token: string) {
        await kv.set(KEYS.SPOTIFY_REFRESH_TOKEN, token);
        this.spotify_refresh_token = token;
    }

    async getCurrentPlayback(): Promise<string | null> {
        return await kv.get(KEYS.RECENT_PLAYBACK);
    }

    async setCurrentPlayback(playback: string) {
        await kv.set(KEYS.RECENT_PLAYBACK, playback);
        this.recent_playback = playback;
    }
}

const Storage = new StorageService();

export default Storage;
