import Navigation from "../navigation";
import Link from "next/link";

export default async function Header(): Promise<JSX.Element> {
    return (
        <header className="header col-span-full flex flex-row grid-span-full justify-between items-end xm:flex-col xm:items-center">
            <Link
                href="/"
                className="basis-3/5 font-black xm:text-center xm:text-4xl lg:text-6xl"
            >
                Pankaj Dadwal
            </Link>
            <Navigation />
        </header>
    );
}
