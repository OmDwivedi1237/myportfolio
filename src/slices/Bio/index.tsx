import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Boundry from "@/components/boundry";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>;

/**
 * Component for "Bio" Slices.
 */
const Bio = ({ slice }: BioProps): JSX.Element => {
  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid1 gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
        <h1>About <span class="highlight">Me</span></h1>
        </Heading>
        <div className="prose prose-xl prose-zinc prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />
      </div>
    </Boundry>
  );
};

export default Bio;
