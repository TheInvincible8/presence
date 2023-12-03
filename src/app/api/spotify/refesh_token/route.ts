import { NextRequest, NextResponse } from "next/server";
import querystring from "node:querystring";

export async function GET(req: NextRequest, res: NextResponse) {
    var old_refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

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
                refresh_token: old_refresh_token,
            }),
        },
    );

    const { access_token, refresh_token } = await response.json();
    process.env.SPOTIFY_ACCESS_TOKEN = access_token;
    process.env.SPOTIFY_REFRESH_TOKEN = refresh_token;

    return NextResponse.json({
        access_token,
        refresh_token,
    });
}
