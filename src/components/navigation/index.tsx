"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Button(
    props: React.PropsWithChildren & {
        href: string;
        buttonText: string;
        pathname: string;
    },
) {
    const active = props.pathname === "/" + props.href;
    return (
        <Link
            href={"/" + props.href}
            className={`navItem rounded-full p-2 mr-2 border-2 px-5 flex justify-center items-center capitalize ${
                active ? "bg-current" : ""
            }`}
        >
            <span className={`${active ? "invert" : ""}`}>
                {props.buttonText}
            </span>
        </Link>
    );
}
export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-row rounded-full xm:self-stretch xm:justify-center xm:mt-3 sm:text-xl lg:text-2xl">
            <Button href="" buttonText="all" pathname={pathname} />
            {["about", "projects"].map((uri, i) => (
                <Button
                    href={uri}
                    buttonText={uri}
                    key={uri}
                    pathname={pathname}
                />
            ))}
        </nav>
    );
}
