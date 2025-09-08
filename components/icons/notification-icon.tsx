import { classNames } from "@/lib/utils";
import React from "react";

interface NotificationIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
    classPath3?: string;
}

export function NotificationIcon({ variant = "duotone", className, classPath1, classPath2, classPath3, ...restProps }: NotificationIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-notification`, className)} {...restProps}>
            <i className={classNames("path1", classPath1)}></i>
            <i className={classNames("path2", classPath2)}></i>
            <i className={classNames("path3", classPath3)}></i>
        </i>
    );
}
