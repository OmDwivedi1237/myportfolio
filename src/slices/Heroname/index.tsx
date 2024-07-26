"use client";

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Boundry from "@/components/boundry";
import ReactDOM from 'react-dom';
import Shapes from "./Shapes";

// Register the TextPlugin with GSAP
gsap.registerPlugin(TextPlugin);

/**
 * Props for `Heroname`.
 */
export type HeronameProps = SliceComponentProps<Content.HeronameSlice>;

/**
 * Component for "Heroname" Slices.
 */
const Heroname = ({ slice }: HeronameProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100, opacity: 0, rotate: -10,
        },
        {
          x: 0, opacity: 1, rotate: 0, ease: "elastic.out(1.2,0.4)", duration: 2.0, transformOrigin: "left top", stagger: { each: 0.15, }
        }
      );
      tl.fromTo(
        ".position-title",
        {
          opacity: 0,
          text: "",
        },
        {
          opacity: 1,
          text: slice.primary.tagline,
          ease: "none",
          duration: 3.0,
          stagger: { each: 0.15, }
        }
      );

    }, component);
    return () => ctx.revert();
  }, [slice.primary.tagline]);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    // Splitting the name into each letter for a cool bouncy thing
    return name.split("").map((letter: string, index: number) => (
      <span key={index} className={`name-animation name-animation-${key}-index inline-block opacity-0`}> {letter} </span>
    ));
  };

  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:cols-2">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,18vmin,20rem)] font-bold leading-none tracking-tighter" aria-label={slice.primary.first_name + " " + slice.primary.last_name}>
            <span className="block text-green-500">{renderLetters(slice.primary.first_name, "first")}</span>
            <span className="-mt-[.2em] block text-slate-500">{renderLetters(slice.primary.last_name, "last")}</span>
          </h1>
          <span className="position-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-semibold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tagline}
          </span>
        </div>
      </div>
    </Boundry>
  );
};

export default Heroname;
