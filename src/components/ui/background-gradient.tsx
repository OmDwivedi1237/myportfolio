import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      x.set((offsetX - centerX) / centerX * 15);
      y.set((offsetY - centerY) / centerY * -15);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    element?.addEventListener("mousemove", handleMouseMove);
    element?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element?.removeEventListener("mousemove", handleMouseMove);
      element?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  const rotateX = useTransform(y, (value) => `${value}deg`);
  const rotateY = useTransform(x, (value) => `${value}deg`);

  const variants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    hover: {
      scale: 1.05,
    },
  };

  return (
    <div className={cn("relative group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        className={cn(
          "absolute inset-0 rounded-3xl z-0",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
          "opacity-60 group-hover:opacity-100 blur-xl transition duration-500"
        )}
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
      />
      <motion.div
        ref={ref}
        variants={variants}
        whileHover="hover"
        style={{ rotateX, rotateY }}
        className={cn("relative z-10 rounded-3xl overflow-hidden", className)}
      >
        {children}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      </motion.div>
    </div>
  );
};
