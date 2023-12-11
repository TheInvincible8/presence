"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCompactDisc,
    faUser,
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

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

export default function Spotify({ music }: { music: Music | MusicError }) {
    const [playback, setPlayback] = useState(music);

    useEffect(() => {
        let timer: number;
        const cb = () => {
            fetch(window.location.origin + "/api/spotify/playback")
                .then((res) => res.json())
                .then((song) => {
                    const newPlayback = {
                        album_name: song.item.album.name,
                        artists: song.item.artists.map(
                            (artist: { name: string }) => artist.name,
                        ),
                        song_name: song.item.name,
                        song_link: song.item.external_urls.spotify,
                    };
                    setPlayback(newPlayback);
                    console.log("getting recent playback", typeof timer, timer);
                    timer = window.setTimeout(cb, 30 * 1000);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        timer = window.setTimeout(cb, 30 * 1000);

        return () => clearTimeout(timer);
    }, []);
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
            <p className="text-green-500 font-semibold text-left text-ellipsis text-4xl">
                {playback.song_name.length > 38
                    ? playback.song_name.slice(0, 40) + "..."
                    : playback.song_name}
            </p>
            <div className="artist flex items-center mt-3">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <p className="font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {playback.artists.join(",")}
                </p>
            </div>
            <div className="album flex items-center">
                <FontAwesomeIcon icon={faCompactDisc} className="w-4 h-4" />
                <p className="font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {playback.album_name}
                </p>
            </div>
            <a
                href={playback.song_link}
                className="w-10 h-10 absolute p-1 rounded-full border-2 flex justify-center items-center top-3 right-3"
            >
                <FontAwesomeIcon icon={faLink} className="w-10 h-10" />
            </a>
        </div>
    );
}
