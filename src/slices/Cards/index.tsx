import { Content, FilledLinkToWebField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    CardSliceDefault,
    CardSliceLinkCard,
    CardSliceLinkCardPrimary,
} from "../../../prismicio-types";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
/**
 * Props for `Card`.
 */
export type CardProps = Content.CardSlice;

/**
 * Component for "Card" Slices.
 */

const DefaultCard = ({ slice }: { slice: CardSliceDefault }): JSX.Element => {
    /* eslint-disable */
    return (
        <div
            aria-label="introduction"
            className="sm:col-span-4 md:col-span-4 sm:row-span-2 rounded-2xl p-5 border-2 relative"
        >
            <div className="img_wrapper w-40 h-40">
                <img
                    src={slice.primary.background_image.url || ""}
                    alt="image"
                />
            </div>
            <h3 className="text-3xl mb-2.5 font-semibold">
                {slice.primary.title}
            </h3>
            <p className="text-lg">{slice.primary.subtitle}</p>
            <button className="absolute top-3 right-3 w-10 h-10 flex justify-center items-center p-3 rounded-full border-2">
                <FontAwesomeIcon icon={faPlay} />
            </button>
        </div>
    );
};

const CardWithLink = ({ slice }: { slice: CardSliceLinkCard }): JSX.Element => {
    return (
        <div className="sm:col-span-2  sm:row-span-2 rounded-2xl border-2 relative">
            <div className="h-full w-full flex justify-center items-center p-20">
                <img
                    src={slice.primary.background_image.url || ""}
                    alt={slice.primary.background_image.alt || "image"}
                />
            </div>
            <a
                href={
                    slice.primary.action_link &&
                    "url" in slice.primary.action_link
                        ? slice.primary.action_link.url
                        : "#"
                }
                className="w-10 h-10 absolute p-3 rounded-full border-2 flex justify-center items-center bottom-3 right-3"
            >
                <FontAwesomeIcon icon={faPlus} />
            </a>
        </div>
    );
};

const Card = ({ slice }: { slice: CardProps }): JSX.Element => {
    if (slice.variation == "linkCard") {
        return <CardWithLink slice={slice} />;
    }

    if (slice.variation == "slide") {
        return <h1>slide</h1>;
    }

    if (slice.variation == "cardWithVideo") {
        return <h1>card with video</h1>;
    }

    return <DefaultCard slice={slice} />;
};

export default Card;
