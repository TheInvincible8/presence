import { NextRequest, NextResponse } from "next/server";
import { Episode, Playback, Track } from "@/types";
//Keep recent playback in memory ( just in case );
let RecentPlayback: Playback<Track> | Playback<Episode>;

function getCurrentlyPlaying() {
    return global.fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: "Bearer " + process.env.SPOTIFY_ACCESS_TOKEN,
            },
        },
    );
}

export async function GET(req: NextRequest, res: NextResponse) {
    if (process.env.SPOTIFY_ACCESS_TOKEN == undefined) {
        return NextResponse.json(
            {
                error: "token_unavailable",
                url: req.nextUrl.origin + "/api/spotify/login",
                message: "Cannot Access Spotify",
            },
            {
                status: 403,
            },
        );
    }

    let currentPlaying = await getCurrentlyPlaying();

    // token expired
    if (currentPlaying.status === 401) {
        await global.fetch(req.nextUrl.origin + "/api/spotify/refresh_token");
        // retry one more time
        currentPlaying = await getCurrentlyPlaying();
    }
    debugger;
    // user playing song
    if (currentPlaying.status === 200) {
        const media = await currentPlaying.json();
        RecentPlayback = media;

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
