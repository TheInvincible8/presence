import Image from "next/image";
import { headers } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient } from "@/prismicio";
import Card from "@/slices/Cards";
import Spotify from "@/components/spotify";
import Footer from "@/components/footer";
import Header from "@/components/header";
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

export const dynamic = "force-dynamic";
