import { NextRequest, NextResponse } from "next/server";
import querystring from "node:querystring";
import Storage from "@/utils/storage";

export async function GET(req: NextRequest, res: NextResponse) {
    debugger;
    let refresh_token: string | null;
    if (process.env.VERCEL) {
        refresh_token = await Storage.getRefreshToken();
    } else {
        refresh_token = process.env.SPOTIFY_ACCESS_TOKEN || null;
    }

    if (!refresh_token)
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

    const response = await global.fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID +
                            ":" +
                            process.env.SPOTIFY_CLIENT_SECRET,
                    ).toString("base64"),
            },
            body: querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            }),
        },
    );
    // debugger;
    const { access_token } = await response.json();

    if (process.env.VERCEL) {
        await Storage.setAccessToken(access_token);
    } else {
        process.env.SPOTIFY_ACCESS_TOKEN = access_token;
    }

    return NextResponse.json({
        access_token,
    });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
