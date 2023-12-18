import { createClient } from "@/prismicio";
import Card from "@/slices/Cards";

export default async function Home() {
    const { projects } = await getData();
    return (
        <>
            {projects.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
        </>
    );
}

async function getData() {
    const client = createClient();

    const projects = await client.getSingle("projects");

    return {
        projects,
    };
}
