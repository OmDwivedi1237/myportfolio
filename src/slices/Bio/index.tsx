"use client"

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Boundry from "@/components/Boundry";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { BackgroundGradient } from "@/components/ui/background-gradient";

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
      <div className="grid gap-x-4 gap-y-4 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="col-span-2">
          About <span className="highlight">Me</span>
        </Heading>
        <div className="prose prose-xl prose-zinc prose-invert">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <BackgroundGradient className="max-w-sm">
          <PrismicNextImage
            field={slice.primary.avatar}
            className="row-start-1 max-w-sm md:col-start-2 object-cover w-full h-full rounded-3xl"
          />
        </BackgroundGradient>

        <div className="flex flex-col space-y-2">
          <Button linkField={slice.primary.button_link} label={slice.primary.button_text} />
        </div>
      </div>
    </Boundry>
  );
};

export default Bio;
