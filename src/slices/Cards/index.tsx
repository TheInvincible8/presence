import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Card`.
 */
export type CardProps = SliceComponentProps<Content.CardSlice>;

/**
 * Component for "Card" Slices.
 */
const Card = ({ slice }: CardProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for card (variation: {slice.variation}) Slices
    </section>
  );
};

export default Card;
