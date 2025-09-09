import { classNames } from "@/lib/utils";
import React from "react";

interface CreditCardIconProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "duotone" | "outline" | "solid";
    classPath1?: string;
    classPath2?: string;
}

export function CreditCardIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: CreditCardIconProps) {
    return (
        <i className={classNames(`ki-${variant} ki-credit-cart`, className)} {...restProps}>
            <span className={classNames("path1", classPath1)}></span>
            <span className={classNames("path2", classPath2)}></span>
        </i>
    );
}
