"use client"

import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { techIcons } from "@/slices/TechBlock/icons";
import Boundry from "@/components/Boundry";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `TechBlock`.
 */
export type TechBlockProps = SliceComponentProps<Content.TechBlockSlice>;

/**
 * Component for "TechBlock" Slices.
 */
const TechBlock = ({ slice }: TechBlockProps): JSX.Element => {
  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
          markers: false,
        }
      })

      tl.fromTo(
        ".tech-row",
        {
          x: (index) =>  {
            return index % 2 === 0
            ? gsap.utils.random(500, 300)
            : gsap.utils.random(-500, -300)
          }
        },
        {
          x: (index) =>  {
            return index % 2 === 0
            ? gsap.utils.random(-500, -300)
            : gsap.utils.random(500, 300)
          },
          ease: "power1.inOut"
        }
      )

    }, component)
    return () => ctx.revert()
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="overflow-hidden"
    >
      <Boundry as="div">
        <Heading size="lg" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Boundry>
      {slice.primary.tech_rep.map(({ tech_color, tech_name }, index) => {
        const techNameLower = tech_name ? tech_name.toLowerCase() : "";
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
                  {IconComponent ? <IconComponent className="text-5xl" style={{ color: tech_color }} /> : null}
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
