import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { createClient } from "@/prismicio";
import Card from "@/slices/Cards";

function Button(props: React.PropsWithChildren & { buttonText: string }) {
    return (
        <button
            className={
                "navItem bg-gray-500 rounded-full h-10 p-2 mr-2" +
                (props.buttonText.length <= 3 ? " w-10" : "")
            }
        >
            {props.buttonText}
        </button>
    );
}

export default async function Home() {
    const page = await getData();
    // console.log(page.data.slices);
    return (
        <main className="grid container gap-5 grid-flow-row min-h-screen container_grid">
            <header className="col-span-full flex flex-row grid-span-full justify-between items-end">
                <h1 className="text-5xl basis-3/5 font-black">
                    सुशील कुमार Sushil Kumar
                </h1>
                <nav className="flex flex-row self-center bg-gray-400 rounded-full px-2.5 py-2.5">
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
            {page.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}

            {/* <Card slice={page.data.slices[0]}/> */}
            {/** Card 2 */}

            {/** Card 3 */}
            <div className="bg-blue-300 sm:col-span-2  sm:row-span-2 rounded-2xl"></div>
            {/** Card 4 */}
            <div className="bg-blue-300 sm:col-span-2  sm:row-span-2 rounded-2xl"></div>
        </main>
    );
}

async function getData() {
    const client = createClient();

    const page = await client.getSingle("about");

    return page;
}
