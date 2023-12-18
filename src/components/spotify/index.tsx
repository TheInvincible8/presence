"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCompactDisc,
    faUser,
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Button, ButtonPos } from "../button";
import { CardSliceSpotify } from "../../../prismicio-types";

interface Music {
    song_name: string;
    album_name: string;
    artists: string[];
    song_link: string;
    playing?: boolean;
}

interface MusicError {
    error: string;
    message: string;
}

export default function Spotify({ slice }: { slice?: CardSliceSpotify }) {
    const [playback, setPlayback] = useState<Music | MusicError | null>(null);

    useEffect(() => {
        let timer: number;
        const cb = () => {
            fetch(window.location.origin + "/api/spotify/playback")
                .then((res) => res.json())
                .then((song) => {
                    if (!("error" in song)) {
                        const newPlayback = {
                            album_name: song.item.album.name,
                            artists: song.item.artists.map(
                                (artist: { name: string }) => artist.name,
                            ),
                            song_name: song.item.name,
                            song_link: song.item.external_urls.spotify,
                        };
                        setPlayback(newPlayback);
                    } else {
                        setPlayback(song);
                    }
                    timer = window.setTimeout(cb, 30 * 1000);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        timer = window.setTimeout(cb, 0);

        return () => clearTimeout(timer);
    }, []);
    if (!playback) {
        return (
            <div className="card spotify relative sm:col-span-2  sm:row-span-2 rounded-2xl p-2.5 border-2 flex flex-col">
                <div className="w-16 h-16 rounded-full loading-animation"></div>
                <div className="h-4 w-52 loading-animation rounded-md mt-3"></div>
                <div className="loading-animation w-full flex-1 rounded-lg mt-3"></div>
                <div className="artist flex items-center mt-3">
                    <div className="w-8 h-8 rounded-full loading-animation mr-3"></div>
                    <div className="loading-animation flex-grow h-8 rounded-lg"></div>
                </div>
                <div className="album flex items-center mt-3 justify-between">
                    <div className="w-8 h-8 rounded-full loading-animation mr-3"></div>

                    <div className="loading-animation flex-grow h-8 rounded-lg"></div>
                </div>
                <Button href={"#"} pos={ButtonPos["top-right"]} loading>
                    <div></div>
                </Button>
            </div>
        );
    }
    if ("error" in playback) {
        return (
            <div className="card spotify relative sm:col-span-2  sm:row-span-2 rounded-2xl p-2.5 border-2">
                <FontAwesomeIcon icon={faSpotify} className="w-16 h-16" />
                <h4 className="text-sm font-semibold mt-3">Error</h4>
                <p className="text-green-500 font-semibold text-left text-ellipsis text-4xl">
                    {playback.message}
                </p>
            </div>
        );
    }
    return (
        <div className="card spotify relative sm:col-span-2  sm:row-span-2 rounded-2xl p-2.5 border-2">
            <FontAwesomeIcon icon={faSpotify} className="w-16 h-16" />
            <h4 className="text-sm font-semibold mt-3">LISTENING TO</h4>
            <p className="text-green-500 font-semibold text-left text-ellipsis xm:text-4xl sm:text-3xl md:text-4xl lg:text-5xl">
                {playback.song_name.length > 40
                    ? playback.song_name.slice(0, 40) + "..."
                    : playback.song_name}
            </p>
            <div className="artist flex items-center mt-3">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <p className="font-medium xm:text-lg text-xl text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {playback.artists.join(", ")}
                </p>
            </div>
            <div className="album flex items-center">
                <FontAwesomeIcon icon={faCompactDisc} className="w-4 h-4" />
                <p className="font-medium xm:text-lg text-xl text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {playback.album_name}
                </p>
            </div>
            <Button href={playback.song_link} pos={ButtonPos["top-right"]}>
                <FontAwesomeIcon icon={faLink} className="h-full invert" />
            </Button>
        </div>
    );
}
