import { saveToFiles } from "@/utils/saveToFile";
import { NextResponse, NextRequest } from "next/server";
import querystring from "node:querystring";
import Storage from "@/utils/storage";

export async function GET(req: NextRequest, res: NextResponse) {
    // spotify.comt?code=''
    const params = req.nextUrl.searchParams;
    const code = params.get("code") || null;
    const protocol = req.headers.get("X-Forwarded-Proto") || "http";
    const host =
        req.headers.get("X-Forwarded-Host") ||
        req.headers.get("host") ||
        req.nextUrl.origin ||
        "localhost";
    if (code) {
        const data = querystring.stringify({
            code,
            redirect_uri: `${protocol}://${host}/api/spotify/callback`,
            grant_type: "authorization_code",
        });

        const response = await global.fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
                        ).toString("base64"),
                },
                body: data,
            },
        );

        const { access_token, refresh_token } = await response.json();

        if (process.env.VERCEL) {
            await Storage.setAccessToken(access_token);
            await Storage.setRefreshToken(refresh_token);
        } else {
            process.env.SPOTIFY_ACCESS_TOKEN = access_token;
            process.env.SPOTIFY_REFRESH_TOKEN = refresh_token;
        }

        await saveToFiles();
        return NextResponse.redirect(`${protocol}://${host}`);
    } else {
        return NextResponse.redirect(
            "/#" +
                querystring.stringify({
                    error: "spotify_api_failed",
                }),
        );
    }
}
