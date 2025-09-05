import { classNames } from "@/lib/utils";
import React from "react";

interface CheckCircleIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function CheckCircleIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: CheckCircleIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-check-circle`, className)} {...restProps}>
            <span className={classNames("path1", classPath1)}></span>
            <span className={classNames("path2", classPath2)}></span>
        </i>
    );
}
