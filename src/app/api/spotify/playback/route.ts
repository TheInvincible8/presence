import { NextRequest, NextResponse } from "next/server";
import { Episode, Playback, Track } from "@/types";
import Storage from "@/utils/storage";

function getCurrentlyPlaying(token: string) {
    return global.fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    );
}

let RecentPlayback: string | null;

export async function GET(req: NextRequest, res: NextResponse) {
    RecentPlayback = await Storage.getCurrentPlayback();
    let SpotifyAccessToken: string | null;
    const protocol = req.headers.get("X-Forwarded-Proto") || "http";
    const host =
        req.headers.get("X-Forwarded-Host") ||
        req.headers.get("host") ||
        req.nextUrl.origin ||
        "localhost";
    const origin = `${protocol}://${host}`;

    if (process.env.VERCEL) {
        SpotifyAccessToken = await Storage.getAccessToken();
    } else {
        SpotifyAccessToken = process.env.SPOTIFY_ACCESS_TOKEN || null;
    }

    if (!SpotifyAccessToken) {
        return NextResponse.json(
            {
                error: "token_unavailable",
                url: origin + "/api/spotify/login",
                message: "Cannot Access Spotify",
            },
            {
                status: 403,
            },
        );
    }

    let currentPlaying = await getCurrentlyPlaying(SpotifyAccessToken);

    // token expired
    if (currentPlaying.status === 401) {
        await global.fetch(origin + "/api/spotify/refresh_token");
        // retry one more time
        currentPlaying = await getCurrentlyPlaying(SpotifyAccessToken);
    }
    debugger;
    // user playing song
    if (currentPlaying.status === 200) {
        const media = await currentPlaying.json();

        RecentPlayback = media;
        await Storage.setCurrentPlayback(media);

        return Response.json(RecentPlayback, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // too many requests
    if (currentPlaying.status == 429) {
        return NextResponse.json(
            {
                error: "unavailable",
                message: "Spotify Unavailable",
            },
            {
                status: 429,
            },
        );
    }

    if (!RecentPlayback) {
        return Response.json(
            {
                error: "offline",
                message: "Spotify Unavailabe",
            },
            {
                status: 503,
            },
        );
    }
    // not playing any song
    return Response.json(RecentPlayback);
}

/**
 * not to cache this request (read more)[https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config]
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;
