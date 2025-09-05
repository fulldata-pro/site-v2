import { classNames } from "@/lib/utils";
import React from "react";

interface Delivery3IconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
}

export function Delivery3Icon({ variant = "duotone", className, classPath1, classPath2, classPath3, ...restProps }: Delivery3IconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-delivery-3`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
            <i className={classNames("path3", classPath3)}></i>
        </i>
    );
}
