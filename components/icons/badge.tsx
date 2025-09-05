import { classNames } from "@/lib/utils";
import React from "react";

interface BadgeIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
    classPath4?: string;
    classPath5?: string;
}

export function BadgeIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, classPath4, classPath5, ...resProps }: BadgeIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-badge`, className)} {...resProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
            <i className={classNames("path3", classPath3)}></i>
            <i className={classNames("path4", classPath4)}></i>
            <i className={classNames("path5", classPath5)}></i>
        </i>
    );
}
