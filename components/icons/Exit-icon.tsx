import { classNames } from "@/lib/utils";
import React from "react";

interface ExitIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function ExitIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: ExitIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-exit-right`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
        </i>
    );
}