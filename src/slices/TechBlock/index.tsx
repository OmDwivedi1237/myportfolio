import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TechBlock`.
 */
export type TechBlockProps = SliceComponentProps<Content.TechBlockSlice>;

/**
 * Component for "TechBlock" Slices.
 */
const TechBlock = ({ slice }: TechBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for tech_block (variation: {slice.variation}) Slices
    </section>
  );
};

export default TechBlock;
