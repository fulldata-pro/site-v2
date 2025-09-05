import { classNames } from "@/lib/utils";
import React from "react";

interface DataIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
    classPath4?: string;
    classPath5?: string;
}

export function DataIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, classPath4, classPath5, ...restProps }: DataIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-data`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
            <i className={classNames("path3", classPath3)}></i>
            <i className={classNames("path4", classPath4)}></i>
            <i className={classNames("path5", classPath5)}></i>
        </i>
    );
}
