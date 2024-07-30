import Boundry from "@/components/Boundry";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import List from "./List";

/**
 * Props for `BpContent`.
 */
export type BpContentProps = SliceComponentProps<Content.BpContentSlice>;

/**
 * Component for "BpContent" Slices.
 */
const BpContent = ({ slice }: BpContentProps): JSX.Element => {

  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        My <span style={{ color: '#22c45e' }}>Projects</span>
      </Heading>
      <div className="prose prose-xl prose-invert mb-10">
        <PrismicRichText field={slice.primary.desc} />
      </div>
      <List />
    </Boundry>
  );
};

export default BpContent;