import { classNames } from "@/lib/utils";
import React from "react";

interface BookOpenIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
    classPath4?: string;
}

export function BookOpenIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, classPath4, ...restProps }: BookOpenIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-book-open`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
            <i className={classNames("path3", classPath3)}></i>
            <i className={classNames("path4", classPath4)}></i>
        </i>
    );
}
