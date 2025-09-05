import { classNames } from "@/lib/utils";
import { Kick } from "@/lib/interfaces";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
    classPath4?: string;
    classPath5?: string;
    classPath6?: string;
}

export function FaceIdIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, classPath4, classPath5, classPath6, ...restProps }: Props) {
    return (
        <i className={classNames(`ki-${variant} ki-faceid`, className)} {...restProps}>
            <span className={classNames("path1", classPath1)}></span>
            <span className={classNames("path2", classPath2)}></span>
            <span className={classNames("path3", classPath3)}></span>
            <span className={classNames("path4", classPath4)}></span>
            <span className={classNames("path5", classPath5)}></span>
            <span className={classNames("path6", classPath6)}></span>
        </i>
    );
}
