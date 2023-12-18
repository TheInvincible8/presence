"use client";
import Card from "@/slices/Cards";
import Spotify from "../spotify";
import { AboutDocument, ProjectsDocument } from "../../../prismicio-types";
export default function Listing({
    about,
    projects,
}: {
    about: AboutDocument<string>;
    projects: ProjectsDocument<string>;
}) {
    return (
        <>
            {about.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
            {projects.data.slices.map((slice) => (
                <Card slice={slice} key={slice.id} />
            ))}
        </>
    );
}
