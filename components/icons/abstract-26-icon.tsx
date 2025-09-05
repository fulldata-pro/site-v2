import { classNames } from "@/lib/utils";
import React from "react";

interface Abstract26IconProps extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
}

export function Abstract26Icon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: Abstract26IconProps) {
	return (
		<i className={classNames(`ki-${variant} ki-abstract-26`, className)} {...restProps}>
			<i className={classNames("path1", classPath1)}></i>
			<i className={classNames("path2", classPath2)}></i>
		</i>
	);
}
