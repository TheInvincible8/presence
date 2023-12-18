import { createClient } from "../../prismicio";

export default async function Footer(): Promise<JSX.Element> {
    const client = createClient();
    const data = await client.getSingle("footer");

    return (
        <footer className="w-full text-center p-5 ">
            <p className="text-xl font-medium">{data.data.cc_text}</p>
        </footer>
    );
}
