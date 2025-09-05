import { classNames } from "@/lib/utils";
import React from "react";

interface PhoneIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function PhoneIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: PhoneIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-phone`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
        </i>
    );
}
