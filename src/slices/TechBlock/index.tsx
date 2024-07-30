import React from "react";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { techIcons } from "@/slices/TechBlock/icons"; // Adjust the import path as needed
import Boundry from "@/components/Boundry";

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
      <Boundry as="div">
        <Heading size="lg" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Boundry>
      {slice.primary.tech_rep.map(({ tech_color, tech_name }, index) => {
        // Convert tech_name to lowercase to match keys in techIcons
        const techNameLower = tech_name ? tech_name.toLowerCase() : "";
        // Get the corresponding icon component
        const IconComponent = techIcons[techNameLower as keyof typeof techIcons] || null;

        return (
          <div key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-zinc-700">
            {Array.from({ length: 15 }, (_, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <span
                  className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  style={{
                    color: itemIndex === 7 && tech_color ? tech_color : "inherit"
                  }}
                >
                  {tech_name}
                </span>
                <span>
                  {IconComponent ? <IconComponent className="text-5xl" /> : null}
                </span>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default TechBlock;
