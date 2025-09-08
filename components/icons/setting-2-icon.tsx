import { classNames } from "@/lib/utils";
import React from "react";

interface Setting2IconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function Setting2Icon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: Setting2IconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-setting-2`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
        </i>
    );
}
