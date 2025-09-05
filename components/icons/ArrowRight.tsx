import { classNames } from "@/lib/utils";
import React from "react";

interface ArrowRightIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function ArrowRightIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: ArrowRightIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-arrow-right`, className)} {...restProps}>

        </i>
    );
}
