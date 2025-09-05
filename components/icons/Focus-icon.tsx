import { classNames } from "@/lib/utils";
import React from "react";

interface FocusIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function FocusIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: FocusIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-focus`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
        </i>
    );
}
