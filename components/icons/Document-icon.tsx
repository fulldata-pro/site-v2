
import { classNames } from "@/lib/utils";
import React from "react";

interface DocumentIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function DocumentIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: DocumentIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-document`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
        </i>
    );
}
