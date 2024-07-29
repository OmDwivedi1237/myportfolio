"use client"
import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (cursor) {
      const moveCursor = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      };

      window.addEventListener("mousemove", moveCursor);

      // Add event listeners for links and buttons
      const handleMouseEnter = () => cursor.classList.add("hover");
      const handleMouseLeave = () => cursor.classList.remove("hover");

      document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        document.querySelectorAll("a, button").forEach(el => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);

  return <div ref={cursorRef} className="cursor"></div>;
};

export default CustomCursor;