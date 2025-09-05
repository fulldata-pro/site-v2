import { classNames } from "@/lib/utils";
import React from "react";

interface Question2IconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
}

export function Question2Icon({ variant = "duotone", className, classPath1, classPath2, classPath3, ...restProps }: Question2IconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-question-2 `, className)} {...restProps}>
            <span className={classNames("path1", classPath1)}></span>
            <span className={classNames("path2", classPath2)}></span>
            <span className={classNames("path3", classPath3)}></span>
        </i>
    );
}
