import { createClient } from "@/prismicio";
import Listing from "@/components/listing";

export default async function Home() {
    const { about, projects } = await getData();
    return <Listing about={about} projects={projects} />;
}

async function getData() {
    const client = createClient();

    const about = await client.getSingle("about");
    const projects = await client.getSingle("projects");
    return {
        about,
        projects,
    };
}
