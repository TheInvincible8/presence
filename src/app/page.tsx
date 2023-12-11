import Image from "next/image";
import { headers } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient } from "@/prismicio";
import Card from "@/slices/Cards";
import Spotify from "@/components/spotify";

function Button(props: React.PropsWithChildren & { buttonText: string }) {
    return (
        <button
            className={
                "navItem rounded-full h-10 p-2 mr-2" +
                (props.buttonText.length <= 3 ? " w-10" : "")
            }
        >
            {props.buttonText}
        </button>
    );
}

export default async function Home() {
    const { about, music, projects } = await getData();
    return (
        <main className="sm:grid container gap-5 grid-flow-row min-h-screen container_grid justify-center xm:[&>*]:mb-5 xm:[& :last-child]mb-0">
            <header className="col-span-full flex flex-row grid-span-full justify-between items-end xm:flex-col xm:items-center">
                <h1 className="text-5xl basis-3/5 font-black">Sushil Kumar</h1>
                <nav className="flex flex-row self-center rounded-full px-2.5 py-2.5 border-2 xm:self-stretch xm:justify-center xm:mt-3">
                    {["All", "About", "Projects"].map((uri) => (
                        <Button buttonText={uri} key={uri} />
                    ))}
                </nav>
            </header>
            {/* <video
                    className="sm:col-span-4 md:col-span-4 sm:row-span-2 rounded-2xl"
                    src="https://drive.google.com/uc?export=download&id=1-4qfJ299VNra8CNIxqdFqHM2OzwVedJt"
                    autoPlay
                ></video> */}
            {about.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
            {projects.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
            {music && <Spotify music={music} />}
        </main>
    );
}

async function getData() {
    const client = createClient();

    const about = await client.getSingle("about");
    const projects = await client.getSingle("projects");
    console.log(projects);
    const origin = headers().get("referer");
    const response = await fetch("http://localhost:3000/api/spotify/playback");
    if (response.status == 403) {
        return {
            about,
            music: null,
            projects,
        };
    }
    if (response.status !== 200) {
        const error = await response.json();
        return {
            about,
            music: error,
            projects,
        };
    }

    const music = await response.json();
    return {
        about,
        projects,
        music: {
            album_name: music.item.album.name,
            artists: music.item.artists.map(
                (artist: { name: string }) => artist.name,
            ),
            song_name: music.item.name,
            song_link: music.item.external_urls.spotify,
        },
    };
}

export const dynamic = "force-dynamic";
