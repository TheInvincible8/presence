import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("global access token ==> ", process.env.SPOTIFY_ACCESS_TOKEN);
    if (process.env.SPOTIFY_ACCESS_TOKEN == undefined)
        return Response.redirect(req.nextUrl.origin + "/api/spotify/login");
    const currentPlaying = await global.fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: "Bearer " + process.env.SPOTIFY_ACCESS_TOKEN,
            },
        },
    );

    // user playing song
    if (currentPlaying.status === 200) {
        const playback = await currentPlaying.json();
        return Response.json(playback, {
            headers: {
                "Content-Type": "application/json",
                "X-sushil-header": "Hello from server",
            },
        });
    }

    // not playing any song
    return Response.json({
        error: "offline",
    });
}

// idk what the hell it do :)
export const revalidate = true;
/**
 * not to cache this request (read more)[https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config]
 */
export const dynamic = "force-dynamic";
