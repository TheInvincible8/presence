import Link from "next/link";

export enum ButtonPos {
    "top-left" = "top-3 left-3",
    "top-right" = "top-3 right-3",
    "bot-left" = "bottom-3 left-3",
    "bot-right" = "bottom-3 right-3",
}

export const Button = ({
    children,
    href,
    pos,
    loading = false,
}: {
    children: React.ReactNode;
    href: string | undefined;
    pos: ButtonPos;
    loading?: boolean;
}): JSX.Element => {
    return (
        <Link
            href={href || "#"}
            className={`card__action-button xm:w-10 xm:h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 p-3 rounded-full flex justify-center items-center ${pos} bg-current ${
                loading ? "loading-animation" : ""
            }`}
            scroll={false}
        >
            {children}
        </Link>
    );
};
