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
import {
    faCirclePlay,
    faPlay,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonPos } from "@/components/button";
import Spotify from "@/components/spotify";
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
            className="card sm:col-span-4 md:col-span-4 sm:row-span-2 rounded-2xl p-5 border-2 relative"
        >
            <div className="img_wrapper xm:w-32 xm:h-32 w-40 h-40 mb-2.5">
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
            <h3 className="text-3xl lg:text-4xl mb-2.5 font-semibold">
                {slice.primary.title}
            </h3>
            <p className="sm:text-lg lg:text-2xl md:pr-20">
                {slice.primary.subtitle}
            </p>
            <Button pos={ButtonPos["top-right"]} href="#" loading={false}>
                <FontAwesomeIcon
                    icon={faPlay}
                    className="translate-x-[10%] h-full invert"
                />
            </Button>
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
            <Button
                pos={ButtonPos["top-right"]}
                href={
                    slice.primary.action_link &&
                    "url" in slice.primary.action_link
                        ? slice.primary.action_link.url
                        : "#"
                }
            >
                <FontAwesomeIcon icon={faPlus} className="h-full invert" />
            </Button>
        </div>
    );
};

const TitleCard = ({ slice }: { slice: CardSliceTitleCard }): JSX.Element => {
    return (
        <div
            className="card sm:col-span-2  sm:row-span-2 rounded-2xl border-2 relative"
            title={slice.primary.title || "Clickable Card"}
        >
            <h3 className="text-center text-3xl lg:text-4xl font-bold mt-20 px-3 break-words">
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
            <Button
                pos={ButtonPos["top-right"]}
                href={
                    slice.primary.action_link &&
                    "url" in slice.primary.action_link
                        ? slice.primary.action_link.url
                        : "#"
                }
            >
                <FontAwesomeIcon icon={faPlus} className="h-full invert" />
            </Button>
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
                <Button
                    pos={ButtonPos[slice.primary.button_pos]}
                    href={
                        "/" +
                        //@ts-ignore
                        slice.primary.action_link?.type +
                        "/" +
                        //@ts-ignore
                        slice.primary.action_link?.uid
                    }
                >
                    <FontAwesomeIcon icon={faPlus} className="h-full invert" />
                </Button>
            ) : (
                <Button
                    pos={ButtonPos[slice.primary.button_pos]}
                    href={
                        slice.primary.action_link &&
                        "url" in slice.primary.action_link
                            ? slice.primary.action_link.url
                            : "#"
                    }
                >
                    <FontAwesomeIcon icon={faPlus} className="h-full invert" />
                </Button>
            )}
        </div>
    );
}

const SpotifyCard = () => {
    return <Spotify />;
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

    if (slice.variation == "titleCard") {
        return <TitleCard slice={slice} />;
    }

    if (slice.variation == "fullBackgroundCard") {
        return <FullBGCard slice={slice} />;
    }

    if (slice.variation == "spotify") {
        return <SpotifyCard />;
    }
    return <DefaultCard slice={slice} />;
};

export default Card;
