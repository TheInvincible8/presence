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
}
export default function Spotify({ music }: { music: Music }) {
    return (
        <div className="spotify relative sm:col-span-2  sm:row-span-2 rounded-2xl p-2.5 border-2">
            <FontAwesomeIcon icon={faSpotify} className="w-16 h-16" />
            <h4 className="text-sm font-semibold mt-3">LISTENING TO</h4>
            <p className="text-green-500 font-semibold text-left text-ellipsis text-4xl">
                {music.song_name}
            </p>
            <div className="artist flex items-center mt-3">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <p className="font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {music.artists.join(",")}
                </p>
            </div>
            <div className="album flex items-center">
                <FontAwesomeIcon icon={faCompactDisc} className="w-4 h-4" />
                <p className="font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden ml-2 block">
                    {music.album_name}
                </p>
            </div>
            <a
                href={music.song_link}
                className="w-10 h-10 absolute p-1 rounded-full border-2 flex justify-center items-center top-3 right-3"
            >
                <FontAwesomeIcon icon={faLink} className="w-10 h-10" />
            </a>
        </div>
    );
}
