"use client";
import {
    Content,
    FilledLinkToWebField,
    LinkField,
    LinkType,
} from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    CardSliceDefault,
    CardSliceFullBackgroundCard,
    CardSliceLinkCard,
    CardSliceLinkCardPrimary,
    CardSliceTitleCard,
} from "../../../prismicio-types";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
/**
 * Props for `Card`.
 */
export type CardProps = Content.CardSlice;

/**
 * Component for "Card" Slices.
 */

enum ButtonPos {
    "top-left" = "top-3 left-3",
    "top-right" = "top-3 right-3",
    "bot-left" = "bottom-3 left-3",
    "bot-right" = "bottom-3 right-3",
}
const DefaultCard = ({ slice }: { slice: CardSliceDefault }): JSX.Element => {
    /* eslint-disable */
    return (
        <div
            aria-label="introduction"
            className="card sm:col-span-4 md:col-span-4 sm:row-span-2 rounded-2xl p-5 border-2 relative"
        >
            <div className="img_wrapper w-40 h-40">
                <img
                    className="hidden dark:block"
                    src={slice.primary.image_dark.url || ""}
                    alt="image"
                />
                <img
                    className="dark:hidden"
                    src={slice.primary.image_light.url || ""}
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
        <div className="card sm:col-span-2  sm:row-span-2 rounded-2xl border-2 relative">
            <div className="h-full w-full flex justify-center items-center p-20">
                <img
                    className="hidden dark:block"
                    src={slice.primary.bg_image_dark.url || ""}
                    alt={slice.primary.bg_image_dark.alt || "image"}
                />
                <img
                    className="dark:hidden"
                    src={slice.primary.bg_image_light.url || ""}
                    alt={slice.primary.bg_image_light.alt || "image"}
                />
            </div>
            <a
                href={
                    slice.primary.action_link &&
                    "url" in slice.primary.action_link
                        ? slice.primary.action_link.url
                        : "#"
                }
                className={`card__action-button w-10 h-10 absolute p-3 rounded-full border-2 flex justify-center items-center ${
                    ButtonPos[slice.primary.button_pos]
                }`}
            >
                <FontAwesomeIcon icon={faPlus} />
            </a>
        </div>
    );
};

const TitleCard = ({ slice }: { slice: CardSliceTitleCard }): JSX.Element => {
    return (
        <div
            className="card sm:col-span-2  sm:row-span-2 rounded-2xl border-2 relative"
            title={slice.primary.title || "Clickable Card"}
        >
            <h3 className="text-center text-3xl font-bold mt-16">
                {slice.primary.title}
            </h3>
            <div className="absolute left-2/4 bottom-0 -translate-x-2/4">
                <img // show in dark mode
                    className="hidden dark:block w-48 h-48"
                    src={slice.primary.bg_image_dark.url || ""}
                    alt={slice.primary.bg_image_dark.alt || "image"}
                />
                <img // show in light mode
                    className="dark:hidden w-48 h-48"
                    src={slice.primary.bg_image_light.url || ""}
                    alt={slice.primary.bg_image_light.alt || "image"}
                />
            </div>
            <a
                href={
                    slice.primary.action_link &&
                    "url" in slice.primary.action_link
                        ? slice.primary.action_link.url
                        : "#"
                }
                className="card__action-button w-10 h-10 absolute p-3 rounded-full border-2 flex justify-center items-center bottom-3 right-3"
            >
                <FontAwesomeIcon icon={faPlus} />
            </a>
        </div>
    );
};

function FullBGCard({
    slice,
}: {
    slice: CardSliceFullBackgroundCard;
}): JSX.Element {
    return (
        <div className="card sm:col-span-2  sm:row-span-2 rounded-2xl border-2 relative overflow-hidden">
            <div className="h-full w-full">
                <img
                    className="hidden dark:block"
                    src={slice.primary.bg_image_dark.url || ""}
                    alt={slice.primary.bg_image_dark.alt || "image"}
                />
                <img
                    className="dark:hidden"
                    src={slice.primary.bg_image_light.url || ""}
                    alt={slice.primary.bg_image_light.alt || "image"}
                />
            </div>
            {slice.primary.action_link.link_type == LinkType["Document"] ? (
                <Link
                    href={
                        "/" +
                        slice.primary.action_link?.type +
                        "/" +
                        slice.primary.action_link?.uid
                    }
                    className={`card__action-button w-10 h-10 absolute p-3 rounded-full border-2 flex justify-center items-center ${
                        ButtonPos[slice.primary.button_pos]
                    }`}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            ) : (
                <a
                    href={
                        slice.primary.action_link &&
                        "url" in slice.primary.action_link
                            ? slice.primary.action_link.url
                            : "#"
                    }
                    className={`card__action-button w-10 h-10 absolute p-3 rounded-full border-2 flex justify-center items-center ${
                        ButtonPos[slice.primary.button_pos]
                    }`}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </a>
            )}
        </div>
    );
}
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

    if (slice.variation == "titleCard") {
        return <TitleCard slice={slice} />;
    }

    if (slice.variation == "fullBackgroundCard") {
        return <FullBGCard slice={slice} />;
    }

    return <DefaultCard slice={slice} />;
};

export default Card;
