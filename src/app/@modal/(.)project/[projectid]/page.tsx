import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Modal from "@/components/modal";

export default async function ProjectModal({
    params,
}: {
    params: { projectid: string };
}) {
    const client = createClient();

    console.log(params);
    // debugger;
    const project = await client.getByUID("project", params.projectid);

    return (
        <Modal>
            <div className="model_container grid grid-cols-8 min-h-screen gap-5 rounded-3xl p-6">
                <SliceZone
                    slices={project.data.slices}
                    components={components}
                />
            </div>
        </Modal>
    );
}
