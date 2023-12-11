import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="col-span-full rounded-3xl h-96 border-2 overflow-hidden"
        >
            <div className="gallery flex gap-5 h-96 justify-center">
                {slice.items.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image.gallery_image?.url || ""}
                            alt={image.gallery_image?.alt || "project images"}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Gallery;
