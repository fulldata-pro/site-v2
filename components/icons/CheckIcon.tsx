import { classNames } from "@/lib/utils";
import React from "react";

interface CheckIconProps extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
}

export function CheckIcon({ variant = "duotone", className, ...restProps }: CheckIconProps) {
	return (
		<i className={classNames(`ki-${variant} ki-check`, className)} {...restProps}>
		</i>
	);
}
