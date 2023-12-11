import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

export default async function ProjectPage({
    params,
}: {
    params: { projectid: string };
}) {
    const client = createClient();

    debugger;
    const project = await client.getByUID("project", params.projectid);
    console.log(project);

    return (
        <div className="container grid grid-cols-8 min-h-screen gap-5 p-8">
            <SliceZone slices={project.data.slices} components={components} />
        </div>
    );
}

export const dynamic = "force-dynamic";
