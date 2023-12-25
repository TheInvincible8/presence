import { NextRequest, NextResponse } from "next/server";
import querystring from "node:querystring";

export async function GET(request: NextRequest, response: NextResponse) {
    const scope =
        "user-read-private user-read-email user-read-currently-playing";
    const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`;
    console.log("redirect uri ", redirectUri);
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
