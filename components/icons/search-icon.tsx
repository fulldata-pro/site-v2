import { classNames } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
	variant?: "duotone" | "outline" | "solid";
	classPath1?: string;
	classPath2?: string;
}

export function SearchIcon({ variant = "duotone", className, classPath1, classPath2, ...restProps }: Props) {
	return (
		<i className={classNames(`ki-${variant} ki-magnifier`, className)} {...restProps}>
			<span className={classNames("path1", classPath1)}></span>
			<span className={classNames("path2", classPath2)}></span>
		</i>
	);
}
