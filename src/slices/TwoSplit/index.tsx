import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { TwoSplitSlice, TwoSplitSliceDefault } from "../../../prismicio-types";

/**
 * Props for `TwoSplit`.
 */
export type TwoSplitProps = SliceComponentProps<Content.TwoSplitSlice>;

/**
 * Component for "TwoSplit" Slices.
 */

const TwoImage = ({ slice }: { slice: TwoSplitSlice }): JSX.Element => {
    return (
        <>
            <>
                <div className="flex flex-row w-full h-full gap-5">
                    <div className="p-2 basis-1/2 relative">
                        <img
                            className="block w-full h-full z-10 relative"
                            src={slice.primary.primary_image.url || ""}
                            alt={slice.primary.primary_image.alt || ""}
                        />
                        <img
                            className="block w-full h-full absolute bottom-0 -rotate-12 scale-90 -translate-x-20 z-0"
                            src={slice.primary.primary_image.url || ""}
                            alt={slice.primary.primary_image.alt || ""}
                        />
                    </div>
                    <div className="right basis-1/2 flex flex-col justify-center">
                        <h2 className="text-5xl font-semibold">
                            {slice.primary.heading}
                        </h2>
                        <p className="text-xl font-light mt-2">
                            {slice.primary.paragraph}
                        </p>
                    </div>
                </div>
            </>
        </>
    );
};
const Default = ({ slice }: { slice: TwoSplitSliceDefault }): JSX.Element => {
    return (
        <>
            <div className="flex flex-row w-full h-full gap-5">
                <div className="p-2 basis-1/2">
                    <img
                        className="block w-full h-full"
                        src={slice.primary.primary_image.url || ""}
                        alt={slice.primary.primary_image.alt || ""}
                    />
                </div>
                <div className="right basis-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-semibold">
                        {slice.primary.heading}
                    </h2>
                    <p className="text-xl font-light mt-2">
                        {slice.primary.paragraph}
                    </p>
                </div>
            </div>
        </>
    );
};
const TwoSplit = ({ slice }: TwoSplitProps): JSX.Element => {
    let child = null;

    if (slice.variation == "twoImage") {
        child = <TwoImage slice={slice} />;
    }

    if (slice.variation == "default") child = <Default slice={slice} />;

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="col-span-full rounded-3xl h-96 border-2"
        >
            {child}
        </section>
    );
};

export default TwoSplit;
