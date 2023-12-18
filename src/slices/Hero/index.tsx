import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
    HeroSliceDefault,
    HeroSliceHeroWithHeader,
} from "../../../prismicio-types";
import Link from "next/link";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */

const HeroFullBackground = ({
    slice,
}: {
    slice: HeroSliceDefault;
}): JSX.Element => {
    return (
        /* eslint-disable */
        <section
            data-slice-variation={slice.variation}
            className="col-span-full h-1/3 overflow-hidden"
        >
            <img
                className="w-full h-full object-cover blur-sm"
                src={slice.primary.hero_image.url || ""}
                alt={slice.primary.hero_image.alt || "large image"}
            />
        </section>
    );
};

const HeroWithHeader = ({
    slice,
}: {
    slice: HeroSliceHeroWithHeader;
}): JSX.Element => {
    return (
        <section
            data-slice-variation={slice.variation}
            className="col-span-full relative text-center flex items-center justify-center rounded-3xl h-96"
            style={{
                backgroundImage:
                    `url(${slice.primary.hero_image.url})` || "none",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="section_main invert flex flex-col items-center dark:invert-0">
                <h1 className="text-7xl font-bold">
                    {slice.primary.hero_header}
                </h1>
                <p className="text-3xl font-medium mt-2">
                    {slice.primary.hero_subheader}
                </p>
                <Link
                    className="text-lg mt-2 px-2 border rounded-full border-black "
                    //@ts-ignore
                    href={slice.primary.hero_link?.url || "#"}
                >
                    View Live
                </Link>
            </div>
        </section>
    );
};

const Hero = ({ slice }: HeroProps): JSX.Element => {
    if (slice.variation == "heroWithHeader") {
        return <HeroWithHeader slice={slice} />;
    }

    // return default slice
    return <HeroFullBackground slice={slice} />;
};

export default Hero;
