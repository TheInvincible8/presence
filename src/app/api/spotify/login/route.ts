import { NextRequest, NextResponse } from "next/server";
import querystring from "node:querystring";

export async function GET(request: NextRequest, response: NextResponse) {
    const scope =
        "user-read-private user-read-email user-read-currently-playing";

    const protocol = request.headers.get("X-Forwarded-Proto") || "http";
    const host =
        request.headers.get("X-Forwarded-Host") ||
        request.headers.get("host") ||
        request.nextUrl.origin ||
        "localhost";
    const redirectUri = `${protocol}://${host}/api/spotify/callback`;

    return NextResponse.redirect(
        `https://accounts.spotify.com/authorize?` +
            querystring.stringify({
                response_type: "code",
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope,
                redirect_uri: redirectUri,
            }),
    );
}
