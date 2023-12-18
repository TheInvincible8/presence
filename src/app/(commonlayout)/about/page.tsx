import { createClient } from "@/prismicio";
import Card from "@/slices/Cards";

export default async function Home() {
    const { about } = await getData();
    return (
        <>
            {about.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
        </>
    );
}

async function getData() {
    const client = createClient();
    const about = await client.getSingle("about");

    return {
        about,
    };
}
