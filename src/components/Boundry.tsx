import React from 'react'
import clsx from "clsx";

type BoundryProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}


const Boundry = React.forwardRef<HTMLDivElement, BoundryProps>(
    ({ as: Comp = "section", className, children, ...restProps}, ref) => {
        return (
            <Comp
                ref={ref} className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
                {...restProps}>
                <div className="mx-auto w-full max-w-7xl">
                    {children}
                </div>
            </Comp>
        )
    }
)

Boundry.displayName = "Boundry";

export default Boundry